
import React from 'react';
import ReactDOM from 'react-dom';
import TrailDetails from './traildetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
ReactDOM.render(<TrailDetails />, div);
ReactDOM.unmountComponentAtNode(div);

});
