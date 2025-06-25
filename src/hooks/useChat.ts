import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { post } from '@aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';





// Define the shape of a message for type safety
export interface Message {
  id: string; // Unique ID for React key
  text: string;
  isUser: boolean;
  sources?: any[]; // Optional sources from the bot response
}

// Configuration for the API - better to use environment variables in a real app
const API_NAME ='test-adilet-API'; /*'baiterek-ve-prod-eu-api';*/
const API_PATH = '/test-adilet'/*'/hello'*/;

/**
 * A private helper function to abstract the API call.
 * This could also be moved to a dedicated `apiService.ts` file in a larger application.
 */
const sendMessageToApi = async (question: string, sessionId: string) => {
  const session = await fetchAuthSession();
  const groups = session.tokens?.accessToken?.payload?.['cognito:groups'] as string[] || [];
  const role = groups.join(',');

  const restOperation = post({
    apiName: API_NAME,
    path: API_PATH,
    options: {
      body: {
        question,
        sessionId,
        role,
      }
    }
  });

  const { body } = await restOperation.response;
  // Use the built-in .json() method for cleaner parsing
  return await body.json() as { response_text: string; sources?: any[] };
};

/**
 * Custom hook to manage the entire chat logic.
 */
export const useChat = () => {
  const { t } = useTranslation();
  const [dialog, setDialog] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // The session ID is stable for the lifetime of the component instance
  const [sessionId] = useState<string>(() => self.crypto.randomUUID());

  const sendMessage = async (userMessageText: string) => {
    if (!userMessageText.trim() || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: self.crypto.randomUUID(),
      text: userMessageText,
      isUser: true,
    };

    // Immediately add the user's message to the dialog
    setDialog(prevDialog => [...prevDialog, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageToApi(userMessageText, sessionId);

      const botMessage: Message = {
        id: self.crypto.randomUUID(),
        text: response.response_text || t('errors.default'),
        isUser: false,
        sources: response.sources,
      };
      setDialog(prevDialog => [...prevDialog, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: self.crypto.randomUUID(),
        text: t('errors.sendMessageFailed'), // Using i18n for error messages
        isUser: false,
      };
      setDialog(prevDialog => [...prevDialog, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { dialog, isLoading, sendMessage };
};