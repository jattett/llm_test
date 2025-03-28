import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const huggingFaceKey = process.env.HUGGINGFACE_API_KEY!;
const model = 'skt/kogpt2-base-v2'; // ✅ KoGPT2 (한국어 지원)

export const getHuggingFaceResponse = async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: '프롬프트가 필요합니다.' });
    return;
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${huggingFaceKey}` },
      }
    );

    const generatedText = response.data[0]?.generated_text || '응답 없음';
    res.json({ response: generatedText }); // ✅ `return` 제거
  } catch (error) {
    console.error('Hugging Face API 에러:', error);
    res.status(500).json({ error: 'Hugging Face API 요청 실패' }); // ✅ `return` 제거
  }
};
