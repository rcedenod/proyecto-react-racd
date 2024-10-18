import React, { useState, useEffect } from 'react';
import './Sidebar.css'; 
import { FaTrashAlt } from 'react-icons/fa';

function Sidebar({ notes, activeNote, onSelectNote, onAddNote, onDeleteNote, onLogout, theme }) {
  const [hoveredIndex, setHoveredIndex] = useState(null); 

  useEffect(() => {
    setHoveredIndex(null);
  }, [activeNote]);

  const formatRelativeDate = (date) => {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffMs = now - updatedDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes} minutos`;
    } else if (diffHours < 24) {
      return `${diffHours} horas`;
    } else if (diffDays <= 5) {
      return `${diffDays} días`;
    } else {
      return updatedDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  };

  const isNoteEmpty = (note) => {
    return note.title.trim() === "" && note.content.trim() === "";
  };

  const handleSelectNote = (note) => {
    if (activeNote && isNoteEmpty(activeNote)){
      onDeleteNote(activeNote.id);
    }
    onSelectNote(note);
  }

  const truncateTitle = (title) => {
    if (title.length > 15) {
      return title.substring(0, 15) + "...";
    }
    return title;
  }

  const sortedNotes = [...notes].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
      <div className={`sidebar ${theme}`}>
        <ul className={`notes-list ${theme}`}>
          {sortedNotes.map((note, index) => (
            <li 
              key={note.id} 
              className={activeNote && activeNote.id === note.id ? `list-group-item active ${theme}` : `list-group-item ${theme}`}
              onMouseEnter={() => setHoveredIndex(index)} 
              onMouseLeave={() => setHoveredIndex(null)}  
              onClick={() => handleSelectNote(note)} 
            >
              <div className={`note-content ${theme}`}>
                <div>{truncateTitle(note.title) || 'Sin título'}</div>
                <div className={`note-date ${theme}`}>{formatRelativeDate(note.updated_at)}</div>
              </div>

              {hoveredIndex === index && (
                <FaTrashAlt 
                  className="trash-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }} 
                />
              )}
            </li>
          ))}
        </ul>
      </div>
  );
}

export default Sidebar;
