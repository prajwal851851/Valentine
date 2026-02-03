import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MailOpen, Stars } from 'lucide-react';
import './App.css';

const NO_MESSAGES = [
  "Really? 🤨",
  "Nope. Not happening 😌",
  "Please say yes 🥺",
  "I will wait for you 😭",
  "Good try 😂",
  "Think again... 🤔",
  "Wrong answer! 🚫",
  "Oops, try again 😅",
  "Nah, click Yes 💕",
  "You're breaking my heart 💔",
  "Don't be shy 🙈",
  "Come on! 🥹",
  "Pretty please? 🌸",
  "I won't give up 💪",
  "Say yes already! 😩",
  "You know you want to 😏",
  "Why not? 🤷",
  "Just say it... YES 💖",
  "I'm waiting... ⏰",
  "Forever chasing you 🏃‍♂️",
  "My heart says try again ❤️",
  "One more chance? 🙏",
  "Are you playing hard to get? 😜",
  "I'm not leaving 🚶‍♂️❌",
  "Persistence is key 🔑",
  "Click the right button 👉",
  "Wrong button, sweetie 💋",
  "Not that one! 🙅",
  "The other button please 🥺",
  "You're so cute when you try 😍",
  "I love your stubbornness 💗",
  "Challenge accepted 💪",
  "Is that your final answer? 🎯",
  "Reconsider? 🤗",
  "I'll ask again... 🔄",
  "You're making this fun 🎢",
  "Keep trying 😈",
  "Almost there! 🏁",
  "So close to yes! 📍",
  "One step closer 👣",
  "Don't resist love 💘",
  "Love always wins 🏆",
  "You can't say no forever ♾️",
  "I believe in us 🌟",
  "We're meant to be ✨",
  "Destiny says yes 🔮",
  "The stars align for us ⭐",
  "My heart chose you 💝",
  "Say yes for me? 🥰",
  "I'm blushing already 😊",
  "You're my person 👫",
  "Be mine? 💌",
  "Pretty please with a cherry? 🍒",
  "With sprinkles on top? 🎂",
  "I made this just for you 🎁",
  "You're worth the chase 🏃‍♀️",
  "Never giving up on you 💖",
  "You complete me 🧩",
  "My heart skips for you 💓",
  "You make me smile 😁",
  "Every no brings us closer 📏",
  "I'll keep trying 🔁",
  "You're adorable 🐻",
  "Love is patient 🕊️",
  "Love is persistent 💪❤️",
  "I've got all day ☀️",
  "And all night 🌙",
  "Forever if needed ♾️❤️",
  "You're worth it 💎",
  "Diamonds are forever, so is my love 💍",
  "Just one little yes 🤏",
  "Three letters: Y-E-S ✍️",
  "Repeat after me: Yes 🗣️",
  "Easy peasy! 🍋",
  "You got this! 💪",
  "I know you want to 🤭",
  "Your heart says yes 💗",
  "Listen to your heart ❤️‍🔥",
  "Follow your heart 🧭",
  "Trust me on this 🤞",
  "We'll be amazing together 🌈",
  "Picture us together 📸",
  "Imagine the memories 🎞️",
  "Adventures await us 🗺️",
  "Let's write our story 📖",
  "Chapter 1: You said yes 📕",
  "Spoiler: You'll say yes 🎬",
  "The ending is happy 🎉",
  "Plot twist: It's love 💕",
  "Still here waiting 🧍",
  "Patiently yours 💌",
  "Yours truly 💋",
  "With love 💝",
  "Hugs and kisses 🤗💋"
];

const RAIN_EMOJIS = ['💕', '✨', '😘', '🥰', '💞', '✨', '🥰', '✨', '💖', '💗'];

const ROMANTIC_SONG_URL = "/audio/song.mp3";

