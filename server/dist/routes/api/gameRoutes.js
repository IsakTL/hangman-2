import { Router } from 'express';
import { getInitialGameState, addGuess } from '../../controllers/game-controller.js';
const router = Router();
router.get('/start', getInitialGameState);
router.post('/:id/guess', addGuess);
export default router;
