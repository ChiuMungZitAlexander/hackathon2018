import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import Watchdog from '../models/Watchdog';
import HealthCheck from '../models/HealthCheck';

async function list(req, res) {
  const docs = await Watchdog.find();
  res.json(docs);
}

async function show(req, res) {
  const doc = await Watchdog.findById(req.params.id);
  res.json(doc);
}

async function create(req, res) {
  await Watchdog.create(req.body);
  res.status(201).end();
}

async function update(req, res) {
  const doc = await Watchdog.findById(req.params.id);
  doc.set(req.body);
  await doc.save();
  res.status(204).end();
}

async function listHealthChecks(req, res) {
  const docs = await HealthCheck.findByWatchdog(req.params.id);
  res.json(docs);
}

async function addHealthCheck(req, res) {
  const doc = new HealthCheck(req.body);
  doc.watchdog = req.params.id;
  await doc.save();
  res.status(201).end();
}

const router = express.Router();

router.use(auth);

router.post('/', asyncHandler(create));

router.get('/', asyncHandler(list));

router.get('/:id', asyncHandler(show));

router.put('/:id', asyncHandler(update));

router.get('/:id/health-checks', asyncHandler(listHealthChecks));

router.post('/:id/health-checks', asyncHandler(addHealthCheck));


export default router;
