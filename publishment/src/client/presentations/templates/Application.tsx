import * as React from 'react';
import styled from 'styled-components';

import { Navigation } from '../../../client/presentations/components/Navigation';

type Props = {
  children: any;
};

const width = 320;

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const NavigationWrapper = styled.div`
  display: inline-block;
  width: ${width}px;
  height: 100%;
  vertical-align: top;
`;

const ContentWrapper = styled.div`
  display: inline-block;
  width: calc(100% - ${width}px);
  height: 100%;
`;

export function Application(props: Props) {
  return (
    <Wrapper>
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <ContentWrapper>{props.children}</ContentWrapper>
    </Wrapper>
  );
}
