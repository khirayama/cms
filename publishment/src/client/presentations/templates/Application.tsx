import * as React from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

import { ResetStyle } from 'client/presentations/styles/ResetStyle';
import { GlobalStyle } from 'client/presentations/styles/GlobalStyle';
import { Routes } from 'client/presentations/routes/Routes';
import { chooseLocale } from 'client/presentations/locales';
import { Navigation } from 'client/presentations/components/Navigation';
import { State } from 'client/reducers';

type Props = {
  locale: State['ui']['locale'];
};

const navWidth = 320;

const Wrapper = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
`;

const NavigationWrapper = styled.div`
  display: inline-block;
  width: ${navWidth}px;
  height: 100%;
  vertical-align: top;
`;

const ContentWrapper = styled.div`
  display: inline-block;
  width: calc(100% - ${navWidth}px);
  height: 100%;
  vertical-align: top;
`;

export function Application(props: Props) {
  const locale: string = props.locale;

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <IntlProvider locale={locale} messages={chooseLocale(locale)}>
        <Wrapper>
          <NavigationWrapper>
            <Navigation />
          </NavigationWrapper>
          <ContentWrapper>
            <Routes />
          </ContentWrapper>
        </Wrapper>
      </IntlProvider>
    </>
  );
}
