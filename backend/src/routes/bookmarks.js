// src/routes/bookmarks.js
const express = require('express');
const router = express.Router();
const bookmarksController = require('../controllers/bookmarksController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const authorize = require('../middlewares/roleMiddleware'); // 👈 Import the role middleware

router.use(authMiddleware);

router.get('/', bookmarksController.getBookmarks);
router.post('/', bookmarksController.createBookmark);
router.put('/:id', bookmarksController.updateBookmark);
router.get('/:id', bookmarksController.getBookmarkById);

// 👈 Add authorize('ADMIN') to protect this route
router.delete('/:id', authorize('ADMIN'), bookmarksController.deleteBookmark); 

module.exports = router;