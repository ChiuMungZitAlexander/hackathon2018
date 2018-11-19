import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import HealthReport from '../models/HealthReport';

async function show(req, res) {
  const doc = await HealthReport.findById(req.params.id);
  res.json(doc);
}

async function listHealthChecks(req, res) {
  const doc = await HealthReport.findById(req.params.id).populate({
    path: 'healthChecks',
    populate: { path: 'watchdog' },
  }).exec();
  res.json(doc.healthChecks);
}


const router = express.Router();

router.use(auth);

router.get('/:id', asyncHandler(show));

router.get('/:id/health-checks', asyncHandler(listHealthChecks));

export default router;
