import * as React from 'react';
import styled from 'styled-components';

type Props = {
  onEnglishLocaleClick: () => void;
  onJapaneseLocaleClick: () => void;
};

const Wrapper = styled.ul`
  background: #ccc;

  li {
    display: inline-block;
    padding: 8px;
    font-size: 0.5rem;
  }
`;

export function LocaleBar(props: Props) {
  return (
    <Wrapper>
      <li onClick={props.onEnglishLocaleClick}>English</li>
      <li onClick={props.onJapaneseLocaleClick}>日本語</li>
    </Wrapper>
  );
}
