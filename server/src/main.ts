import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import huggingFaceRoutes from './routes/huggingFaceRoutes';

dotenv.config();

const app = express();

// ✅ CORS 설정 (특정 도메인 허용)
app.use(
  cors({
    origin: 'http://localhost:5173', // 🚀 프론트엔드 주소만 허용
    methods: ['GET', 'POST', 'OPTIONS'], // 🚀 OPTIONS 프리플라이트 요청 허용
    allowedHeaders: ['Content-Type', 'Authorization'], // 🚀 요청 헤더 허용
    credentials: true, // 🚀 인증 정보 포함 가능
  })
);

// ✅ Preflight OPTIONS 요청 처리 (중요!)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());

// ✅ `/api/gpt` 엔드포인트 연결
app.use('/api/gpt', huggingFaceRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
