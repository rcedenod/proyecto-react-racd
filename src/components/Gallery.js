import React, { useState } from 'react';
import './Gallery.css';
import Popup from './Popup'; 
import { FaTrash } from 'react-icons/fa';

function Gallery({ notes, onUpdateNote, onDeleteNote, theme }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  const handleClosePopup = () => {
    setSelectedNote(null);
  };

  const handleSaveNote = (updatedNote) => {
    onUpdateNote(updatedNote);
  };

  return (
    <div className={`gallery-container ${theme}`}>
      {notes.length === 0 ? (
        <p className={`empty-message ${theme}`}>No hay notas disponibles.</p>
      ) : (
        notes.map(note => (
          <div
            key={note.id}
            className={`gallery-item ${theme}`}
            onClick={() => handleSelectNote(note)} 
            title={note.title}
          >
            <div className={`gallery-item-header ${theme}`}>
              <h3>{note.title || 'Sin título'}</h3>
              <FaTrash 
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation(); 
                  onDeleteNote(note.id);
                }} 
              />
            </div>
            <p className={`gallery-item-content ${theme}`}>{note.content}</p>
          </div>
        ))
      )}
      {selectedNote && (
        <Popup 
          note={selectedNote} 
          onClose={handleClosePopup} 
          onSave={handleSaveNote} 
          theme={theme}
        />
      )}
    </div>
  );
}

export default Gallery;
