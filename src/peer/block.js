import { Router } from 'express';
import { block, cache } from './modules';

const router = Router();

// Middleware
router.use((req, res, next) => {
  // @TODO: Secure
  next();
});

// Endpoints
router.post('/', (req, res) => {
  const newBlock = block(req.body);
  return res.json(newBlock || { error: 'previousHash is not from the last block.' });
});

router.get('/last', (req, res) => {
  const blockchain = cache(req.query);
  res.json(blockchain.latestBlock);
});

export default router;
