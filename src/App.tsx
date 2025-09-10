import { useState } from 'react';
import { Navigation } from './components/navigation';
import { HomeScreen } from './components/home-screen';
import { EmotionModule } from './components/emotion-module';
import { StoryModule } from './components/story-module';
import { RoutineModule } from './components/routine-module';
import { ChatModule } from './components/chat-module';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'emotions':
        return <EmotionModule />;
      case 'stories':
        return <StoryModule />;
      case 'routine':
        return <RoutineModule />;
      case 'chat':
        return <ChatModule />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="pb-20">
        {renderActiveModule()}
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}