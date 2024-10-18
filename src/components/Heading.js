import React from 'react';
import { FaPlus, FaPowerOff, FaMoon, FaSun } from 'react-icons/fa';
import "./Heading.css";
import Dropdown from './Dropdown';
import DropdownItem from './DropDownItem';

function Heading({ onAddNote, onLogout, changeViewMode, toggleTheme, theme }) {

  const handleDropdownItemClick = (mode) => {
    console.log("Se cambió al modo: ", mode);
    changeViewMode(mode);
  };

  return (
    <div className={`heading ${theme}`}>
      <div className="heading-top">
        <h2 className="heading-title">RafixNotes</h2>
        <div className="button-group">
          
          <button className="heading-logout-button" onClick={onLogout}>
            <FaPowerOff />
          </button>
        </div>
      </div>
    
      <div className="button-container">
        <button 
          className="heading-add-button" 
          onClick={() => {
            const newNote = { title: '', content: '' };
            onAddNote(newNote);
          }}
          title="Nueva Nota"
        >

          <FaPlus />
        </button>
        
        <div className="dropdown-container">
          <Dropdown
            buttonText={<span className="icon">☰</span>}
            content={
              <>
                <DropdownItem onClick={() => handleDropdownItemClick('list')}>Lista</DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('gallery')}>Galería</DropdownItem>
              </>
            }
          />
        </div>
        
        <button className="theme-toggle-button" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

      </div>
        
    </div>
  );
}

export default Heading;
