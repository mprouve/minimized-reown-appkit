import { FC } from 'react';
import { logoutAndCleanSession } from './api/auth/logout';
import { useAppSelector } from './hooks/useAppSelector';
import { selectAuthenticated } from './redux/slices/authenticated/authenticated';
import ButtonConnectWallet from './components/input/ButtonConnectWallet';
import ButtonCreateWallet from './components/input/ButtonCreateWallet';

const App: FC = () => {
  const authenticated = useAppSelector(selectAuthenticated);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (window.wagmiDisconnect) {
      window.wagmiDisconnect();
    } else {
      logoutAndCleanSession({ showMessage: true });
    }
  };

  if (authenticated)
    return (
      <div>
        <div>Logged In!</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );

  return (
    <div>
      <ButtonCreateWallet disableGrow />
      <ButtonConnectWallet disableGrow />
    </div>
  );
};

export default App;
