import { Router } from 'express';
import { Block } from 'Blockchain';
import { cache } from './modules';

const router = Router();

// Middleware
router.use((req, res, next) => {
  // @TODO: Secure
  next();
});

// Endpoints
router.post('/', (req, res) => {
  const {
    file, keyChain, data = {}, previousHash,
  } = req.body;
  const blockchain = cache({ file, keyChain });

  res.json(blockchain.addBlock({ data }, previousHash));
});

router.post('/mine', (req, res) => {
  const {
    file, keyChain, data = {}, previousHash,
  } = req.body;
  const { difficulty } = cache({ file, keyChain });

  res.json(new Block({ data, difficulty, previousHash }));
});

router.get('/last', (req, res) => {
  req.query.readMode = true; // @TODO: Use spread operator
  const { latestBlock } = cache(req.query);

  res.json(latestBlock);
});

router.get('/socket', (req, res) => {
  global.ws.send(JSON.stringify({ ws: '/socket' }));
  res.json({ socket: true });
});

export default router;
