import React, { forwardRef } from 'react';
import "./DropdownButton.css";

const DropdownButton = forwardRef((props, ref) => {
  const { children, toggle, open } = props;

  return (
    React.createElement('div', {
      onClick: toggle,
      className: `dropdown-btn ${open ? 'button-open' : ''}`,
      ref: ref
    },
      children,
      React.createElement('span', { className: 'toggle-icon' }, open ? '▲' : '▼')
    )
  );
});

export default DropdownButton;
