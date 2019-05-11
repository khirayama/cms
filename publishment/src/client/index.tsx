import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { reducer, State } from 'client/reducers';
import { Routes } from 'client/presentations/routes/Routes';
import { ResetStyle } from 'client/presentations/styles/ResetStyle';
import { GlobalStyle } from 'client/presentations/styles/GlobalStyle';
import { Intl } from 'client/containers/Intl';

function extractInitialState(): State {
  const initialDataElement = window.document.querySelector('#initial-data') as HTMLElement;
  const initialDataString = initialDataElement.getAttribute('data-json') || '{}';
  return JSON.parse(initialDataString);
}

const initialState = extractInitialState();
const store = createStore(reducer, initialState);

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <Provider store={store}>
        <Intl>
          <Routes baseUrl={initialState.config.baseUrl} />
        </Intl>
      </Provider>
    </BrowserRouter>,
    window.document.querySelector('#root'),
  );
});
