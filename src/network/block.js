import { Router } from 'express';

import { C } from 'common';
import { broadcast } from './modules';

const router = Router();
const {
  SOCKET: { MESSAGE: { BLOCK_PREMINE } },
} = C;

// Endpoints
router.post('/', (req, res) => {
  broadcast({ type: BLOCK_PREMINE, data: req.body });
  res.json({ block: BLOCK_PREMINE });
});

router.get('/last', (req, res) => {
  res.json({ lastBlock: 'unknown' });
});

export default router;
