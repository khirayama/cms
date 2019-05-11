import * as React from 'react';
import styled from 'styled-components';

type Props = {
  onEnglishLocaleClick: () => void;
  onJapaneseLocaleClick: () => void;
};

const StyledList = styled.ul`
  li {
    display: inline-block;
    padding: 8px;
  }
`;

export function LocaleBar(props: Props) {
  return (
    <StyledList>
      <li onClick={props.onEnglishLocaleClick}>English</li>
      <li onClick={props.onJapaneseLocaleClick}>日本語</li>
    </StyledList>
  );
}
