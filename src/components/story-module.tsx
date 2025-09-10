import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function StoryModule() {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stories = [
    {
      id: 1,
      title: "The Friendly Forest",
      description: "Meet animal friends in the magical forest",
      color: "bg-green-100 border-green-200",
      pages: [
        {
          text: "Once upon a time, in a magical forest, lived many friendly animals.",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        },
        {
          text: "There was Benny the Bear, who loved to share honey with everyone.",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        },
        {
          text: "And Ruby the Rabbit, who helped others find their way home.",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        },
        {
          text: "Together, they learned that friendship makes everything better!",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        }
      ]
    },
    {
      id: 2,
      title: "The Magic Garden",
      description: "Discover the secret of growing happiness",
      color: "bg-pink-100 border-pink-200",
      pages: [
        {
          text: "Lily found a special garden where kindness helped flowers grow.",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        },
        {
          text: "Every time she said something nice, a new flower bloomed.",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        },
        {
          text: "Soon, the garden was full of beautiful, colorful flowers!",
          image: "https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNoaWxkcmVuJTIwYm9vayUyMGlsbHVzdHJhdGlvbiUyMGFuaW1hbHN8ZW58MXx8fHwxNzU3NDg1OTA1fDA&ixlib=rb-4.1.0&q=80&w=400"
        }
      ]
    }
  ];

  const currentStoryData = stories[currentStory];
  const currentPageData = currentStoryData.pages[currentPage];
  const progress = ((currentPage + 1) / currentStoryData.pages.length) * 100;

  const nextPage = () => {
    if (currentPage < currentStoryData.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const switchStory = (storyIndex: number) => {
    setCurrentStory(storyIndex);
    setCurrentPage(0);
    setIsPlaying(false);
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl text-purple-600 mb-2">Story Time</h1>
        <p className="text-gray-600">Listen to magical tales</p>
      </div>

      {/* Story Selector */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => switchStory(index)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all duration-200 whitespace-nowrap
              ${currentStory === index 
                ? story.color + ' shadow-lg' 
                : 'bg-white border-gray-200 hover:bg-gray-50'}
            `}
          >
            <BookOpen size={16} />
            <span className="text-sm">{story.title}</span>
          </button>
        ))}
      </div>

      {/* Story Content */}
      <Card className="p-6 bg-white border-2 border-purple-200 shadow-lg mb-6">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Page {currentPage + 1} of {currentStoryData.pages.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Story Image */}
        <div className="mb-6">
          <ImageWithFallback
            src={currentPageData.image}
            alt="Story illustration"
            className="w-full h-48 object-cover rounded-2xl"
          />
        </div>

        {/* Story Text */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <p className="text-gray-800 leading-relaxed text-lg">
            {currentPageData.text}
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <Volume2 size={16} className="ml-2" />
          </Button>
          <span className="text-sm text-gray-600">
            {isPlaying ? 'Playing...' : 'Tap to listen'}
          </span>
        </div>
      </Card>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          variant="outline"
          size="lg"
          className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <SkipBack size={20} className="mr-2" />
          Back
        </Button>

        <div className="flex gap-2">
          {currentStoryData.pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                ${currentPage === index ? 'bg-purple-600' : 'bg-gray-300'}
              `}
            />
          ))}
        </div>

        <Button
          onClick={nextPage}
          disabled={currentPage === currentStoryData.pages.length - 1}
          variant="outline"
          size="lg"
          className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
          <SkipForward size={20} className="ml-2" />
        </Button>
      </div>

      {/* Completion Message */}
      {currentPage === currentStoryData.pages.length - 1 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl text-center">
          <p className="text-green-700 mb-2">🎉 Story Complete!</p>
          <p className="text-sm text-gray-600">Great job listening to the whole story!</p>
        </div>
      )}
    </div>
  );
}