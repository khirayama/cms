import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../../../client/presentations/pages/Home';
import { About } from '../../../client/presentations/pages/About';
import { Users } from '../../../client/presentations/pages/Users';

interface Props {
  baseUrl: string;
}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path={`${props.baseUrl}/`} render={() => <Home baseUrl={props.baseUrl} />} />
      <Route exact path={`${props.baseUrl}/about`} render={() => <About baseUrl={props.baseUrl} />} />
      <Route exact path={`${props.baseUrl}/users`} render={() => <Users baseUrl={props.baseUrl} />} />
    </Switch>
  );
}
