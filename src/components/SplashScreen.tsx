
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, ChartBar, Coins, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { add_Monthly_Earning_Budget } from '@/redux/dashboard/dashboardThunk';
import { LocalKeys } from '@/lib/constants';
import { toast } from 'sonner';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [monthlyData, setMonthlydata] = useState({
    monthly_budget: "",
    monthly_income: "",
  });
  const dispatch = useDispatch();
  
  const slides = [
    {
      icon: <Rocket className="h-16 w-16 text-primary" />,
      title: "Welcome to ExpenseHarmony",
      description: "Take control of your finances with our easy-to-use expense tracking and budget management tools."
    },
    {
      icon: <ChartBar className="h-16 w-16 text-primary" />,
      title: "Track Your Spending",
      description: "View detailed charts and insights about your spending habits to make smarter financial decisions."
    },
    {
      icon: <Coins className="h-16 w-16 text-primary" />,
      title: "Set Budget Goals",
      description: "Create custom budget goals and track your progress to achieve financial freedom."
    },
    {
      icon: <DollarSign className="h-16 w-16 text-primary" />,
      title: "Let's Set Up Your Finances",
      description: "To get started, let us know your monthly income and budget target.",
      form: true
    }
  ];

  useEffect(() => {
    if (isSkipped) {
      handleComplete();
    }
  }, [isSkipped]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Only save monthly data if we're on the last slide and values are provided
    if (currentSlide === slides.length - 1 && 
        monthlyData.monthly_budget && 
        monthlyData.monthly_income) {
      saveMonthlyData();
    }
    onComplete();
  };

  const saveMonthlyData = () => {
    localStorage.setItem(LocalKeys.MONTHLY_DATA_SET, "true");
    dispatch(add_Monthly_Earning_Budget(monthlyData));
    toast.success("Financial setup complete!");
  };

  const isLastSlideValid = () => {
    if (currentSlide !== slides.length - 1) return true;
    return Boolean(monthlyData.monthly_budget && monthlyData.monthly_income);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/10 to-background z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md px-6 py-12 rounded-2xl bg-card shadow-2xl border border-border"
      >
        <div className="relative h-[450px]">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                x: currentSlide === index ? 0 : currentSlide > index ? -100 : 100
              }}
              transition={{ duration: 0.4 }}
              className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-6 ${
                currentSlide === index ? "block" : "hidden"
              }`}
            >
              <div className="mb-8 p-4 rounded-full bg-primary/10 flex items-center justify-center">
                {slide.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4">{slide.title}</h2>
              <p className="text-muted-foreground mb-8">{slide.description}</p>
              
              {slide.form && (
                <div className="w-full space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthly_income">Monthly Income</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                      <Input
                        id="monthly_income"
                        placeholder="0.00"
                        value={monthlyData.monthly_income}
                        onChange={(e) => setMonthlydata({
                          ...monthlyData,
                          monthly_income: e.target.value,
                        })}
                        type="number"
                        min="0"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthly_budget">Monthly Budget Target</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                      <Input
                        id="monthly_budget"
                        placeholder="0.00"
                        value={monthlyData.monthly_budget}
                        onChange={(e) => setMonthlydata({
                          ...monthlyData,
                          monthly_budget: e.target.value,
                        })}
                        type="number"
                        min="0"
                        step="0.01"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Dots indicator */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentSlide === index ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            <Button
              variant="link"
              onClick={() => setIsSkipped(true)}
              className="text-muted-foreground"
            >
              Skip
            </Button>
            <Button 
              onClick={handleNext} 
              className="gap-2"
              disabled={!isLastSlideValid()}
            >
              {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
