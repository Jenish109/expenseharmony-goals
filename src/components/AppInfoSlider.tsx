import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Rocket, ChartBar, Coins, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppInfoSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Rocket className="h-12 w-12 text-primary" />,
      title: "Welcome Back!",
      description: "ExpenseHarmony helps you track expenses, manage budgets, and achieve your financial goals."
    },
    {
      icon: <ChartBar className="h-12 w-12 text-primary" />,
      title: "Track Your Expenses",
      description: "Easily log and categorize your expenses to keep track of where your money is going."
    },
    {
      icon: <Coins className="h-12 w-12 text-primary" />,
      title: "Set Budget Goals",
      description: "Create budgets for different categories and monitor your progress throughout the month."
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  return (
    <>
      {/* Info button to open the slider */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-md bg-white"
        onClick={() => setIsOpen(true)}
      >
        <Info className="h-5 w-5 text-primary" />
      </Button>

      {/* Slider */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-slate-800 dark:text-white shadow-xl"
          >
            {/* Header with Close button and App Info */}
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-bold">App Info</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[550px] p-6 flex flex-col">
              <div className="flex-1 mt-14 relative overflow-hidden">
                {slides.map((slide, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute top-0 left-0 w-full p-4 ${
                      currentSlide === index ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary/10 dark:bg-primary/5">
                        {slide.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>
                      <p className="text-muted-foreground">{slide.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dots and next button */}
              <div className="mt-6">
                <div className="flex justify-center space-x-2 mb-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentSlide === index ? "bg-primary" : "bg-muted dark:bg-gray-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button 
                  onClick={handleNext}
                  variant="outline" 
                  className="w-full gap-2 bg-stone-950 hover:bg-stone-900 hover:text-white dark:bg-[#020612] dark:hover:bg-[#020918] text-white "
                >
                  Next tip
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};