import * as React from 'react';
import * as styled from 'styled-components';
import { injectIntl } from 'react-intl';

import { Head } from '../../../client/presentations/head/Head';
import { Auth } from '../../../client/presentations/templates/Auth';

const Wrapper = styled.default.div`
  color: blue;
`;

interface Props {
  baseUrl: string;
  intl: any;
}

export const SignIn = injectIntl(function(props: Props) {
  const title: string = props.intl.formatMessage({ id: 'SignIn.Title' });
  const description: string = props.intl.formatMessage({
    id: 'SignIn.Description',
  });

  return (
    <Auth baseUrl={props.baseUrl}>
      <Head title={title} description={description} />
      <Wrapper>
        <h2>SignIn</h2>
      </Wrapper>
    </Auth>
  );
});
