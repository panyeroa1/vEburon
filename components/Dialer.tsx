import React from 'react';
import { Phone, PhoneOff, Mic, User, Signal, Battery, Wifi } from 'lucide-react';

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
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-gray-900 sm:rounded-3xl sm:shadow-2xl sm:h-[800px] sm:max-h-[90vh] overflow-hidden relative font-sans text-white">
      
      {/* Background with Blur */}
      <div className="absolute inset-0 bg-gray-800 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/40 to-black/80"></div>
        {/* Abstract Background shapes */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700/30 to-transparent blur-3xl"></div>
      </div>

      {/* Status Bar (Fake) */}
      <div className="flex justify-between items-center px-8 py-5 text-gray-200 text-xs font-medium z-10 opacity-80">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-2">
          <Signal size={14} className="fill-current" />
          <Wifi size={14} />
          <Battery size={16} className="fill-current" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-16 pb-10 px-6 relative z-10 transition-all duration-500">
        
        {/* Contact Info */}
        <div className="text-center space-y-4 mb-auto">
          <div className="relative mx-auto mb-6 w-32 h-32">
             {/* Avatar / Visualizer */}
             {isConnected && (
                <div 
                  className="absolute inset-0 bg-white/20 rounded-full blur-xl transition-all duration-75 ease-out"
                  style={{ 
                    transform: `scale(${pulseScale * 1.2})`,
                    opacity: pulseOpacity
                  }}
                />
              )}
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <User size={48} className="text-gray-400" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-medium tracking-tight text-white">Beatrice De Wilde</h1>
            <p className="text-lg text-gray-300 font-light tracking-wide">+1 (844) 484 9501</p>
          </div>
          
          <div className="h-6">
            <p className="text-sm font-medium text-white/60 tracking-wider uppercase animate-pulse">
              {isConnected ? '00:14' : isRinging ? 'Calling...' : isConnecting ? 'Connecting...' : 'Property Manager'}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-8">
            <div className="px-4 py-3 bg-red-500/90 backdrop-blur-sm text-white text-xs rounded-xl text-center border border-red-400/50 shadow-lg">
              {error}
            </div>
          </div>
        )}

        {/* Action Area */}
        <div className="w-full flex flex-col items-center gap-12 mb-10">
          
          {/* Controls Grid */}
          <div className={`grid grid-cols-3 gap-x-8 gap-y-8 w-full max-w-[300px] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             {['Mute', 'Keypad', 'Speaker', 'Add Call', 'FaceTime', 'Contacts'].map((label, i) => (
               <div key={label} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${label === 'Speaker' && isConnected ? 'bg-white text-gray-900' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {i === 0 && <Mic size={24} />}
                    {i === 1 && <div className="grid grid-cols-3 gap-1"><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/><div className="w-1 h-1 bg-current rounded-full"/></div>}
                    {i === 2 && <Signal size={24} />} 
                    {i > 2 && <User size={24} />} 
                  </div>
                  <span className="text-[10px] font-medium text-white/80">{label}</span>
               </div>
             ))}
          </div>

          {/* Call Action Button */}
          <div className="relative">
            {isActive ? (
              <button
                onClick={onHangup}
                className="w-20 h-20 bg-red-500 text-white rounded-full shadow-lg shadow-red-500/30 flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 hover:bg-red-600"
              >
                <PhoneOff size={32} fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={onCall}
                className="w-20 h-20 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 hover:bg-green-600"
              >
                <Phone size={32} fill="currentColor" className="ml-1" />
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dialer;
