// src/routes/notes.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import it
const authorize  = require('../middlewares/roleMiddleware'); // Import it

router.use(authMiddleware)

router.get('/', notesController.getNotes);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', authorize('ADMIN'), notesController.deleteNote);
router.get('/:id', notesController.getNoteById);

module.exports = router;