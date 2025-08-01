import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface WebcamFeedProps {
  onEmotionDetected: (emotion: string) => void;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ onEmotionDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [error, setError] = useState<string | null>(null);

  const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'confused'];

  useEffect(() => {
    let stream: MediaStream | null = null;
    let emotionInterval: NodeJS.Timeout;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsActive(true);
          setError(null);

          // Simulate emotion detection every 3 seconds
          emotionInterval = setInterval(() => {
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            setCurrentEmotion(randomEmotion);
            onEmotionDetected(randomEmotion);
          }, 3000);
        }
      } catch (err) {
        setError('Failed to access webcam. Please allow camera permissions.');
        setIsActive(false);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (emotionInterval) {
        clearInterval(emotionInterval);
      }
    };
  }, [onEmotionDetected]);

  const getEmotionColor = (emotion: string) => {
    const colors = {
      happy: 'text-yellow-400',
      sad: 'text-blue-400',
      angry: 'text-red-400',
      surprised: 'text-purple-400',
      neutral: 'text-gray-400',
      confused: 'text-orange-400'
    };
    return colors[emotion as keyof typeof colors] || 'text-gray-400';
  };

  const getEmotionEmoji = (emotion: string) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      surprised: '😲',
      neutral: '😐',
      confused: '🤔'
    };
    return emojis[emotion as keyof typeof emojis] || '😐';
  };

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
      {error ? (
        <div className="flex items-center justify-center h-full flex-col space-y-4">
          <CameraOff className="w-16 h-16 text-gray-500" />
          <p className="text-gray-400 text-center px-4">{error}</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {isActive && (
            <>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getEmotionEmoji(currentEmotion)}</span>
                  <div>
                    <p className="text-white text-sm font-medium">Detected:</p>
                    <p className={`text-sm font-bold capitalize ${getEmotionColor(currentEmotion)}`}>
                      {currentEmotion}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WebcamFeed;