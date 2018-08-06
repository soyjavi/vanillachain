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


// Endpoints
router.get('/broadcast', (req, res) => {
  broadcast({ hello: 'world' });
  res.json();
});

export default router;
