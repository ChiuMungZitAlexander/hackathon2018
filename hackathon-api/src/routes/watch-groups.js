import express from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../auth';
import WatchGroup from '../models/WatchGroup';
import Member, { MEMBER_ROLES } from '../models/Member';

async function list(req, res) {
  const docs = await WatchGroup.findByUser(req.user);
  res.json(docs);
}

async function show(req, res) {
  const doc = await WatchGroup.findById(req.params.id).populate('watchdogs').exec();
  res.json(doc);
}

async function create(req, res) {
  const doc = await WatchGroup.create(req.body);
  doc.addMember(req.user, MEMBER_ROLES.MAINTAINER);
  res.status(201).end();
}

async function update(req, res) {
  const doc = await WatchGroup.findById(req.params.id);
  doc.set(req.body);
  await doc.save();
  res.status(204).end();
}

async function listMembers(req, res) {
  const docs = await Member.findByWatchGroup(req.params.id).populate('user').exec();
  res.json(docs);
}

async function addMember(req, res) {
  const doc = new Member(req.body);
  doc.watchGroup = req.params.id;
  await doc.save();
  res.status(201).end();
}


const router = express.Router();

router.use(auth);

router.post('/', asyncHandler(create));

router.get('/', asyncHandler(list));

router.get('/:id', asyncHandler(show));

router.put('/:id', asyncHandler(update));

router.get('/:id/members', asyncHandler(listMembers));

router.post('/:id/members', asyncHandler(addMember));

export default router;
