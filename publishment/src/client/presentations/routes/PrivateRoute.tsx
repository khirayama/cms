import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
};

export function PrivateRoute(props: any) {
  return (
    <Route
      {...props}
      render={routeProps => {
        return fakeAuth.isAuthenticated ? (
          props.render ? (
            props.render(routeProps)
          ) : (
            <props.component {...routeProps} />
          )
        ) : (
          <Redirect
            to={{
              pathname: `${props.baseUrl}/signin`,
              state: {
                from: routeProps.location,
              },
            }}
          />
        );
      }}
    />
  );
}
