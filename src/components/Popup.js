import React, { useState } from 'react';
import './Popup.css';

function Popup({ note, onClose, onSave, theme }) {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');

  const handleSave = () => {
    onSave({ ...note, title, content });
    onClose(); 
  };

  return (
    <div className={`note-popup-overlay ${theme}`}>
      <div className={`note-popup ${theme}`}>
        <div className={`note-popup-header ${theme}`}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`note-title-input ${theme}`}
            placeholder="Título de la nota"
          />
          <button className={`close-button ${theme}`} onClick={onClose}>
            <span className={`close-icon ${theme}`}>&times;</span>
          </button>
        </div>
        <div className={`note-popup-content ${theme}`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenido de la nota"
            className={`note-content-input ${theme}`}
          />
        </div>
        <div className={`note-popup-footer ${theme}`}>
          <button onClick={handleSave} className={`save-button ${theme}`}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
