import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { LocaleBar } from 'client/containers/LocaleBar';

const Wrapper = styled.nav`
  position: relative;
  color: #fff;
  height: 100%;
  background: #aaa;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 12px;
  background: #bbb;

  &:hover {
    background: #ccc;
  }
`;

const LocaleBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export function Navigation() {
  return (
    <Wrapper>
      <ul className="Navigation--List">
        <li>
          <StyledLink to="/">
            <FormattedMessage id="Navigation.Dashboard" />
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/data">
            <FormattedMessage id="Navigation.Data" />
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/contents">
            <FormattedMessage id="Navigation.Contents" />
          </StyledLink>
        </li>
      </ul>
      <LocaleBarWrapper>
        <LocaleBar />
      </LocaleBarWrapper>
    </Wrapper>
  );
}
