import { Home, Heart, BookOpen, Clock, MessageCircle } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'emotions', icon: Heart, label: 'Feelings' },
    { id: 'stories', icon: BookOpen, label: 'Stories' },
    { id: 'routine', icon: Clock, label: 'Schedule' },
    { id: 'chat', icon: MessageCircle, label: 'Friend' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-100 px-2 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'text-gray-500 hover:text-purple-500'
              }`}
            >
              <Icon size={24} className="shrink-0" />
              <span className="text-xs leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}