const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg')
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [decoded.username]);
      if (userResult.rows.length === 0) return res.sendStatus(403);

      req.user = { id: userResult.rows[0].id };
      next();
    } catch (error) {
      return res.sendStatus(500);
    }
  });
}

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notas_db',
  password: '1597',
  port: 5432,
});

const SECRET_KEY = 'secreto';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length > 0) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

app.get('/notes', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las notas' });
  }
});

app.post('/notes', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  
  try {
    const newNote = await pool.query(
      'INSERT INTO notes (title, content, user_id, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
      [title, content, userId]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la nota' });
  }
});

app.delete('/notes/:id', authenticateToken, async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *',
      [noteId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Nota no encontrada o no tienes permiso para eliminarla' });
    }

    res.status(200).json({ message: 'Nota eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
});

app.put('/notes/:id', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;
  const userId = req.user.id;
  
  try {
    const updatedNote = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, noteId, userId]
    );
    
    if (updatedNote.rows.length === 0) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json(updatedNote.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la nota' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
