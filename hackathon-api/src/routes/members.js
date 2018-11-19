import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import Member from '../models/Member';
import HealthReport from '../models/HealthReport';


async function show(req, res) {
  const doc = await Member.findById(req.params.id);
  res.json(doc);
}

async function update(req, res) {
  const doc = await Member.findById(req.params.id);
  doc.set(req.body);
  await doc.save();
  res.status(204).end();
}

async function listHealthReports(req, res) {
  const docs = await HealthReport.findByMember(req.params.id);
  res.json(docs);
}

async function addHealthReport(req, res) {
  const doc = await Member.findById(req.params.id);
  await doc.createHealthReport();
  res.status(201).end();
}

const router = express.Router();

router.use(auth);

router.get('/:id', asyncHandler(show));

router.put('/:id', asyncHandler(update));

router.get('/:id/health-reports', asyncHandler(listHealthReports));

router.post('/:id/health-reports', asyncHandler(addHealthReport));


export default router;
