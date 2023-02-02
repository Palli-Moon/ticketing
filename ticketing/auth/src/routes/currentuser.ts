import express from 'express';
import { currentUser } from '@ticketingtutorial/common';

const router = express.Router();

// is there perhaps an easier way than always writing the '/api/users' part?
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }; // Rename the exported router
