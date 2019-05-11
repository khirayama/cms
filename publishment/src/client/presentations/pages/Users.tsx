import * as React from 'react';
import { injectIntl } from 'react-intl';
import loadable from '@loadable/component';

import { Head } from '../../../client/presentations/head/Head';
import { Application } from '../../../client/presentations/templates/Application';

const LoadableUsersContent = loadable(
  (): any =>
    import(/* webpackChunkName: "users" */ 'client/presentations/pages/UsersContent').then(
      ({ UsersContent }) => UsersContent,
    ),
);

interface Props {
  baseUrl: string;
  intl: any;
}

export const Users = injectIntl(function(props: Props) {
  const title: string = props.intl.formatMessage({ id: 'Users.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Users.Description',
  });

  return (
    <Application baseUrl={props.baseUrl}>
      <Head title={title} description={description} />
      <LoadableUsersContent />
    </Application>
  );
});
