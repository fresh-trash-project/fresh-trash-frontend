import { useEffect } from 'react';
import Home from './pages/Home';
import { signInState } from './recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';

function App() {
  const [signIn, setSignIn] = useRecoilState(signInState);
  // App initialization
  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      // Token exists, so the user is signed in
      setSignIn(true);
    }
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
