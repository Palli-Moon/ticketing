import express from 'express';

const router = express.Router();

// is there perhaps an easier way than always writing the '/api/users' part?
router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there');
});

export { router as currentUserRouter }; // Rename the exported router
