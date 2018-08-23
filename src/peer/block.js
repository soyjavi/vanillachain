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
  req.query.readMode = true; // @TODO: Use spread operator
  const { latestBlock } = cache(req.query);

  if (latestBlock) res.json(latestBlock);
  else res.status(400).json({ error: 'NaiveChain not found.' });
});

router.get('/socket', (req, res) => {
  global.ws.send(JSON.stringify({ ws: '/socket' }));
  res.json({ socket: true });
});

export default router;
