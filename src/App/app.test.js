import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const renderer = new ShallowRenderer();
renderer.render(<App />, div);
ReactDOM.unmountComponentAtNode(div);
});
