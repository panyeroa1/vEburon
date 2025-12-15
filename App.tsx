import React from 'react';
import { useLiveCall } from './hooks/useLiveCall';
import Dialer from './components/Dialer';

const App: React.FC = () => {
  const { connectionState, connect, disconnect, volumeLevel, error } = useLiveCall();

  const handleCall = async () => {
    await connect();
  };

  const handleHangup = async () => {
    await disconnect();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-0 sm:p-4">
      <Dialer 
        onCall={handleCall}
        onHangup={handleHangup}
        state={connectionState}
        volume={volumeLevel}
        error={error}
      />
    </div>
  );
};

export default App;
