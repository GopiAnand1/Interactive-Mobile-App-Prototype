import { useState } from 'react';
import { Smile, Frown, Angry, Heart, ThumbsUp, RefreshCw, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function EmotionModule() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const emotions = [
    {
      id: 'happy',
      label: 'Happy',
      icon: Smile,
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      activeColor: 'bg-yellow-200 ring-4 ring-yellow-300',
      description: 'When we feel good and smile',
      example: 'Like when you play with your favorite toy!'
    },
    {
      id: 'sad',
      label: 'Sad',
      icon: Frown,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      activeColor: 'bg-blue-200 ring-4 ring-blue-300',
      description: 'When we feel down or upset',
      example: 'Like when you miss someone you love'
    },
    {
      id: 'angry',
      label: 'Angry',
      icon: Angry,
      color: 'bg-red-100 text-red-600 border-red-200',
      activeColor: 'bg-red-200 ring-4 ring-red-300',
      description: 'When we feel mad or frustrated',
      example: 'Like when something doesn\'t go as planned'
    },
    {
      id: 'love',
      label: 'Love',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600 border-pink-200',
      activeColor: 'bg-pink-200 ring-4 ring-pink-300',
      description: 'When we care about someone',
      example: 'Like how you feel about family and friends'
    },
    {
      id: 'excited',
      label: 'Excited',
      icon: ThumbsUp,
      color: 'bg-green-100 text-green-600 border-green-200',
      activeColor: 'bg-green-200 ring-4 ring-green-300',
      description: 'When we feel really happy about something',
      example: 'Like before going somewhere fun!'
    }
  ];

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId);
    setShowFeedback(true);
    // Auto-hide feedback after 3 seconds
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const resetSelection = () => {
    setSelectedEmotion(null);
    setShowFeedback(false);
  };

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion);

  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-purple-600 mb-2">How Are You Feeling?</h1>
        <p className="text-gray-600">Tap on an emotion to learn more</p>
      </div>

      {/* Emotion Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {emotions.map((emotion) => {
          const Icon = emotion.icon;
          const isSelected = selectedEmotion === emotion.id;
          
          return (
            <button
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion.id)}
              className={`
                p-6 rounded-3xl border-2 transition-all duration-300 active:scale-95
                ${isSelected ? emotion.activeColor : emotion.color}
                ${isSelected ? 'shadow-lg' : 'shadow-md hover:shadow-lg'}
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <Icon size={48} className="animate-pulse" />
                <span className="text-lg">{emotion.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {showFeedback && selectedEmotionData && (
        <Card className="p-6 bg-white border-2 border-purple-200 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          <div className="text-center">
            <div className="mb-4">
              <div className={`inline-flex p-4 rounded-full ${selectedEmotionData.color}`}>
                <selectedEmotionData.icon size={32} />
              </div>
            </div>
            <h3 className="text-xl text-gray-800 mb-2">
              You're feeling {selectedEmotionData.label}!
            </h3>
            <p className="text-gray-600 mb-3">{selectedEmotionData.description}</p>
            <div className="bg-purple-50 rounded-2xl p-4 mb-4">
              <p className="text-purple-700">{selectedEmotionData.example}</p>
            </div>
            
            {/* Audio button simulation */}
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-3 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
            >
              <Volume2 size={16} className="mr-2" />
              Listen
            </Button>
            
            <div className="flex justify-center">
              <div className="text-2xl animate-bounce">🌟</div>
            </div>
          </div>
        </Card>
      )}

      {/* Reset Button */}
      {selectedEmotion && (
        <div className="text-center mt-6">
          <Button
            onClick={resetSelection}
            variant="outline"
            size="lg"
            className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw size={20} className="mr-2" />
            Try Again
          </Button>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl">
        <h3 className="text-lg text-gray-800 mb-3 text-center">💡 Feeling Tips</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• It's okay to feel different emotions</p>
          <p>• You can talk about your feelings</p>
          <p>• Deep breaths can help when upset</p>
          <p>• Feelings can change throughout the day</p>
        </div>
      </div>
    </div>
  );
}