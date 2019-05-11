import * as React from 'react';
import { injectIntl } from 'react-intl';
import loadable from '@loadable/component';

import { Head } from '../../../client/presentations/head/Head';
import { Application } from '../../../client/presentations/templates/Application';

const LoadableAboutContent = loadable(
  (): any =>
    import(/* webpackChunkName: "about" */ 'client/presentations/pages/AboutContent').then(
      ({ AboutContent }) => AboutContent,
    ),
);

interface Props {
  baseUrl: string;
  intl: any;
}

export const About = injectIntl(function(props: Props) {
  const title: string = props.intl.formatMessage({ id: 'About.Title' });
  const description: string = props.intl.formatMessage({
    id: 'About.Description',
  });

  return (
    <Application baseUrl={props.baseUrl}>
      <Head title={title} description={description} />
      <LoadableAboutContent />
    </Application>
  );
});
