import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);

  // 🎤 음성 인식 시작
  const startListening = () => {
    setIsListening(true);

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setQuestion(text);
      await getResponse(text);
      setIsListening(false);
    };
    recognition.start();
  };

  // 💬 백엔드 API 요청
  const getResponse = async (userText: string) => {
    try {
      const res = await axios.post('http://localhost:5000/api/gpt', {
        prompt: userText,
      });
      setResponse(res.data.response);
      speak(res.data.response);
    } catch (error) {
      console.error('API 요청 오류:', error);
      setResponse('응답을 가져오지 못했어요.');
    }
  };

  // 🔊 텍스트 음성 출력 (TTS)
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎤 AI 음성 챗봇</h1>
      <button onClick={startListening} disabled={isListening}>
        {isListening ? '듣는 중...' : '🎙️ 말하기'}
      </button>
      <p>
        <strong>질문:</strong> {question}
      </p>
      <p>
        <strong>AI 응답:</strong> {response}
      </p>
    </div>
  );
};

export default App;
