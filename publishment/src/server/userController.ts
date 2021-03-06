import crypto from 'crypto';

import nodemailer from 'nodemailer';
import passport from 'passport';
import express from 'express';
import { WriteError } from 'mongodb';

import { User, UserDocument } from '../models/User';
import { Role, RoleDocument } from '../models/Role';
import { UserRequest, UserRequestDocument } from '../models/UserRequest';
import '../config/passport';

export let postSignup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json(errors);
    return;
  }

  const token: string = req.body.token || '';
  const ownerRole: RoleDocument | null = await Role.findOne({ name: 'owner' }).exec();

  if (ownerRole === null) {
    // eslint-disable-next-line no-console
    console.log('Please import initial data.');
    return;
  }

  const firstUser: UserDocument | null = await User.findOne().exec();
  if (firstUser === null) {
    // Create first user
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      roleId: ownerRole.id,
    });
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ id: user.id });
      return;
    });
  } else {
    if (token) {
      // Create new user
      const userRequest: UserRequestDocument | null = await UserRequest.findOne({ token }).exec();
      if (userRequest && userRequest.isValid()) {
        const user = await User.create({
          email: req.body.email,
          password: req.body.password,
          role: userRequest.role,
        });
        req.logIn(user, err => {
          if (err) {
            return next(err);
          }
          res.status(200).json({ id: user.id });
          return;
        });
        res.status(200).json({ ok: 'ok' });
      } else {
        res.status(400).json({
          err: 'Unvalid token',
        });
      }
    } else if (!token) {
      res.status(400).json({
        // tmp
        err: 'Need token',
      });
    }
  }

  // User.findOne({ email: req.body.email }, (err, existingUser) => {
  //   if (err) {
  //     return next(err);
  //   }
  //
  //   if (existingUser) {
  //     res.status(400).json({} /* Existing user */);
  //     return;
  //   }
  //
  //   user.save(err => {
  //     if (err) {
  //       return next(err);
  //     }
  //     req.logIn(user, err => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.status(200).json({} /* Create user and login */);
  //       return;
  //     });
  //   });
  // });
};

export let postSignin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json(errors);
    return;
  }

  passport.authenticate('local', (err: Error, user: UserDocument) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(400).json(err);
      return;
    }
    req.logIn(user, err => {
      if (err || !req.session) {
        return next(err);
      }
      res.redirect(req.baseUrl);
    });
  })(req, res, next);
};

export let signout = (req: express.Request, res: express.Response) => {
  req.logout();
  res.redirect(req.baseUrl);
};

export let postUpdateProfile = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json(errors);
    return;
  }

  User.findById(req.user.id, (err, user: UserDocument) => {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || '';
    user.save((err: WriteError) => {
      if (err) {
        if (err.code === 11000) {
          res.status(400).json(errors);
          return;
        }
        return next(err);
      }
      res.json(user);
    });
  });
};

export let postUpdatePassword = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json(errors);
    return;
  }

  User.findById(req.user.id, (err, user: UserDocument) => {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save((err: WriteError) => {
      if (err) {
        return next(err);
      }
      res.redirect(`${req.baseUrl}/account`);
    });
  });
};

export let postDeleteAccount = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  User.remove({ _id: req.user.id }, err => {
    if (err) {
      return next(err);
    }
    req.logout();
    res.redirect(req.baseUrl);
  });
};

export let getReset = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect(req.baseUrl);
  }
  User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect(`${req.baseUrl}/forgot`);
      }
      res.render('account/reset', {
        title: 'Password Reset',
      });
    });
};

export let postReset = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.assert('password', 'Password must be at least 4 characters long.').len({ min: 4 });
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.redirect('back');
  }

  User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec((err, user: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('back');
      }
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.save((err: WriteError) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, () => {
          const transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD,
            },
          });
          const mailOptions = {
            to: user.email,
            from: 'express-ts@starter.com',
            subject: 'Your password has been changed',
            text: `Hello,\n\nThis is a confirmation that the password for your account ${
              user.email
            } has just been changed.\n`,
          };
          transporter.sendMail(mailOptions);
        });
      });
    });
};

export let postForgot = (req: express.Request, res: express.Response) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.redirect(`${req.baseUrl}/forgot`);
  }

  crypto.randomBytes(16, (err, buf) => {
    const token: string = buf.toString('hex');

    User.findOne({ email: req.body.email }, (err, user: any) => {
      if (!user) {
        return res.redirect(`${req.baseUrl}/forgot`);
      }
      user.passwordResetToken = token;
      user.passwordResetExpires = Date.now() + 3600000; // 1 hour
      user.save(() => {
        const transporter = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD,
          },
        });
        const mailOptions = {
          to: user.email,
          from: 'hackathon@starter.com',
          subject: 'Reset your password on Hackathon Starter',
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        transporter.sendMail(mailOptions, () => {});
      });
    });
  });
};
