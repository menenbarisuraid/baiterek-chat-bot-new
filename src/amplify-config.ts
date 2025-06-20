import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: 'eu-central-1_joZmlVOgL',
        userPoolClientId: '1t3emt23vbu3url3n70ts318sg',
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
    API: {
      REST: {
        /*'baiterek-ve-prod-eu-api*/ 'test-adilet-API': {
          endpoint: 'https://w7mvhc4mvd.execute-api.eu-central-1.amazonaws.com/dev'/* 'https://q99c0m4p4e.execute-api.eu-central-1.amazonaws.com/prod'*/,
          region:'eu-central-1',
        }
      }
    }
  });
};