import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import "../../i18n";
import styles from "./ChatBot.module.css";
import logo from "./../assets/images/logo.png";
import { post } from '@aws-amplify/api';


export default function ChatBot() {
    const { t, i18n } = useTranslation();
    const [dialog, setDialog] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const canSend = message.trim() && !isLoading;

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: message,
            
            timestamp: new Date().toISOString()
        };

        setDialog(prev => [...prev, newMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const restOperation = await post({
                apiName: 'baiterek-ve-prod-eu-api',
                path: '/hello',
                options: {
                    body: {
                        message: newMessage.text,
                        
                    }
                }
            });

            const { body } = await restOperation.response;
            const response = await body.json();

            const botResponse = {
                id: Date.now() + 1,
                text: response.message || 'Извините, произошла ошибка',
                sender: 'bot',
                timestamp: new Date().toISOString()
            };

            setDialog(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: 'Извините, произошла ошибка при отправке сообщения',
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            setDialog(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoBlock}>
                    <img src={logo} alt="logo" />
                    <span className={styles.logoTitle}>
                        <strong>{t("appName")}</strong>
                        <small>{t("subTitle")}</small>
                    </span>
                </div>
                <div className={styles.langWrap}>
                    {["kk", "ru", "en"].map((lng) => (
                        <button
                            key={lng}
                            className={`${styles.langBtn} ${
                                i18n.language === lng ? styles.langActive : ""
                            }`}
                            onClick={() => i18n.changeLanguage(lng)}
                        >
                            {lng === "kk" ? "Қаз" : lng === "ru" ? "Рус" : "Eng"}
                        </button>
                    ))}
                </div>
            </header>

            <main className={styles.body}>
                <section className={styles.card}>
                    <div className={styles.infoBlock}>
                        <p>{t("welcomeMessage")}</p>
                    </div>

                    <div className={styles.chatBox}>
                        {dialog.length === 0 ? (
                            <p className={styles.hint}>{t("placeholderDefault")}</p>
                        ) : (
                            dialog.map((m, i) => (
                                <div
                                    key={i}
                                    className={`${styles.bubble} ${
                                        m.sender === "user" ? styles.user : styles.bot
                                    }`}
                                >
                                    {m.text}
                                </div>
                            ))
                        )}
                    </div>

                    <form className={styles.inputBar} onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                        <input
                            type="text"
                            placeholder={t("placeholderDefault")}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={!canSend}>
                            {isLoading ? "..." : t("btnSend")}
                        </button>
                    </form>

                    <div className={styles.disclaimer}>
                        {t("disclaimer")}
                    </div>
                </section>
            </main>
        </div>
    );
}
