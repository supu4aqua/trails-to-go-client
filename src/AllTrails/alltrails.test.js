import React from 'react';
import ReactDOM from 'react-dom';
import AllTrails from './alltrails';


it('renders without crashing', () => {
  const div = document.createElement('div');
ReactDOM.render(<AllTrails />, div);
ReactDOM.unmountComponentAtNode(div);
});
