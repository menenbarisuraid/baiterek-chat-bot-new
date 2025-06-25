import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import styles from './ChatBot.module.css';

import { ChatHeader } from './ChatHeader';
import { MessageList } from '../messages/MessageList';
import { MessageInput } from '../messages/MessageInput';
import { useChat } from '../../hooks/useChat';
import { AuthUser } from 'aws-amplify/auth';

interface ChatBotProps {
  user: AuthUser | undefined;
  signOut: ((data?: any) => void) | undefined;
}

const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025];

const ChatBot: React.FC<ChatBotProps> = ({ user, signOut }) => {
  const { t, i18n } = useTranslation();
  const { dialog, isLoading, sendMessage } = useChat();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleSend = (message: string) => {
    sendMessage(message, selectedYear ?? undefined);
  };

  return (
      <div className={styles.page}>
        <ChatHeader
            user={user}
            signOut={signOut}
            onLanguageChange={(lng) => i18n.changeLanguage(lng)}
            currentLanguage={i18n.language}
        />

        <main className={styles.body}>
          <section className={styles.card}>
            <div className={styles.infoBlock}>
              <p>{t('welcomeMessage')}</p>
            </div>

            {/* Фильтр по годам */}
            <div className={styles.yearToggle}>
              {AVAILABLE_YEARS.map((year) => (
                  <button
                      key={year}
                      className={`${styles.yearButton} ${selectedYear === year ? styles.active : ''}`}
                      onClick={() => setSelectedYear((prev) => (prev === year ? null : year))}
                  >
                    {year}
                  </button>
              ))}
            </div>

            <MessageList dialog={dialog} placeholderText={t('placeholderDefault')} />

            <MessageInput
                onSendMessage={handleSend}
                isLoading={isLoading}
                placeholder={t('placeholderDefault')}
                sendButtonText={t('btnSend')}
            />

            <div className={styles.disclaimer}>{t('disclaimer')}</div>
          </section>
        </main>
      </div>
  );
};

export default ChatBot;
