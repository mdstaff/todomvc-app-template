import React from 'react';

export function Col({ children }) {
  return React.createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column' } },
    children
  );
}

export function Title({ children }) {
  return React.createElement(
    'h1',
    { style: { margin: '0 auto' } },
    children
  );
}