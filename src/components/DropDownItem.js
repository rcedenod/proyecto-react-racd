import React from 'react';
import "./DropDownItem.css";

function DropdownItem({ children, onClick }) {
  return (
    React.createElement('div', {
      className: 'dropdown-item',
      onClick: onClick
    },
      children
    )
  );
}

export default DropdownItem;
