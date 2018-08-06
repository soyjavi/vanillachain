import { Router } from 'express';
import { broadcast } from './modules';

const router = Router();

// Endpoints
router.post('/', (req, res) => {
  broadcast({ block: { hello: 'naivechain' } });
  res.json({ block: undefined });
});

router.get('/last', (req, res) => {
  res.json({ lastBlock: 'unknown' });
});

export default router;
