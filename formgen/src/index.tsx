import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from 'Editor';

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Editor />, window.document.querySelector('#root'));
});
