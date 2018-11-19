import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import User from '../models/User';

async function create(req, res) {
  await User.create(req.body);
  res.status(201).end();
}

async function update(req, res) {
  req.user.profile = req.body;
  await req.user.save();
  res.status(204).end();
}

const router = express.Router();

router.post('/', asyncHandler(create));

router.put('/', auth, asyncHandler(update));

router.get('/', auth, (req, res) => {
  res.json(req.user.profile);
});

export default router;
