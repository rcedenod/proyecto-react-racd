import React, { forwardRef } from 'react';
import "./DropdownContent.css";


const DropdownContent = forwardRef((props, ref) => {
  const { children, open, top } = props;

  return (
    React.createElement('div', {
      className: `dropdown-content ${open ? 'content-open' : ''}`,
      style: { top: top ? `${top}px` : '100%' },
      ref: ref
    },
      children
    )
  );
});

export default DropdownContent;
