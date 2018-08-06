import { Router } from 'express';

import { peers } from './socket';

const router = Router();

// Endpoints
router.get('/', (req, res) => {
  res.json({ peers });
});

export default router;
