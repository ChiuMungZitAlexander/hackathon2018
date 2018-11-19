import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import Notification from '../models/Notification';

async function list(req, res) {
  const docs = await Notification.findByUser(req.params.id);
  res.json(docs);
}

async function create(req, res) {
  const doc = new Notification(req.body);
  doc.user = req.params.id;
  await doc.save();
  res.status(201).end();
}

const router = express.Router();

router.use(auth);

router.get('/:id/notifications', asyncHandler(list));

router.post('/:id/notifications', asyncHandler(create));


export default router;
