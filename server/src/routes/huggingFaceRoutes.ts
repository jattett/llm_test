import express from 'express';
import { getHuggingFaceResponse } from '../controllers/huggingFaceController';

const router = express.Router();

// ✅ Express 핸들러는 `Promise<void>`를 사용해야 정상 동작
router.post('/', getHuggingFaceResponse);

export default router;
