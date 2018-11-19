import express from 'express';

import me from './me';
import watchGroups from './watch-groups';
import watchdogs from './watchdogs';
import members from './members';
import healthReports from './health-reports';
import healthChecks from './health-checks';
import notifications from './notifications';
import users from './users';

const router = express.Router();

router.use('/me', me);
router.use('/watch-groups', watchGroups);
router.use('/watchdogs', watchdogs);
router.use('/members', members);
router.use('/health-reports', healthReports);
router.use('/health-checks', healthChecks);
router.use('/notifications', notifications);
router.use('/users', users);

export default router;
