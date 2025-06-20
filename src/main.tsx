import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureAmplify } from './amplify-config.ts';
// import { Amplify } from "aws-amplify";
// import outputs from "../amplify_outputs.json";

// Amplify.configure(outputs);
configureAmplify();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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


