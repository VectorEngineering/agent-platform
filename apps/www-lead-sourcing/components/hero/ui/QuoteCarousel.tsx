import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// All business quotes
const quotes = [
  // Original quotes
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "If you can dream it, you can do it.",
    author: "Walt Disney",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
  },
  {
    quote:
      "If you're not embarrassed by the first version of your product, you've launched too late.",
    author: "Reid Hoffman",
  },
  {
    quote: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    quote: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "Chase the vision, not the money. The money will end up following you.",
    author: "Tony Hsieh",
  },
  {
    quote: "The harder you work, the luckier you get.",
    author: "Gary Player",
  },
  {
    quote:
      "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },

  // Additional quotes
  {
    quote: "Quality is not an act, it is a habit.",
    author: "Aristotle",
  },
  {
    quote: "Either you run the day or the day runs you.",
    author: "Jim Rohn",
  },
  {
    quote: "Every problem is a gift—without problems we would not grow.",
    author: "Anthony Robbins",
  },
  {
    quote:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    quote:
      "The road to success and the road to failure are almost exactly the same.",
    author: "Colin R. Davis",
  },
  {
    quote: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    quote:
      "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
    author: "Charles Darwin",
  },
  {
    quote:
      "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "Build your own dreams, or someone else will hire you to build theirs.",
    author: "Farrah Gray",
  },
  {
    quote:
      "The ones who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
  },
  {
    quote: "Do what you can, where you are, with what you have.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "If you're going through hell, keep going.",
    author: "Winston Churchill",
  },
  {
    quote: "Failure is the opportunity to begin again more intelligently.",
    author: "Henry Ford",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "Remember that not getting what you want is sometimes a wonderful stroke of luck.",
    author: "Dalai Lama",
  },
  {
    quote:
      "The question isn't who is going to let me; it's who is going to stop me.",
    author: "Ayn Rand",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
  },
  {
    quote: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    quote: "Fall seven times and stand up eight.",
    author: "Japanese Proverb",
  },
  {
    quote: "When I let go of what I am, I become what I might be.",
    author: "Lao Tzu",
  },
  {
    quote: "Life is 10% what happens to me and 90% of how I react to it.",
    author: "Charles Swindoll",
  },
  {
    quote:
      "If you do what you've always done, you'll get what you've always gotten.",
    author: "Tony Robbins",
  },
  {
    quote: "Dreaming, after all, is a form of planning.",
    author: "Gloria Steinem",
  },
  {
    quote:
      "It's your place in the world; it's your life. Go on and do all you can with it, and make it the life you want to live.",
    author: "Mae Jemison",
  },
  {
    quote:
      "You may be disappointed if you fail, but you are doomed if you don't try.",
    author: "Beverly Sills",
  },
  {
    quote:
      "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.",
    author: "Booker T. Washington",
  },
  {
    quote:
      "Certain things catch your eye, but pursue only those that capture the heart.",
    author: "Ancient Indian Proverb",
  },
  {
    quote:
      "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",
    author: "Henry Ford",
  },
  {
    quote: "Change your thoughts and you change your world.",
    author: "Norman Vincent Peale",
  },
  {
    quote: "Nothing is impossible, the word itself says 'I'm possible'!",
    author: "Audrey Hepburn",
  },
  {
    quote:
      "To handle yourself, use your head; to handle others, use your heart.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    author: "Les Brown",
  },
  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },
  {
    quote:
      "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    author: "Mark Twain",
  },
  {
    quote:
      "The most common way people give up their power is by thinking they don't have any.",
    author: "Alice Walker",
  },
  {
    quote:
      "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
  },
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote:
      "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
  },
  {
    quote:
      "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
    author: "Jamie Paolinetti",
  },
  {
    quote:
      "You take your life in your own hands, and what happens? A terrible thing: no one to blame.",
    author: "Erica Jong",
  },
  {
    quote: "What we achieve inwardly will change outer reality.",
    author: "Plutarch",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    quote:
      "Happiness is not something readymade. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    quote:
      "The best reason to start an organization is to make meaning; to create a product or service to make the world a better place.",
    author: "Guy Kawasaki",
  },
  {
    quote: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
  },
  {
    quote:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart",
  },
  {
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle Onassis",
  },
  {
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson",
  },
  {
    quote:
      "The real opportunity for success lies within the person and not in the job.",
    author: "Zig Ziglar",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote:
      "Someone is sitting in the shade today because someone planted a tree a long time ago.",
    author: "Warren Buffett",
  },
  {
    quote:
      "Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them.",
    author: "Vaibhav Shah",
  },
  {
    quote:
      "Don't let the fear of losing be greater than the excitement of winning.",
    author: "Robert Kiyosaki",
  },
  {
    quote:
      "If you want to achieve excellence, you can get there today. As of this second, quit doing less-than-excellent work.",
    author: "Thomas J. Watson",
  },
  {
    quote:
      "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon",
  },
  {
    quote: "The successful warrior is the average man, with laser-like focus.",
    author: "Bruce Lee",
  },
  {
    quote:
      "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
  },
  {
    quote:
      "If you genuinely want something, don't wait for it — teach yourself to be impatient.",
    author: "Gurbaksh Chahal",
  },
  {
    quote:
      "If you are not willing to risk the usual, you will have to settle for the ordinary.",
    author: "Jim Rohn",
  },
  {
    quote:
      "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.",
    author: "Swami Vivekananda",
  },
  {
    quote:
      "If you can't explain it simply, you don't understand it well enough.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
  {
    quote:
      "People often say that motivation doesn't last. Well, neither does bathing – that's why we recommend it daily.",
    author: "Zig Ziglar",
  },
];

