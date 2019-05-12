import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../../client/presentations/routes/PrivateRoute';
import { Home } from '../../../client/presentations/pages/Home';
import { SignUp } from '../../../client/presentations/pages/SignUp';
import { SignIn } from '../../../client/presentations/pages/SignIn';
import { About } from '../../../client/presentations/pages/About';
import { Users } from '../../../client/presentations/pages/Users';

interface Props {
  baseUrl: string;
}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path={`${props.baseUrl}/signup`} render={() => <SignUp baseUrl={props.baseUrl} />} />
      <Route exact path={`${props.baseUrl}/signin`} render={() => <SignIn baseUrl={props.baseUrl} />} />
      <PrivateRoute
        exact
        baseUrl={props.baseUrl}
        path={`${props.baseUrl}/`}
        render={() => <Home baseUrl={props.baseUrl} />}
      />
      <PrivateRoute
        baseUrl={props.baseUrl}
        exact
        path={`${props.baseUrl}/about`}
        render={() => <About baseUrl={props.baseUrl} />}
      />
      <PrivateRoute
        baseUrl={props.baseUrl}
        exact
        path={`${props.baseUrl}/users`}
        render={() => <Users baseUrl={props.baseUrl} />}
      />
    </Switch>
  );
}
