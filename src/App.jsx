import { useEffect } from 'react';
import Home from './pages/Home';
import { signInState } from './recoil/RecoilSignIn';
import { useRecoilState } from 'recoil';

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
