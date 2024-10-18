import React, { useEffect, useState } from 'react';
import "./NoteViewer.css";
import { FaTrashAlt } from 'react-icons/fa';

function NoteViewer({ note, onSave, onDeleteNote, theme}) {
  const [currentNote, setCurrentNote] = useState(note || { title: '', content: '', updated_at: new Date() });

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
    }
  }, [note]);

  const handleContentChange = (field, value) => {
    if (!currentNote) return; 
    const updatedNote = { ...currentNote, [field]: value, updated_at: new Date() };
    setCurrentNote(updatedNote);
    onSave(updatedNote);

    if(updatedNote.title.trim() === "" && updatedNote.content.trim() === "") {
      onDeleteNote(updatedNote.id);
    } else {
      onSave(updatedNote);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!note) {
    return (
      <div className={`message-viewer ${theme}`}>
        <h3>Selecciona una nota para ver su contenido</h3>
      </div>
    );
  }

  return (
      <div className={`note-viewer ${theme}`}>
        <input
          className={`note-title ${theme}`}
          type="text"
          value={currentNote.title}
          onChange={(e) => handleContentChange('title', e.target.value)}
          placeholder="Escribe el título aquí"
          maxLength={240}
        />
        <textarea
          className={`note-content ${theme}`}
          value={currentNote.content}
          onChange={(e) => handleContentChange('content', e.target.value)}
          placeholder="Escribe la nota aquí"
          maxLength={50000}
        />
        <div className="note-footer">
          <p className="note-date">Última modificación: {formatDate(currentNote.updated_at)}</p>
          <FaTrashAlt 
            className="trash-icon-viewer" 
            onClick={() => onDeleteNote(note.id)}
          />
        </div>
    </div>

  );
}

export default NoteViewer;
