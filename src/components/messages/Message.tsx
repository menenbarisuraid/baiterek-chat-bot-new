import React from 'react';
import styles from './Message.module.css';
import { User, Bot, AlertCircle, CheckCircle, Database, Clock } from 'lucide-react';
import TextFormatter from './TextFormatter/TextFormatterParsers';

interface SourceBlockProps {
    sources?: string[];
    cached?: boolean;
    locale: {
        sources: string;
        cached: string;
        noSources: string;
    };
}

const SourceBlock: React.FC<SourceBlockProps> = ({ sources, cached, locale }) => {
    if (!cached && (!sources || sources.length === 0)) return null;
    return (
        <div className={styles.sourcesBlock}>
            {cached && (
                <div className={styles.cachedLabel}>
                    <CheckCircle size={12} /> {locale.cached}
                </div>
            )}
            <div className={styles.sourcesTitle}>
                <Database size={14} /> {locale.sources}
            </div>
            {sources && sources.length > 0 ? (
                <ul style={{ listStyle: 'none', paddingLeft: 16 }}>
                    {sources.map((s, i) => (
                        <li key={i} className={styles.sourceItem}>
                            <span className={styles.sourceDot} />
                            <span>{s}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>{locale.noSources}</span>
            )}
        </div>
    );
};

export interface MessageProps {
    message: {
        id: string;
        type: 'user' | 'bot' | 'error';
        content: string;
        timestamp: string;
        sources?: string[];
        cached?: boolean;
    };
    locale: SourceBlockProps['locale'];
}

const Message: React.FC<MessageProps> = ({ message, locale }) => {
    const renderIcon = () => {
        if (message.type === 'user') return <User size={14} />;
        if (message.type === 'error') return <AlertCircle size={20} />;
        return <Bot size={14} color="#fff" />;
    };

    return (
        <div className={`${styles.messageRow} ${styles[message.type]}`}>\
            {/* icon */}
            <div className={`${styles.iconWrapper} ${styles['icon' + message.type.charAt(0).toUpperCase() + message.type.slice(1)]}`}>{renderIcon()}</div>

            {/* bubble */}
            <div className={`${styles.messageBubble} ${styles[message.type]}`}>\
                {message.type === 'bot' ? (
                    <TextFormatter text={message.content} />
                ) : (
                    <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                )}

                {/* sources / cached */}
                {message.type === 'bot' && (
                    <SourceBlock sources={message.sources} cached={message.cached} locale={locale} />
                )}

                {/* timestamp */}
                <div className={styles.timestamp}>
                    <Clock size={12} /> <span>{message.timestamp}</span>
                </div>
            </div>
        </div>
    );
};

export default Message;