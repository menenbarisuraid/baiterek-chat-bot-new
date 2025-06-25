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


// import React, { useEffect, useRef } from 'react';
// import Linkify from 'linkify-react';
// import styles from '../ChatBot/ChatBot.module.css';
// import { Message } from '../../hooks/useChat';

// interface MessageListProps {
//   dialog: Message[];
//   placeholderText: string;
// }

// export const MessageList: React.FC<MessageListProps> = ({ dialog, placeholderText }) => {
//   const chatBoxRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [dialog]);

//   return (
//     <div className={styles.chatBox} ref={chatBoxRef}>
//       {dialog.length === 0 ? (
//         <p className={styles.hint}>{placeholderText}</p>
//       ) : (
//         dialog.map((message) => (
//           <React.Fragment key={message.id}>
//             <div className={`${styles.bubble} ${message.isUser ? styles.user : styles.bot}`}>
//               <Linkify options={{ target: '_blank' }}>{message.text}</Linkify>
//             </div>
//             {message.sources && message.sources.length > 0 && (
//               <div className={styles.sourcesContainer}>
//                 <h4>Sources:</h4>
//                 {message.sources.map((source, index) => (
//                   <div key={index} className={styles.sourceCard}>
//                     <div className={styles.sourceContent}>
//                       {source.content}
//                     </div>
//                     <div className={styles.sourceMeta}>
//                       {source.location.s3Location?.uri ? (
//                         <a
//                           href={source.location.s3Location.uri}
//                           className={styles.sourceLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {source.location.s3Location.uri}
//                         </a>
//                       ) : (
//                         <span className={styles.sourceLink}>Unknown source</span>
//                       )}
//                       <span className={styles.sourceScore}>
//                         Score: {source.score.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </React.Fragment>
//         ))
//       )}
//     </div>
//   );
// };
