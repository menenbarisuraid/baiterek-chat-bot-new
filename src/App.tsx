import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import {Amplify}  from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
<<<<<<< HEAD
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import ChatBot from './components/ChatBot/ChatBot.tsx';

=======
import './App.css';

import ChatBot from './components/ChatBot/ChatBot';
import YearRangePicker from './components/YearSideBar/YearRangePicker.tsx';
>>>>>>> 9b3294b45dd9451da2f322f58a525b8e7ec98f04

Amplify.configure({
  Auth: {
    Cognito: {
<<<<<<< HEAD
      // userPoolId: 'eu-central-1_xaCLPHhTs',
      // userPoolClientId: '5plk66v79glgvfptci5mer5ne5',
      userPoolId: 'eu-central-1_3vi33sPAt',
      userPoolClientId: '50re4qkcdgcbva45sfm0saiq82',
      loginWith: {
        email: true,
      },
=======
      userPoolId: 'eu-central-1_xaCLPHhTs',
      userPoolClientId: '5plk66v79glgvfptci5mer5ne5',
      loginWith: { email: true },
>>>>>>> 9b3294b45dd9451da2f322f58a525b8e7ec98f04
      signUpVerificationMethod: 'code',
      userAttributes: { email: { required: true } },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
<<<<<<< HEAD
        requireSpecialCharacters: true,
      },
    },
  },
  API: {
    REST: {
      apidad77fab: {
        endpoint: 'https://292vy5pmh7.execute-api.eu-central-1.amazonaws.com/default/baiterekchatbotb8c1fe9f-dev',
        region: 'eu-central-1',
=======
        requireSpecialCharacters: true
>>>>>>> 9b3294b45dd9451da2f322f58a525b8e7ec98f04
      }
    }
  }
});


export default function App() {
  /* диапазон выбранных лет хранится здесь */
  const [yearRange, setYearRange] = useState<[number, number]>([2021, 2024]);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
<<<<<<< HEAD

    <Authenticator>
      {({user,  signOut }) => (

        <BrowserRouter>
          <Routes>
            <Route

              path="/chatbot"
              element={
                <div>
                  <ChatBot user={user} signOut={signOut} />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/chatbot" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </Authenticator>
=======
      <Authenticator>
        {({ signOut }) => (
            <BrowserRouter>
              <Routes>
                <Route
                    path="/chatbot"
                    element={
                      <>
                        {/* триггер выбора года — плавающая «pill»-кнопка */}
                        <button
                            className="yearToggleBtn"
                            onClick={() => setPickerOpen(true)}
                            title="Выбрать интервал годов"
                        >
                          {yearRange[0]}-{yearRange[1]}
                        </button>

                        {/* модальное окно выбора интервала */}
                        <YearRangePicker
                            isOpen={pickerOpen}
                            onClose={() => setPickerOpen(false)}
                            onApply={(from, to) => setYearRange([from, to])}
                            defaultRange={yearRange}
                        />

                        {/* сам чат получает диапазон через пропсы */}
                        <ChatBot yearRange={yearRange} />

                        {/* Sign-out остаётся как раньше */}
                        <button className="signOutBtn" onClick={signOut}>
                          Sign out
                        </button>
                      </>
                    }
                />
                <Route path="*" element={<Navigate to="/chatbot" replace />} />
              </Routes>
            </BrowserRouter>
        )}
      </Authenticator>
>>>>>>> 9b3294b45dd9451da2f322f58a525b8e7ec98f04
  );
}
