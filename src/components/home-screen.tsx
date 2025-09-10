import { Heart, BookOpen, Clock, MessageCircle, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const modules = [
    {
      id: 'emotions',
      title: 'Feelings',
      description: 'Learn about emotions',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
      buttonColor: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      id: 'stories',
      title: 'Stories',
      description: 'Fun interactive tales',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'routine',
      title: 'Schedule',
      description: 'Daily activities',
      icon: Clock,
      color: 'bg-blue-100 text-blue-600',
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'chat',
      title: 'Friend',
      description: 'Chat with buddy',
      icon: MessageCircle,
      color: 'bg-yellow-100 text-yellow-600',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
    }
  ];

  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1748691661032-97e9ec7c6ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwYXV0aXNtJTIwZnJpZW5kbHklMjBjYXJ0b29uJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1NzQ4NTg1OXww&ixlib=rb-4.1.0&q=80&w=200"
            alt="Happy children illustration"
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h1 className="text-3xl text-purple-600 mb-2">Hello Friend!</h1>
        <p className="text-gray-600">Let's explore and learn together</p>
        
        {/* Star decorations */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-400 fill-current animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Module Cards */}
      <div className="space-y-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <div
              key={module.id}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${module.color}`}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-1">{module.title}</h3>
                    <p className="text-gray-500">{module.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(module.id)}
                  className={`px-6 py-3 text-white rounded-2xl transition-all duration-200 shadow-md active:scale-95 ${module.buttonColor}`}
                >
                  Go
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome Message */}
      <div className="mt-8 p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h3 className="text-lg text-gray-800 mb-2">Today's Goal</h3>
          <p className="text-gray-600">Explore one new activity and have fun!</p>
          <div className="mt-4 bg-purple-100 rounded-2xl p-4">
            <p className="text-purple-600">You're doing great! 🌟</p>
          </div>
        </div>
      </div>
    </div>
  );
}