import React, { useEffect, useRef } from 'react';
import Linkify from 'linkify-react';
import styles from '../ChatBot/ChatBot.module.css';
import { Message, Source } from '../../hooks/useChat';

interface MessageListProps {
  dialog: Message[];
  placeholderText: string;
}

// ──────────────────────────────────────────────
//  Гарантированно получаем URL‑ссылку из Source
// ──────────────────────────────────────────────
const isString = (v: unknown): v is string => typeof v === 'string';

type SourceWithAltLinks = Source & {
  url?: unknown;
  link?: unknown;
};

const getSourceLink = (src: Source): string | null => {
  // 1) стандартное место → S3 URI
  const uri = src.location?.s3Location?.uri;
  if (isString(uri)) return uri;

  // 2) бэкенд может прислать url|link
  const alt = src as SourceWithAltLinks;
  if (isString(alt.url)) return alt.url;
  if (isString(alt.link)) return alt.link;

  // 3) content уже string: берём его, если начинается с http
  if (src.content.startsWith('http')) return src.content;

  return null;
};

export const MessageList: React.FC<MessageListProps> = ({ dialog, placeholderText }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight });
  }, [dialog]);

  return (
      <div className={styles.chatBox} ref={chatBoxRef}>
        {dialog.length === 0 ? (
            <p className={styles.hint}>{placeholderText}</p>
        ) : (
            dialog.map((message) => (
                <React.Fragment key={message.id}>
                  <div className={`${styles.bubble} ${message.isUser ? styles.user : styles.bot}`}>
                    <Linkify options={{ target: '_blank' }}>{message.text}</Linkify>
                  </div>

                  {message.sources?.length ? (
                      <div className={styles.sourcesContainer}>
                        <h4>Sources:</h4>
                        {message.sources.map((source, index) => {
                          const link = getSourceLink(source);
                          return (
                              <div key={index} className={styles.sourceCard}>
                                <div className={styles.sourceContent}>{source.content}</div>
                                <div className={styles.sourceMeta}>
                                  {link ? (
                                      <a
                                          href={link}
                                          className={styles.sourceLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                      >
                                        {link.length > 60 ? `${link.slice(0, 57)}…` : link}
                                      </a>
                                  ) : (
                                      <span className={styles.sourceLink}>No link</span>
                                  )}
                                  {source.score !== undefined && (
                                      <span className={styles.sourceScore}>
                            Score: {source.score.toFixed(2)}
                          </span>
                                  )}
                                </div>
                              </div>
                          );
                        })}
                      </div>
                  ) : null}
                </React.Fragment>
            ))
        )}
      </div>
  );
};