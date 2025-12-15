import React from 'react';
import { Phone, PhoneOff, Mic, User, Signal } from 'lucide-react';

interface DialerProps {
  onCall: () => void;
  onHangup: () => void;
  state: 'disconnected' | 'ringing' | 'connecting' | 'connected';
  volume: number; // 0 to 1
  error: string | null;
}

const Dialer: React.FC<DialerProps> = ({ onCall, onHangup, state, volume, error }) => {
  const isConnected = state === 'connected';
  const isConnecting = state === 'connecting';
  const isRinging = state === 'ringing';
  const isActive = isConnected || isConnecting || isRinging;

  // Calculate pulse effect based on volume
  const pulseScale = 1 + Math.min(volume * 0.5, 0.5); // Max 1.5x scale
  const pulseOpacity = 0.3 + Math.min(volume, 0.7);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-white sm:rounded-3xl sm:shadow-2xl sm:h-[800px] sm:max-h-[90vh] overflow-hidden relative">
      {/* Top Status Bar (Fake) */}
      <div className="flex justify-between items-center px-6 py-4 text-gray-400 text-xs font-medium">
        <span>Beatrice Mobile</span>
        <div className="flex items-center gap-1">
          <Signal size={12} />
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-8 px-6 relative z-10 transition-all duration-500">
        
        {/* Contact Avatar / Visualizer */}
        <div className="relative mb-8">
          {isConnected && (
            <div 
              className="absolute inset-0 bg-rose-400 rounded-full blur-2xl transition-all duration-100 ease-out"
              style={{ 
                transform: `scale(${pulseScale * 1.5})`,
                opacity: pulseOpacity * 0.6
              }}
            />
          )}
          {isRinging && (
             <div 
              className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-20"
            />
          )}
          
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl flex items-center justify-center relative z-10 border-4 border-white">
            {/* Using a placeholder image for Beatrice */}
            <img 
               src="https://picsum.photos/200/200" 
               alt="Beatrice" 
               className="w-full h-full object-cover rounded-full opacity-90"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Beatrice De Wilde</h1>
          <p className="text-sm font-medium text-rose-500 uppercase tracking-wider">
            {isConnected ? 'On Call' : isRinging ? 'Calling...' : isConnecting ? 'Connecting...' : 'Property Manager'}
          </p>
          {isConnected && (
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-2 animate-pulse">
               <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
               <span>00:14</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 text-xs rounded-lg text-center max-w-xs mx-auto border border-red-100">
            {error}
          </div>
        )}

        {/* Action Area */}
        <div className="mt-auto w-full flex flex-col items-center gap-8">
          
          {/* Controls (Mute/Speaker) - Visual only for this demo */}
          {isConnected && (
            <div className="flex justify-center w-full gap-8 px-8">
              <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <Mic size={20} />
                </div>
                <span className="text-xs">Mute</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                 <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <User size={20} />
                </div>
                <span className="text-xs">Contacts</span>
              </button>
            </div>
          )}

          {/* Call Action Button */}
          <div className="relative group">
            {isActive ? (
              <button
                onClick={onHangup}
                className="w-20 h-20 bg-red-500 text-white rounded-full shadow-red-200 shadow-xl flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                <PhoneOff size={32} fill="currentColor" />
              </button>
            ) : (
              <React.Fragment>
                {/* Ping animation for call button */}
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 duration-1000"></div>
                <button
                  onClick={onCall}
                  className="w-20 h-20 bg-green-500 text-white rounded-full shadow-green-200 shadow-xl flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-100 relative z-10"
                >
                  <Phone size={32} fill="currentColor" className="ml-1" />
                </button>
              </React.Fragment>
            )}
          </div>
          
          <div className="h-8"></div> {/* Spacer */}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-rose-50/50 to-transparent -z-0 pointer-events-none"></div>
    </div>
  );
};

export default Dialer;