function App() {
  const [phase, setPhase] = useState('proposing');
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isExpanding, setIsExpanding] = useState(false);
  const audioRef = useRef(null);
  const noBtnRef = useRef(null);
  const cardRef = useRef(null);

  // Background hearts
  const hearts = useRef([...Array(15)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${10 + Math.random() * 8}s`,
    size: `${1.2 + Math.random() * 1.5}rem`
  })));

  // Floating sparkles for home page
  const sparkles = useRef([...Array(8)].map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 15
  })));

  // Emoji rain - falling from top
  const emojiRain = useRef([...Array(30)].map((_, i) => ({
    id: i,
    emoji: RAIN_EMOJIS[Math.floor(Math.random() * RAIN_EMOJIS.length)],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    size: 1.5 + Math.random() * 1.5
  })));

  const startMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  };

  // Try to play music as soon as page loads
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Set volume to 50%
      audio.play().catch(() => {
        // Autoplay blocked - will play on first click
        console.log("Waiting for user interaction to play audio");
      });
    }
  }, []);

  const handleNoHover = () => {
    startMusic();
    const cardRect = cardRef.current?.getBoundingClientRect();
    if (!cardRect) return;

    const btnWidth = 160;
    const btnHeight = 55;
    const padding = 50;
    const maxX = cardRect.width - btnWidth - padding;
    const maxY = cardRect.height - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setNoPosition({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
  };

  const handleYes = () => {
    startMusic();
    setIsExpanding(true);

    setTimeout(() => {
      setPhase('celebrating');
      triggerFirecrackers();
    }, 600);

    setTimeout(() => {
      setPhase('reading');
    }, 6000);
  };

  const triggerFirecrackers = () => {
    const colors = ['#ff4d6d', '#ff758f', '#ffd700', '#ff6b6b', '#ffffff', '#ffccd5'];

    confetti({
      particleCount: 100,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300
    });

    const explode = (x, y, delay) => {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 360,
          origin: { x, y },
          colors,
          startVelocity: 40,
          gravity: 1,
          ticks: 250
        });
      }, delay);
    };

    explode(0.2, 0.3, 200);
    explode(0.8, 0.3, 400);
    explode(0.3, 0.7, 600);
    explode(0.7, 0.7, 800);
    explode(0.5, 0.2, 1000);
    explode(0.1, 0.5, 1200);
    explode(0.9, 0.5, 1400);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 360,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff4d6d', '#ffd700', '#ffffff'],
        startVelocity: 55,
        gravity: 0.6,
        ticks: 400
      });
    }, 1800);

    let burstCount = 0;
    const burstInterval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors,
        startVelocity: 30
      });
      burstCount++;
      if (burstCount > 8) clearInterval(burstInterval);
    }, 400);
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <div className="app-container" onClick={startMusic}>
      <audio ref={audioRef} src={ROMANTIC_SONG_URL} loop />

      {/* Background Hearts */}
      <div className="bg-hearts">
        {hearts.current.map(h => (
          <div
            key={h.id}
            className="bg-heart"
            style={{
              left: h.left,
              animationDelay: h.delay,
              animationDuration: h.duration,
              fontSize: h.size
            }}
          >
            💗
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'proposing' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: isExpanding ? 0 : 1,
              scale: isExpanding ? 1.15 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="card-wrapper"
          >
            {/* Floating Sparkles around card */}
            {sparkles.current.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.5, 1, 0],
                  scale: [0.5, 1.2, 1, 1.2, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  delay: s.delay,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                style={{
                  position: 'absolute',
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  pointerEvents: 'none',
                  zIndex: 5
                }}
              >
                <Stars size={s.size} color="#ffd700" fill="#ffd700" />
              </motion.div>
            ))}

            <div ref={cardRef} className="glass-card proposal-card" style={{ position: 'relative' }}>
              {/* Animated Heart with Glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  y: [0, -15, 0],
                }}
                transition={{
                  scale: { duration: 0.8, ease: "backOut" },
                  rotate: { duration: 0.8, ease: "backOut" },
                  y: { repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.8 }
                }}
                className="floating-icon"
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 10px rgba(255, 77, 109, 0.3))",
                      "drop-shadow(0 0 25px rgba(255, 77, 109, 0.6))",
                      "drop-shadow(0 0 10px rgba(255, 77, 109, 0.3))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={100} color="#ff4d6d" fill="#ff4d6d" />
                </motion.div>
              </motion.div>

              {/* Animated Title */}
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                Will you be my Valentine?
              </motion.h1>

              {/* Animated Subtitle */}
              <motion.p
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
              >
                I've been waiting to ask you this...
              </motion.p>

              {/* Animated Buttons */}
              <motion.div
                className="btn-group"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 15px 40px -8px rgba(255, 77, 109, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className="btn btn-yes"
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Yes
                  </motion.span>
                </motion.button>

                <motion.button
                  ref={noBtnRef}
                  animate={noCount > 0 ? {
                    position: 'absolute',
                    left: noPosition.x,
                    top: noPosition.y,
                  } : {}}
                  transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  className="btn btn-no"
                  style={{
                    position: noCount > 0 ? 'absolute' : 'relative',
                    zIndex: 9999,
                  }}
                >
                  {noCount === 0 ? "No" : NO_MESSAGES[noCount % NO_MESSAGES.length]}
                </motion.button>
              </motion.div>

              {/* Corner Decorations */}
              <motion.div
                className="corner-decor top-left"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} color="#ffd700" />
              </motion.div>
              <motion.div
                className="corner-decor top-right"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} color="#ffd700" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === 'celebrating' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="full-overlay celebration-view"
          >
            {/* Emoji Rain */}
            {emojiRain.current.map((item) => (
              <motion.div
                key={item.id}
                initial={{ y: '-10vh', x: item.left, opacity: 0 }}
                animate={{
                  y: '110vh',
                  opacity: [0, 1, 1, 0.5],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: item.duration + 2,
                  delay: item.delay,
                  ease: "linear",
                  repeat: Infinity
                }}
                style={{
                  position: 'absolute',
                  left: item.left,
                  fontSize: `${item.size}rem`,
                  pointerEvents: 'none'
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut", delay: 0.3 }}
              className="celebration-content"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                className="celebration-heart"
              >
                <Heart size={120} color="#ff4d6d" fill="#ff4d6d" />
              </motion.div>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                YES
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="celebration-subtitle"
              >
                You made me the happiest🤗🤗
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {phase === 'reading' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="card-wrapper"
          >
            <div className="glass-card letter-card">
              <div className="letter-header">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <MailOpen size={40} color="#ff4d6d" />
                </motion.div>
                <h2>A Love Letter for You 💌</h2>
              </div>
              <div className="letter-body">
                <p>My dearest Valentine,</p>
                <p>
                  My love for you is like a software update, I didn't know I needed it, but now my whole system runs better.
                </p>
                <p>
                  Thanks for being the "Yes" to my "Will you?" Every day with you is my favorite chapter.
                </p>
                <p>
                  You make my days so much brighter.
                  I'm so incredibly happy you said YES! 😍
                </p>
                <p className="signature">
                  Forever & Always Yours,<br />
                  💕 Your Valentine
                </p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="bottom-icon"
              >
                <Sparkles size={30} color="#ff4d6d" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
