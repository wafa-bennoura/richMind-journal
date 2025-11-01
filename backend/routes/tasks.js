import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Get all tasks/journal entries for the authenticated user
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;

  db.all(
    'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Create a new task/journal entry
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;
  const { type, content, habit_type, completed } = req.body;

  if (!type) {
    return res.status(400).json({ error: 'Type is required' });
  }

  db.run(
    'INSERT INTO tasks (user_id, type, content, habit_type, completed) VALUES (?, ?, ?, ?, ?)',
    [userId, type, content || null, habit_type || null, completed || 0],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating task' });
      }

      db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error fetching created task' });
        }
        res.status(201).json(row);
      });
    }
  );
});

// Update a task
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;
  const taskId = req.params.id;
  const { type, content, habit_type, completed } = req.body;

  // First check if task belongs to user
  db.get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId], (err, task) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    db.run(
      'UPDATE tasks SET type = ?, content = ?, habit_type = ?, completed = ? WHERE id = ? AND user_id = ?',
      [
        type || task.type,
        content !== undefined ? content : task.content,
        habit_type !== undefined ? habit_type : task.habit_type,
        completed !== undefined ? completed : task.completed,
        taskId,
        userId
      ],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Error updating task' });
        }

        db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
          if (err) {
            return res.status(500).json({ error: 'Error fetching updated task' });
          }
          res.json(row);
        });
      }
    );
  });
});

// Delete a task
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;
  const taskId = req.params.id;

  db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  });
});

// Get vision board goals
router.get('/vision-board', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;

  db.all(
    'SELECT * FROM vision_board WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Add vision board goal
router.post('/vision-board', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;
  const { goal_text, target_date } = req.body;

  if (!goal_text) {
    return res.status(400).json({ error: 'Goal text is required' });
  }

  db.run(
    'INSERT INTO vision_board (user_id, goal_text, target_date) VALUES (?, ?, ?)',
    [userId, goal_text, target_date || null],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating goal' });
      }

      db.get('SELECT * FROM vision_board WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error fetching created goal' });
        }
        res.status(201).json(row);
      });
    }
  );
});

// Update vision board goal
router.put('/vision-board/:id', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;
  const goalId = req.params.id;
  const { goal_text, target_date } = req.body;

  db.get('SELECT * FROM vision_board WHERE id = ? AND user_id = ?', [goalId, userId], (err, goal) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    db.run(
      'UPDATE vision_board SET goal_text = ?, target_date = ? WHERE id = ? AND user_id = ?',
      [
        goal_text || goal.goal_text,
        target_date !== undefined ? target_date : goal.target_date,
        goalId,
        userId
      ],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Error updating goal' });
        }

        db.get('SELECT * FROM vision_board WHERE id = ?', [goalId], (err, row) => {
          if (err) {
            return res.status(500).json({ error: 'Error fetching updated goal' });
          }
          res.json(row);
        });
      }
    );
  });
});

// Delete vision board goal
router.delete('/vision-board/:id', (req, res) => {
  const db = req.app.locals.db;
  const userId = req.userId;
  const goalId = req.params.id;

  db.run('DELETE FROM vision_board WHERE id = ? AND user_id = ?', [goalId, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  });
});

export default router;


