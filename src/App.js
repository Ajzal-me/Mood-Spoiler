import React, { useState } from 'react';
import MoodScanner from './components/MoodScanner';
import ChatWindow from './components/ChatWindow';
import { Camera, MessageSquare, Zap } from 'lucide-react';

function App() {
  const [detectedEmotion, setDetectedEmotion] = useState('neutral');

  const handleEmotionDetected = (emotion) => {
    setDetectedEmotion(emotion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mood Spoiler</h1>
                <p className="text-gray-400 text-sm">AI Chatbot that ruins your vibe</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Emotion Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Opposite Responses</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Webcam Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Camera className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-semibold text-white">Live Emotion Detection</h2>
            </div>
            <div className="h-full min-h-[400px]">
              <MoodScanner onEmotionDetected={handleEmotionDetected} />
            </div>
          </div>

          {/* Chat Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-semibold text-white">Mood-Opposite Chat</h2>
            </div>
            <div className="h-full min-h-[400px]">
              <ChatWindow detectedEmotion={detectedEmotion} />
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Detection</h3>
            <p className="text-gray-400 text-sm">
              Your webcam analyzes facial expressions to detect emotions in real-time.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Mood Spoiling</h3>
            <p className="text-gray-400 text-sm">
              Happy? We'll bring you down. Sad? We'll annoyingly cheer you up!
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Opposite Vibes</h3>
            <p className="text-gray-400 text-sm">
              Every response is designed to be the opposite of what you'd expect.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;