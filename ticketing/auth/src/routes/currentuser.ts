import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// is there perhaps an easier way than always writing the '/api/users' part?
router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    // ? is equal to checking !req.session first
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    res.send({ currentUser: payload });
  } catch (error) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter }; // Rename the exported router
