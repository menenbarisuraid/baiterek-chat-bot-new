import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ChatBot from '../ChatBot/ChatBot.tsx'; // Make sure the path is correct

export default function ProtectedRoute() {
  return (
    // The Authenticator component will handle the entire sign-in/sign-up flow.
    <Authenticator>
      {({ user, signOut }) => (
        // Once the user is signed in, it will render the ChatBot component,
        // passing the user object and signOut function as props.
        <ChatBot user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}