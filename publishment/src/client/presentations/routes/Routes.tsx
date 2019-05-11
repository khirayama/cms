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
      <Route exact path={`${props.baseUrl}/`} component={Home} />
      <Route exact path={`${props.baseUrl}/about`} component={About} />
      <Route exact path={`${props.baseUrl}/users`} component={Users} />
    </Switch>
  );
}
