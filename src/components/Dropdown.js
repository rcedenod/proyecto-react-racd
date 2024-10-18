import React, { useEffect, useState, useRef } from 'react';
import DropdownButton from './DropDownButton';
import DropdownContent from './DropDownContent';
import "./Dropdown.css";

function Dropdown({ buttonText, content }) {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    if (!open) {
      const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;

      const topPosition = spaceRemaining > contentHeight ? null : -(contentHeight - spaceRemaining);
      setDropdownTop(topPosition);
    }

    setOpen(!open);
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef]);

  return (
    React.createElement('div', { ref: dropdownRef, className: 'dropdown' },
      React.createElement(DropdownButton, {
        ref: buttonRef,
        toggle: toggleDropdown,
        open: open,
        children: buttonText
      }),
      React.createElement(DropdownContent, {
        top: dropdownTop,
        ref: contentRef,
        open: open,
        children: content
      })
    )
  );
}

export default Dropdown;
