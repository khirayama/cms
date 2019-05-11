import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LocaleBar } from '../../../client/containers/LocaleBar';

const Wrapper = styled.nav`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const StyledList = styled.ul`
  li + li {
    border-top: solid 1px #aaa;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 8px;
`;

const LocaleBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

export function Navigation() {
  return (
    <Wrapper>
      <StyledList>
        <li>
          <StyledLink to="/">Dashboard</StyledLink>
        </li>
      </StyledList>
      <LocaleBarWrapper>
        <LocaleBar />
      </LocaleBarWrapper>
    </Wrapper>
  );
}
