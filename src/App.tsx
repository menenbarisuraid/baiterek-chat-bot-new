import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import ChatBot from './components/ChatBot/ChatBot';

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

export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <BrowserRouter>
          <Routes>
            <Route 
              path="/chatbot" 
              element={
                <div>
                  <ChatBot />
                  <button onClick={signOut}>Sign out</button>
                </div>
              } 
            />
            <Route path="*" element={<Navigate to="/chatbot" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}
