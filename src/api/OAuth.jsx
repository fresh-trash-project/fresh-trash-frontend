import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export const GoogleLoginButton = () => {
  const clientId = 'clientID';

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={res => {
            console.log(res);
          }}
          onFailure={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};
