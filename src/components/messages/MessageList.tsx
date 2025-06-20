import React from 'react';
import Linkify from 'linkify-react';
import styles from '../ChatBot/ChatBot.module.css';
import { Message } from '../../hooks/useChat'; // Import the shared interface

interface MessageListProps {
  dialog: Message[];
  placeholderText: string;
}

export const MessageList: React.FC<MessageListProps> = ({ dialog, placeholderText }) => {
  // Scrolls the chat box to the bottom when a new message is added
  const chatBoxRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [dialog]);

  return (
    <div className={styles.chatBox} ref={chatBoxRef}>
      {dialog.length === 0 ? (
        <p className={styles.hint}>{placeholderText}</p>
      ) : (
        dialog.map((message) => (
          <div
            key={message.id} // Using the stable, unique ID
            className={`${styles.bubble} ${message.isUser ? styles.user : styles.bot}`}
          >
            <Linkify options={{ target: '_blank' }}>{message.text}</Linkify>
          </div>
        ))
      )}
    </div>
  );
};