interface QuoteCardProps {
  quote: string;
  author: string;
  isActive: boolean;
  index: number;
}

const QuoteCard = ({ quote, author, isActive, index }: QuoteCardProps) => {
  // Create a unique gradient angle based on the index
  const gradientAngle = 45 + ((index * 15) % 315);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1 : 0.95,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      whileHover={{
        scale: 1.02,
        opacity: 1,
        transition: { duration: 0.2 },
      }}
      className={`relative overflow-hidden rounded-xl p-0.5 ${isActive ? "shadow-lg" : "shadow-md"} `}
      style={{
        background: isActive
          ? `linear-gradient(${gradientAngle}deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05))`
          : "hsl(var(--card) / 0.05)",
      }}
    >
      <div className="h-full rounded-lg bg-background/80 p-5 backdrop-blur-md">
        <div className="mb-1 text-xs font-semibold text-primary/50">
          INSIGHT
        </div>
        <p className="mb-3 text-sm font-medium leading-relaxed text-foreground">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <div className="h-px flex-grow bg-foreground/10"></div>
          <p className="text-xs font-medium text-foreground/60">{author}</p>
        </div>
      </div>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary/50 shadow-[0_0_10px_hsl(var(--primary)_/_0.5)]"
        />
      )}
    </motion.div>
  );
};

const QuoteCarousel = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [visibleQuotes, setVisibleQuotes] = useState<number[]>([]);
  const [numVisibleQuotes, setNumVisibleQuotes] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Update number of visible quotes based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setNumVisibleQuotes(4);
      } else if (window.innerWidth >= 1280) {
        setNumVisibleQuotes(3);
      } else if (window.innerWidth >= 1024) {
        setNumVisibleQuotes(2);
      } else if (window.innerWidth >= 768) {
        setNumVisibleQuotes(2);
      } else {
        setNumVisibleQuotes(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Update visible quotes
    const indices = [];
    for (let i = 0; i < numVisibleQuotes; i++) {
      indices.push((currentQuoteIndex + i) % quotes.length);
    }
    setVisibleQuotes(indices);

    // Cycle through quotes (but only if not hovered)
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentQuoteIndex, numVisibleQuotes, isHovered]);

  return (
    <div
      className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 transform lg:block xl:right-8 2xl:right-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col space-y-3 md:space-y-4">
        <AnimatePresence mode="popLayout">
          {visibleQuotes.map((index, i) => (
            <motion.div
              key={`quote-${index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                  delay: i * 0.1,
                },
              }}
              exit={{
                opacity: 0,
                x: -50,
                transition: { duration: 0.3 },
              }}
              layout
              className="w-72 sm:w-80 md:w-[340px]"
              style={{
                zIndex: numVisibleQuotes - i,
              }}
            >
              <QuoteCard
                quote={quotes[index].quote}
                author={quotes[index].author}
                isActive={i === 0}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quote navigation indicators */}
      <div className="mt-4 flex justify-center gap-1">
        {[...Array(Math.min(5, quotes.length))].map((_, i) => (
          <motion.div
            key={`indicator-${i}`}
            className="h-1 w-6 rounded-full bg-foreground/20"
            animate={{
              backgroundColor:
                (i + currentQuoteIndex) % 5 === currentQuoteIndex % 5
                  ? "hsl(var(--primary) / 0.7)"
                  : "hsl(var(--foreground) / 0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteCarousel;
