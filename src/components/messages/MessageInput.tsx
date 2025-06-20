import React, { useState } from 'react';
import styles from '../ChatBot/ChatBot.module.css';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder: string;
  sendButtonText: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading, placeholder, sendButtonText }) => {
  const [text, setText] = useState('');
  const canSend = text.trim() !== '' && !isLoading;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSend) {
      onSendMessage(text);
      setText(''); // Clear the input after sending
    }
  };

  return (
    <form className={styles.inputBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
        aria-busy={isLoading}
        aria-label="Chat input"
      />
      <button type="submit" disabled={!canSend}>
        {isLoading ? '...' : sendButtonText}
      </button>
    </form>
  );
};