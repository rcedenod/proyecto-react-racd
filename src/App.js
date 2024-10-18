import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import NoteViewer from './components/NoteViewer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Heading from './components/Heading'
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);  
  const [activeNote, setActiveNote] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isRegistering, setIsRegistering] = useState(false); 
  const [viewMode, setViewMode] = useState('list');
  const [theme, setTheme] = useState('light'); 

  const changeViewMode = (mode) => {
    setViewMode(mode);
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addNote = async (note) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.filter((note) => note.id !== id));
    setActiveNote(null);
  };

  const updateNote = async (updatedNote) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/notes/${updatedNote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });
    const updated = await response.json();
    setNotes(notes.map((note) => (note.id === updated.id ? updated : note)));
    setActiveNote(updated);
  };

  const handleLoginSuccess = async () => {
    setIsAuthenticated(true);
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedNotes = await response.json();
    setNotes(fetchedNotes);
    setActiveNote(null);
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  }
  
  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true);
      handleLoginSuccess();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setNotes([]);
    setActiveNote(null);
  };

    return (
    <div className={`app-container ${theme}`}>
      {isAuthenticated ? (
        <>
          <Heading 
            onAddNote={addNote} 
            onLogout={handleLogout} 
            changeViewMode={changeViewMode} 
            toggleTheme={toggleTheme} 
            theme={theme} 
          />
          {viewMode === 'list'? (
            <>
              <Sidebar 
                notes={notes} 
                activeNote={activeNote} 
                onSelectNote={setActiveNote} 
                onAddNote={addNote} 
                theme={theme}
                onDeleteNote={deleteNote} 
              />

              <NoteViewer 
                note={activeNote} 
                onSave={updateNote} 
                onDeleteNote={deleteNote} 
                viewMode={viewMode}
                toggleTheme={toggleTheme} 
                theme={theme} 
              />
            </>
          ) : null}

          {viewMode === 'gallery' && (
            <Gallery 
              notes={notes} 
              onUpdateNote={updateNote} 
              onSelectNote={setActiveNote} 
              onDeleteNote={deleteNote} 
              theme={theme}
            />
          )
          }
        </>
      ) : (
        isRegistering ? (
          <RegisterForm onToggleRegister={handleToggleRegister} onRegisterSuccess={handleRegisterSuccess} theme={theme}/>
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} onToggleRegister={handleToggleRegister} theme={theme} />
        )

      )
      }
    </div>
  );
}

export default App;
