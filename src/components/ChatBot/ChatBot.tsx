import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import styles from "./ChatBot.module.css";
import logo from "../assets/images/logo.png";
import { post } from "@aws-amplify/api";
import { fetchAuthSession, AuthUser } from "aws-amplify/auth";

interface Message {
  text: string;
  sender?: "user" | "bot";
}

interface ApiResponse {
  message: string;
  status?: string;
}

interface ChatBotProps {
  user: AuthUser | undefined;
  signOut: ((data?: any) => void) | undefined;
}

const ChatBot: React.FC<ChatBotProps> = ({ user, signOut }) => {
  const { t, i18n } = useTranslation();
  const [dialog, setDialog] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canSend = message.trim() !== "" && !isLoading;

  const handleSendMessage = async () => {
    if (!canSend) return;

    const newMessage: Message = { text: message, sender: "user" };
    setDialog((prev) => [...prev, newMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.accessToken?.toString();

      const restOperation = await post({
        apiName: "apidad77fab",
        path: "/",
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: { message: newMessage.text },
        },
      });

      const { body } = await restOperation.response;
      const response: ApiResponse = JSON.parse(await body.text());

      setDialog((prev) => [
        ...prev,
        { text: response.message || t("errGeneric"), sender: "bot" },
      ]);
    } catch (err) {
      console.error(err);
      setDialog((prev) => [
        ...prev,
        { text: t("errGeneric"), sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className={styles.page}>
        {/* ───────── Header ───────── */}
        <header className={styles.header}>
          {/* левая часть: логотип */}
          <div className={styles.logoBlock}>
            <img src={logo} alt="logo" />
            <span className={styles.logoTitle}>
            <strong>{t("appName")}</strong>
            <small>{t("subTitle")}</small>
          </span>
          </div>

          {/* правая часть: e-mail + языки */}
          <div className={styles.actionsWrap}>
            {user?.signInDetails?.loginId && (
                <span className={styles.emailDisplay}>
              {user.signInDetails.loginId}
            </span>
            )}

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
          </div>
        </header>

        {/* ───────── Main card ───────── */}
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

            <form
                className={styles.inputBar}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
            >
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

            <div className={styles.disclaimer}>{t("disclaimer")}</div>
          </section>
        </main>

        {/* плавающая кнопка выхода */}
        {signOut && (
            <button onClick={signOut} className={styles.floatingSignOutBtn}>
              {t("btnSignOut", { defaultValue: "Sign out" })}
            </button>
        )}
      </div>
  );
};

export default ChatBot;
