import * as React from 'react';
import styled from 'styled-components';

interface Props {
  baseUrl: string;
  children: any;
}

const width = 320;

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: inline-block;
  width: calc(100% - ${width}px);
  height: 100%;
`;

export function Auth(props: Props) {
  return (
    <Wrapper>
      <ContentWrapper>{props.children}</ContentWrapper>
    </Wrapper>
  );
}
