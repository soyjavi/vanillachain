import { Router } from 'express';

import { broadcast } from './modules';
import PKG from '../../package.json';

const router = Router();

// Middleware
router.use((req, res, next) => {
  // @TODO: Secure
  next();
});

// Endpoints
router.get('/', (req, res) => {
  res.json({
    name: PKG.name,
    version: PKG.version,
    stats: {},
  });
});

router.get('/broadcast', (req, res) => {
  broadcast({ wss: 'Broadcasting...' });
  res.json({ broadcast: true });
});

export default router;
