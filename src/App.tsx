import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

import ChatBot from './components/ChatBot/ChatBot';
import YearRangePicker from './components/YearSideBar/YearRangePicker.tsx';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-central-1_xaCLPHhTs',
      userPoolClientId: '5plk66v79glgvfptci5mer5ne5',
      loginWith: { email: true },
      signUpVerificationMethod: 'code',
      userAttributes: { email: { required: true } },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true
      }
    }
  }
});

export default function App() {
  /* диапазон выбранных лет хранится здесь */
  const [yearRange, setYearRange] = useState<[number, number]>([2021, 2024]);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
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
  );
}
