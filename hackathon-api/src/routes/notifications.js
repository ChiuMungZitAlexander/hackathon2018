import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import Notification from '../models/Notification';

async function list(req, res) {
  const docs = await Notification.findUnreadByUser(req.user);
  res.json(docs);
}

async function show(req, res) {
  const doc = await Notification.findById(req.params.id);
  res.json(doc);
}

async function update(req, res) {
  const doc = await Notification.findById(req.params.id);
  doc.readAt = Date.now();
  await doc.save();
  res.status(204).end();
}

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(list));

router.get('/:id', asyncHandler(show));

router.patch('/:id', asyncHandler(update));


export default router;
