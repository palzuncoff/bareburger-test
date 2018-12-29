import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseConfig } from './config';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
