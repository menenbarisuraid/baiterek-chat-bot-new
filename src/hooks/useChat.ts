import { useState } from 'react';
import { post } from '@aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';

/* ──────────── API configuration ────────────
 * Лучше вынести в .env и подставлять через import.meta.env
 */
const API_NAME = import.meta.env.VITE_API_NAME;
const API_PATH = import.meta.env.VITE_API_PATH;

/* ──────────── типы ──────────── */
export interface Source {
  content: string;
  score?: number;
  location?: {
    s3Location?: {
      uri?: string;
    };
  };
}

export interface Message {
  id: string;
  text: string;
  isUser?: boolean;
  sessionId?: string;
  sources?: Source[];
}

/* ──────────── хук ──────────── */
export const useChat = () => {
  const [dialog, setDialog] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  /** Отправляет сообщение, опционально фильтруя по году */
  const sendMessage = async (text: string, yearFilter?: number) => {
    if (!text.trim()) return;

    // добавляем сообщение пользователя в диалог
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      sessionId,
    };
    setDialog(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      /* --- Auth & role --- */
      const session = await fetchAuthSession();
      const payload = session.tokens?.accessToken?.payload;
      const role = Array.isArray(payload?.['cognito:groups'])
          ? payload['cognito:groups'].join(',')
          : String(payload?.['cognito:groups'] ?? '');

      /* --- REST call --- */
      const restOperation = await post({
        apiName: API_NAME,                 // ← имя из конфигурации
        path: `${API_PATH}/hello`,         // ← конечный ресурс
        options: {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: text,
            sessionId,
            role,
            year: yearFilter ?? null,
          }),
        },
      });

      /* --- response --- */
      const { body } = await restOperation.response;
      const data = JSON.parse(await body.text());

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response_text || 'Ошибка',
        isUser: false,
        sessionId,
        sources: data.sources || [],
      };
      setDialog(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      setDialog(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: 'Произошла ошибка при отправке',
          isUser: false,
          sessionId,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* возвращаем состояние и экшены */
  return { dialog, isLoading, sendMessage };
};
