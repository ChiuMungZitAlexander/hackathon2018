import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import HealthCheck from '../models/HealthCheck';

async function list(req, res) {
  const docs = await HealthCheck.findByUser(req.user);
  res.json(docs);
}


const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(list));

export default router;
