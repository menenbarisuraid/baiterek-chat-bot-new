

// import { Authenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
// import '@aws-amplify/ui-react/styles.css';
// // import outputs from "../amplify_outputs.json";

// // Amplify.configure(outputs);
// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: "eu-central-1_xaCLPHhTs",
//       userPoolClientId: "5plk66v79glgvfptci5mer5ne5",
//       loginWith: {
//         email: true,
//       },
//       signUpVerificationMethod: "code",
//       userAttributes: {
//         email: {
//           required: true,
//         },
//       },
//       passwordFormat: {
//         minLength: 8,
//         requireLowercase: true,
//         requireUppercase: true,
//         requireNumbers: true,
//         requireSpecialCharacters: true,
//       },
//     },
//   },
// });

// export default function App() {
//   return (
//     <Authenticator>
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user?.username}</h1>
//           <button onClick={signOut}>Sign out</button>
//         </main>
//       )}
//     </Authenticator>
//   );
// }


// import { Authenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
// import '@aws-amplify/ui-react/styles.css';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: 'eu-central-1_xaCLPHhTs',
//       userPoolClientId: '5plk66v79glgvfptci5mer5ne5',
//       loginWith: {
//         email: true,
//       },
//       signUpVerificationMethod: 'code',
//       userAttributes: {
//         email: {
//           required: true,
//         },
//       },
//       passwordFormat: {
//         minLength: 8,
//         requireLowercase: true,
//         requireUppercase: true,
//         requireNumbers: true,
//         requireSpecialCharacters: true,
//       },
//     },
//   },
// });


// function RedirectToChatBot() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate('/chatBot');
//   }, [navigate]);

//   return null;
// }

// function ChatBot() {
//   return <h2>🤖 Добро пожаловать в ChatBot!</h2>;
// }

// function Home({ signOut, user }: any) {
//   return (
//     <>
//       <h1>Hello {user?.username}</h1>
//       <button onClick={signOut}>Sign out</button>
//       <RedirectToChatBot />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Authenticator>
//         {({ signOut, user }) => (
//           <Routes>
//             <Route path="/" element={<Home signOut={signOut} user={user} />} />
//             <Route path="/chatBot" element={<ChatBot />} />
//           </Routes>
//         )}
//       </Authenticator>
//     </Router>
//   );
// }



import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-central-1_xaCLPHhTs',
      userPoolClientId: '5plk66v79glgvfptci5mer5ne5',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
});

function RedirectToChatBot() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/chatbot');
  }, [navigate]);

  return null;
}

function ChatBot() {
  return <h2>🤖 Добро пожаловать в ChatBot!</h2>;
}

export default function App() {
  return (
    <Router>
      <Authenticator>
        {({ signOut }) => (
          <Routes>
            {/* Сразу редирект с корня на /chatbot */}
            <Route path="/" element={<RedirectToChatBot />} />
            <Route
              path="/chatbot"
              element={
                <div>
                  <ChatBot />
                  <button onClick={signOut}>Sign out</button>
                </div>
              }
            />
            {/* fallback на случай странного пути */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Authenticator>
    </Router>
  );
}
