import * as React from 'react';

export interface State {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Props {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, props: Props, state: State) => void;
}

export function SignUpForm(props: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    setEmail(value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    setPassword(value);
  };

  const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    setConfirmPassword(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (props.onSubmit) {
      const state: State = {
        email,
        password,
        confirmPassword,
      };
      props.onSubmit(event, props, state);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={email} onChange={onChangeEmail} />
      <input type="password" value={password} onChange={onChangePassword} />
      <input type="password" value={confirmPassword} onChange={onChangeConfirmPassword} />
      <button>Submit</button>
    </form>
  );
}
