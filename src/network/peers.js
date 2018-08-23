import { Router } from 'express';

import { broadcast } from './modules';
import { peers } from './socket';

const router = Router();

// Endpoints
router.get('/', (req, res) => {
  res.json({ peers });
});

router.get('/broadcast', (req, res) => {
  broadcast({ wss: 'Broadcasting...' });
  res.json({ broadcast: true });
});

export default router;
