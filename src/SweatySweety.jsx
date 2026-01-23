import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const LOADING_MESSAGES = [
  "Turning love into language...",
  "Adjusting banter levels...",
  "Sprinkling in some spice...",
  "Consulting the heart oracle...",
  "Weaving sweet nothings...",
  "Channeling cupid's creativity...",
  "Brewing nickname magic...",
  "Calibrating cuteness meters..."
];

const STORAGE_KEY = 'sweaty-sweety-memories';

// Auth Screen Component
function AuthScreen({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError('Check your email for a confirmation link!');
        setLoading(false);
        return;
      }
      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-bg" style={authStyles.container}>
      <div style={authStyles.card}>
        <div style={authStyles.logoContainer}>
          <span style={authStyles.heartIcon}>💝</span>
          <h1 style={authStyles.title}>Sweaty Sweety</h1>
        </div>
        <p style={authStyles.subtitle}>Turn shared moments into playful inside jokes.</p>
        
        <form onSubmit={handleSubmit} style={authStyles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={authStyles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={authStyles.input}
            required
            minLength={6}
          />
          
          {error && (
            <p style={authStyles.error}>{error}</p>
          )}
          
          <button
            type="submit"
            style={{
              ...authStyles.button,
              ...(loading ? authStyles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>
        
        <p style={authStyles.switchText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            style={authStyles.switchLink}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-bg {
          background: linear-gradient(-45deg, #1a0a2e, #4a1942, #6b1d3a, #3d1a5c, #4a1942, #1a0a2e);
          background-size: 300% 300%;
          animation: gradientFlow 10s ease infinite;
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

const authStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Quicksand', sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px 30px',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  heartIcon: {
    fontSize: '36px',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  },
  subtitle: {
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    color: '#e2e8f0',
    fontSize: '16px',
    fontFamily: "'Quicksand', sans-serif",
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '16px 24px',
    border: 'none',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  error: {
    color: '#f87171',
    fontSize: '14px',
    textAlign: 'center',
    margin: '0',
    padding: '12px',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '12px',
  },
  switchText: {
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '24px',
  },
  switchLink: {
    color: '#f472b6',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default function SweatySweety() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [memory, setMemory] = useState('');
  const [nicknameStyle, setNicknameStyle] = useState('sweet');
  const [inputMode, setInputMode] = useState('type');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [generatedNicknames, setGeneratedNicknames] = useState([]);
  const [selectedNicknames, setSelectedNicknames] = useState(new Set());
  const [savedMemories, setSavedMemories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMemoryId, setExpandedMemoryId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copiedNickname, setCopiedNickname] = useState(null);
  const recognitionRef = useRef(null);
  const voiceTimeoutRef = useRef(null);
  const isProcessingRef = useRef(false);
  const isSavingRef = useRef(false);

  // Check auth state on mount and listen for changes
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load memories from Supabase (only when user is logged in)
  useEffect(() => {
    const loadMemories = async () => {
      if (!supabase || !user) {
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Failed to load memories:', error);
        } else {
          setSavedMemories(data || []);
        }
      } catch (e) {
        console.error('Failed to load memories:', e);
      }
    };
    
    loadMemories();
  }, [user]);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        // Clear fail-safe timer if recognition started successfully
        if (voiceTimeoutRef.current) {
          clearTimeout(voiceTimeoutRef.current);
          voiceTimeoutRef.current = null;
        }
      };
      
      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setMemory(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        resetVoiceState();
      };
      
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        resetVoiceState();
      };
    }
    
    // Cleanup on unmount
    return () => {
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  // Helper to fully reset voice state
  const resetVoiceState = () => {
    setIsListening(false);
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current);
      voiceTimeoutRef.current = null;
    }
  };

  // Resume AudioContext to wake up mobile hardware
  const resumeAudioContext = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }
        // Create a brief silent sound to fully wake up audio hardware
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0; // Silent
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.01);
      }
    } catch (e) {
      console.log('AudioContext resume skipped:', e);
    }
  };

  const toggleVoice = async () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      // Stop recording
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
      resetVoiceState();
    } else {
      // Start recording
      setMemory('');
      
      // 1. Resume AudioContext to wake up mobile hardware
      await resumeAudioContext();
      
      // 2. Set listening state
      setIsListening(true);
      
      // 3. Start recognition
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
        resetVoiceState();
        return;
      }
      
      // 4. Fail-safe timer - reset if onstart doesn't fire within 4 seconds
      voiceTimeoutRef.current = setTimeout(() => {
        console.log('Voice recognition timeout - resetting');
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            // Ignore
          }
        }
        resetVoiceState();
        alert('Voice recording failed to start. Please try again.');
      }, 4000);
    }
  };

  const generateNicknames = async () => {
    if (!memory.trim()) return;
    if (isProcessingRef.current) return; // Guard against re-triggers
    
    isProcessingRef.current = true;
    setIsLoading(true);
    setLoadingMessageIndex(0);
    setGeneratedNicknames([]);
    setSelectedNicknames(new Set());
    
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      
      console.log('API Key exists:', !!apiKey);
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const styleInstructions = {
        sweet: `Style: SWEET - Focus on warm, tender, "aww"-worthy nicknames. Use words like "honey," "angel," "hero," "sunshine," "sweetheart" vibes. Make them heartfelt and endearing.`,
        teasing: `Style: TEASING - Focus on playful, sassy, banter-filled nicknames. Reference funny moments, playful "fails," or inside jokes from the memory. Keep it lighthearted and fun.`,
        flirty: `Style: FLIRTY - Focus on subtly suggestive, complimentary nicknames. Hint at attraction, appearance, or charm. Keep it spicy but tasteful.`,
        wildcard: `Style: WILDCARD - Go completely creative and unexpected! Be weird, quirky, and inventive. Surprise the user with unique combinations they'd never think of.`
      };
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Based on this relationship memory, generate exactly 5 playful, affectionate 2-word nicknames for the person (boyfriend/girlfriend) mentioned in the memory. The nicknames should describe the PERSON, not the event.

${styleInstructions[nicknameStyle]}

Rules:
- Each nickname must be exactly 2 words
- Nicknames should match the requested style above
- Reference traits, actions, or characteristics of the person from the memory
- Good example: "Shadow Searcher" (describes the person who searched)
- Bad example: "Searching Shadows" (describes the event)

Memory: "${memory}"

Respond with ONLY a JSON array of 5 nickname strings, nothing else. Example format: ["Nickname One", "Nickname Two", "Nickname Three", "Nickname Four", "Nickname Five"]`
          }]
        })
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }
      
      const text = data.content?.[0]?.text || '';
      const cleaned = text.replace(/```json|```/g, '').trim();
      const nicknames = JSON.parse(cleaned);
      setGeneratedNicknames(nicknames);
    } catch (error) {
      console.error('Error generating nicknames:', error);
      // Fallback nicknames for demo
      setGeneratedNicknames([
        "Dream Keeper",
        "Cuddle Commander",
        "Heart Whisperer",
        "Joy Bringer",
        "Love Architect"
      ]);
    } finally {
      setIsLoading(false);
      isProcessingRef.current = false;
    }
  };

  const toggleNicknameSelection = (nickname) => {
    setSelectedNicknames(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nickname)) {
        newSet.delete(nickname);
      } else {
        newSet.add(nickname);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (nickname, e) => {
    e.stopPropagation(); // Prevent triggering the card selection
    try {
      await navigator.clipboard.writeText(nickname);
      setCopiedNickname(nickname);
      setTimeout(() => setCopiedNickname(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const saveSelectedNicknames = async () => {
    if (!supabase || !user) {
      console.log('Supabase not configured or user not logged in');
      return;
    }
    
    if (isSavingRef.current) return; // Guard against double-saves
    isSavingRef.current = true;
    
    try {
      const existingNicknames = new Set(savedMemories.map(m => m.nickname));
      const newMemories = [];
      
      selectedNicknames.forEach(nickname => {
        if (!existingNicknames.has(nickname)) {
          newMemories.push({
            user_id: user.id,
            nickname,
            memory: memory,
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          });
        }
      });
      
      if (newMemories.length > 0) {
        const { data, error } = await supabase
          .from('memories')
          .insert(newMemories)
          .select();
        
        if (error) {
          console.error('Failed to save memories:', error);
        } else {
          setSavedMemories(prev => [...data, ...prev]);
          // Trigger confetti burst
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }
    } finally {
      isSavingRef.current = false;
    }
  };

  const deleteMemory = async (id) => {
    if (!supabase) {
      console.log('Supabase not configured');
      return;
    }
    
    const { error } = await supabase
      .from('memories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Failed to delete memory:', error);
    } else {
      setSavedMemories(prev => prev.filter(m => m.id !== id));
    }
    setDeleteConfirmId(null);
  };

  const handleLogout = async () => {
    console.log('Logout button clicked!');
    try {
      if (supabase) {
        console.log('Calling supabase.auth.signOut()');
        await supabase.auth.signOut();
        console.log('Sign out successful');
      } else {
        console.log('Supabase not initialized');
      }
      // Clear all user-specific state
      setSavedMemories([]);
      setMemory('');
      setGeneratedNicknames([]);
      setSelectedNicknames(new Set());
      setSearchQuery('');
      setExpandedMemoryId(null);
      setDeleteConfirmId(null);
      setUser(null);
      console.log('State cleared, user set to null');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out: ' + error.message);
    }
  };

  const filteredMemories = savedMemories.filter(m => 
    m.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.memory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const wordCount = memory.trim().split(/\s+/).filter(w => w).length;

  const savedNicknamesSet = new Set(savedMemories.map(m => m.nickname));

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="animated-bg" style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#e2e8f0' }}>
          <span style={{ fontSize: '48px' }}>💝</span>
          <p style={{ fontFamily: "'Quicksand', sans-serif", marginTop: '16px' }}>Loading...</p>
        </div>
        <style>{`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-bg {
            background: linear-gradient(-45deg, #1a0a2e, #4a1942, #6b1d3a, #3d1a5c, #4a1942, #1a0a2e);
            background-size: 300% 300%;
            animation: gradientFlow 10s ease infinite;
          }
          body { margin: 0; padding: 0; }
        `}</style>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  return (
    <div className="animated-bg" style={styles.container}>
      {/* Heart Confetti */}
      {showConfetti && (
        <div style={styles.confettiContainer}>
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="confetti-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                fontSize: `${Math.random() * 16 + 12}px`,
              }}
            >
              {['💖', '💕', '💗', '💓', '❤️'][Math.floor(Math.random() * 5)]}
            </span>
          ))}
        </div>
      )}
      
      {/* Decorative background elements */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />
      
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <span style={styles.heartIcon}>💝</span>
            <h1 style={styles.title}>Sweaty Sweety</h1>
          </div>
          <p style={styles.subtitle}>Your relationship memory vault</p>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Log out
          </button>
        </header>

        {/* Input Section */}
        <section style={styles.inputSection}>
          {/* Tab Switcher - only show if voice is supported */}
          {voiceSupported && (
            <div style={styles.tabContainer}>
              <button
                style={{
                  ...styles.tab,
                  ...(inputMode === 'type' ? styles.tabActive : {})
                }}
                onClick={() => {
                  setInputMode('type');
                  if (isListening && recognitionRef.current) {
                    recognitionRef.current.stop();
                    setIsListening(false);
                  }
                }}
              >
                <span style={styles.tabIcon}>✍️</span>
                Type
              </button>
              <button
                style={{
                  ...styles.tab,
                  ...(inputMode === 'voice' ? styles.tabActive : {})
                }}
                onClick={() => setInputMode('voice')}
              >
                <span style={styles.tabIcon}>🎤</span>
                Voice
              </button>
            </div>
          )}

          {/* Memory Input */}
          <div style={styles.textareaContainer}>
            <textarea
              style={styles.textarea}
              placeholder="Upgrade your 'What time works for you?' texts. Enter a fun memory here to generate nicknames that turn everyday logistics into meaningful inside jokes."
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              disabled={isListening}
            />
            <div style={styles.wordCount}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </div>
          </div>

          {/* Voice Button (when in voice mode) */}
          {voiceSupported && inputMode === 'voice' && (
            <button
              style={{
                ...styles.voiceButton,
                ...(isListening ? styles.voiceButtonActive : {})
              }}
              onClick={toggleVoice}
            >
              <span style={styles.voiceIcon}>{isListening ? '🔴' : '🎙️'}</span>
              {isListening ? 'Listening... (tap to stop)' : 'Tap to Start Speaking'}
              {isListening && <span style={styles.pulseRing} />}
            </button>
          )}

          {/* Style Selector */}
          <div style={styles.styleSection}>
            <p style={styles.styleLabel}>Nickname vibe:</p>
            <div style={styles.styleGrid}>
              {[
                { id: 'sweet', emoji: '🥰', label: 'Sweet' },
                { id: 'teasing', emoji: '😜', label: 'Teasing' },
                { id: 'flirty', emoji: '😘', label: 'Flirty' },
                { id: 'wildcard', emoji: '🎲', label: 'Wildcard' },
              ].map((style) => (
                <button
                  key={style.id}
                  style={{
                    ...styles.styleButton,
                    ...(nicknameStyle === style.id ? styles.styleButtonActive : {})
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setNicknameStyle(style.id);
                    setTimeout(() => e.currentTarget.blur(), 0);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                >
                  <span style={styles.styleEmoji}>{style.emoji}</span>
                  <span style={styles.styleText}>{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Memory Button */}
          <button
            className="save-button"
            style={{
              ...styles.saveButton,
              ...(isLoading ? styles.saveButtonLoading : {}),
              ...((!memory.trim() || isLoading) ? styles.saveButtonDisabled : {})
            }}
            onClick={generateNicknames}
            disabled={!memory.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <span style={styles.loadingSpinner} />
                {LOADING_MESSAGES[loadingMessageIndex]}
              </>
            ) : (
              <>
                <span style={styles.buttonIcon}>✨</span>
                Save Memory
              </>
            )}
          </button>
        </section>

        {/* Generated Nicknames */}
        {generatedNicknames.length > 0 && (
          <section style={styles.nicknamesSection}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.titleIcon}>💫</span>
              Choose Your Nicknames
            </h2>
            <p style={styles.sectionSubtitle}>Tap to select your favorites</p>
            
            <div style={styles.nicknamesGrid}>
              {generatedNicknames.map((nickname, index) => {
                const isSelected = selectedNicknames.has(nickname);
                const isSaved = savedNicknamesSet.has(nickname);
                const isCopied = copiedNickname === nickname;
                
                return (
                  <button
                    key={index}
                    className="nickname-card"
                    style={{
                      ...styles.nicknameCard,
                      ...(isSelected ? styles.nicknameCardSelected : {}),
                      ...(isSaved ? styles.nicknameCardSaved : {}),
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => !isSaved && toggleNicknameSelection(nickname)}
                    disabled={isSaved}
                  >
                    <span style={styles.nicknameHeart}>
                      {isSaved ? '💚' : isSelected ? '💖' : '🤍'}
                    </span>
                    <span style={{
                      ...styles.nicknameText,
                      ...(isSelected ? styles.nicknameTextSelected : {}),
                      ...(isSaved ? styles.nicknameTextSaved : {})
                    }}>
                      {nickname}
                    </span>
                    <span
                      style={{
                        ...styles.copyButton,
                        ...(isCopied ? styles.copyButtonCopied : {})
                      }}
                      onClick={(e) => copyToClipboard(nickname, e)}
                    >
                      {isCopied ? '✓' : '📋'}
                    </span>
                    {isSaved && <span style={styles.savedBadge}>Saved</span>}
                  </button>
                );
              })}
            </div>

            {selectedNicknames.size > 0 && (
              <button
                style={styles.confirmButton}
                onClick={saveSelectedNicknames}
              >
                <span style={styles.buttonIcon}>💝</span>
                Save {selectedNicknames.size} Nickname{selectedNicknames.size > 1 ? 's' : ''} to Vault
              </button>
            )}
          </section>
        )}

        {/* Memory Vault */}
        <section style={styles.vaultSection}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleIcon}>🏛️</span>
            Memory Vault
          </h2>
          
          {/* Search */}
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Memory List */}
          <div style={styles.memoryList}>
            {filteredMemories.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>💭</span>
                <p style={styles.emptyText}>
                  {searchQuery ? 'No memories found' : 'No memories saved yet'}
                </p>
                <p style={styles.emptySubtext}>
                  {searchQuery ? 'Try a different search' : 'Start by sharing a special moment above'}
                </p>
              </div>
            ) : (
              filteredMemories.map((mem, index) => {
                const gradientIndex = index % 3;
                const isExpanded = expandedMemoryId === mem.id;
                const isDeleting = deleteConfirmId === mem.id;
                
                return (
                  <div
                    key={mem.id}
                    className="memory-card"
                    style={{
                      ...styles.memoryCard,
                      ...styles[`memoryCardGradient${gradientIndex}`]
                    }}
                    onClick={() => setExpandedMemoryId(isExpanded ? null : mem.id)}
                  >
                    <div style={styles.memoryHeader}>
                      <div style={styles.memoryTitleRow}>
                        <span style={styles.memoryStar}>⭐</span>
                        <span style={styles.memoryNickname}>{mem.nickname}</span>
                      </div>
                      <div style={styles.memoryMeta}>
                        <span style={styles.memoryDate}>{mem.date}</span>
                        <button
                          style={styles.deleteButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(isDeleting ? null : mem.id);
                          }}
                        >
                          {isDeleting ? '❌' : '🗑️'}
                        </button>
                      </div>
                    </div>
                    
                    {isDeleting && (
                      <div style={styles.deleteConfirm} onClick={(e) => e.stopPropagation()}>
                        <span style={styles.deleteConfirmText}>Delete this memory?</span>
                        <div style={styles.deleteConfirmButtons}>
                          <button
                            style={styles.deleteConfirmYes}
                            onClick={() => deleteMemory(mem.id)}
                          >
                            Yes, delete
                          </button>
                          <button
                            style={styles.deleteConfirmNo}
                            onClick={() => setDeleteConfirmId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <p style={{
                      ...styles.memoryText,
                      ...(isExpanded ? {} : styles.memoryTextTruncated)
                    }}>
                      {mem.memory}
                    </p>
                    
                    {!isExpanded && mem.memory.length > 100 && (
                      <span style={styles.expandHint}>Tap to expand</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>Made with 💖 for lovers everywhere</p>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(244, 114, 182, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(244, 114, 182, 0.6);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        body {
          margin: 0;
          padding: 0;
          background: #0f0d1a;
        }
        
        .animated-bg {
          background: linear-gradient(-45deg, #1a0a2e, #4a1942, #6b1d3a, #3d1a5c, #4a1942, #1a0a2e);
          background-size: 300% 300%;
          animation: gradientFlow 10s ease infinite;
        }
        
        .memory-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        @media (hover: hover) {
          .memory-card:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
          
          .nickname-card:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
          
          .save-button:hover {
            transform: scale(1.02);
          }
        }
        
        button {
          -webkit-tap-highlight-color: transparent;
        }
        
        button:focus {
          outline: none;
        }
        
        button:focus-visible {
          outline: 2px solid rgba(244, 114, 182, 0.5);
          outline-offset: 2px;
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        textarea::placeholder {
          color: rgba(226, 232, 240, 0.5);
          line-height: 1.6;
          opacity: 1;
        }
        
        textarea::-webkit-input-placeholder {
          color: rgba(226, 232, 240, 0.5);
          line-height: 1.6;
        }
        
        textarea::-moz-placeholder {
          color: rgba(226, 232, 240, 0.5);
          line-height: 1.6;
        }
        
        .memory-card:active {
          transform: scale(0.98);
        }
        
        .nickname-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .nickname-card:active {
          transform: scale(0.98);
        }
        
        .save-button {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .save-button:active {
          transform: scale(0.97);
        }
        
        @keyframes confettiFall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .confetti-heart {
          position: absolute;
          top: 0;
          animation: confettiFall 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: "'Quicksand', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1000,
    overflow: 'hidden',
  },
  bgOrb1: {
    position: 'fixed',
    top: '-20%',
    right: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'fixed',
    bottom: '10%',
    left: '-15%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(244, 114, 182, 0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  bgOrb3: {
    position: 'fixed',
    top: '50%',
    right: '20%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(192, 132, 252, 0.1) 0%, transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '480px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    animation: 'fadeInUp 0.6s ease-out',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  heartIcon: {
    fontSize: '36px',
    animation: 'float 3s ease-in-out infinite',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '14px',
    margin: 0,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: '16px',
    padding: '8px 16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    background: 'transparent',
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    zIndex: 10,
    minHeight: '44px',
    minWidth: '80px',
  },
  inputSection: {
    marginBottom: '32px',
    animation: 'fadeInUp 0.6s ease-out 0.1s both',
  },
  textareaContainer: {
    position: 'relative',
    marginBottom: '16px',
  },
  textarea: {
    width: '100%',
    minHeight: '160px',
    padding: '20px',
    paddingBottom: '40px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    color: '#e2e8f0',
    fontSize: '16px',
    fontFamily: "'Quicksand', sans-serif",
    resize: 'vertical',
    outline: 'none',
    transition: 'all 0.3s ease',
    lineHeight: '1.6',
  },
  wordCount: {
    position: 'absolute',
    bottom: '12px',
    right: '16px',
    color: 'rgba(226, 232, 240, 0.4)',
    fontSize: '12px',
    fontWeight: '500',
  },
  styleSection: {
    marginBottom: '16px',
  },
  styleLabel: {
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 0 10px 0',
  },
  styleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  },
  styleButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '12px 8px',
    border: '1px solid transparent',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Quicksand', sans-serif",
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
  styleButtonActive: {
    background: 'rgba(244, 114, 182, 0.15)',
    border: '1px solid rgba(244, 114, 182, 0.4)',
    boxShadow: '0 0 20px rgba(244, 114, 182, 0.2)',
  },
  styleEmoji: {
    fontSize: '20px',
  },
  styleText: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'rgba(226, 232, 240, 0.7)',
  },
  tabContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  tab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 20px',
    border: 'none',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    minHeight: '48px',
  },
  tabActive: {
    background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
    color: '#f472b6',
    boxShadow: '0 0 20px rgba(244, 114, 182, 0.2)',
  },
  tabIcon: {
    fontSize: '18px',
  },
  voiceButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 24px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '24px',
    background: 'rgba(168, 85, 247, 0.1)',
    color: '#c084fc',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '16px',
    position: 'relative',
    minHeight: '52px',
  },
  voiceButtonActive: {
    background: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.5)',
    color: '#f87171',
    animation: 'glow 1.5s ease-in-out infinite',
  },
  voiceIcon: {
    fontSize: '20px',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    border: '2px solid rgba(239, 68, 68, 0.5)',
    animation: 'pulse 1.5s ease-out infinite',
    pointerEvents: 'none',
  },
  saveButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '18px 24px',
    border: 'none',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #8b5cf6 100%)',
    color: '#ffffff',
    fontSize: '17px',
    fontWeight: '700',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
    minHeight: '56px',
  },
  saveButtonLoading: {
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
    boxShadow: 'none',
  },
  saveButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  buttonIcon: {
    fontSize: '18px',
  },
  nicknamesSection: {
    marginBottom: '32px',
    animation: 'fadeInUp 0.6s ease-out',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px',
    fontWeight: '600',
    color: '#e2e8f0',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  titleIcon: {
    fontSize: '24px',
  },
  sectionSubtitle: {
    color: 'rgba(226, 232, 240, 0.5)',
    fontSize: '14px',
    margin: '0 0 20px 0',
  },
  nicknamesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  nicknameCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '18px 20px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Quicksand', sans-serif",
    animation: 'fadeInUp 0.5s ease-out both',
    minHeight: '60px',
  },
  nicknameCardSelected: {
    background: 'rgba(244, 114, 182, 0.15)',
    borderColor: 'rgba(244, 114, 182, 0.4)',
    boxShadow: '0 8px 32px rgba(244, 114, 182, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  },
  nicknameCardSaved: {
    background: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    cursor: 'default',
    opacity: 0.8,
  },
  nicknameHeart: {
    fontSize: '24px',
    transition: 'transform 0.3s ease',
  },
  nicknameText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#e8b4d8',
    flex: 1,
  },
  nicknameTextSelected: {
    color: '#f9a8d4',
    textShadow: '0 0 20px rgba(244, 114, 182, 0.5)',
  },
  nicknameTextSaved: {
    color: '#34d399',
  },
  savedBadge: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#10b981',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  copyButton: {
    padding: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'all 0.2s ease',
    borderRadius: '8px',
    minWidth: '36px',
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonCopied: {
    opacity: 1,
    color: '#10b981',
    background: 'rgba(16, 185, 129, 0.2)',
  },
  confirmButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 24px',
    border: 'none',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
    minHeight: '52px',
  },
  vaultSection: {
    animation: 'fadeInUp 0.6s ease-out 0.2s both',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '20px',
  },
  searchIcon: {
    position: 'absolute',
    left: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '16px 20px 16px 50px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    color: '#e2e8f0',
    fontSize: '15px',
    fontFamily: "'Quicksand', sans-serif",
    outline: 'none',
    transition: 'all 0.3s ease',
    minHeight: '52px',
  },
  memoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px 24px',
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px',
    opacity: 0.5,
  },
  emptyText: {
    color: 'rgba(226, 232, 240, 0.6)',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 8px 0',
  },
  emptySubtext: {
    color: 'rgba(226, 232, 240, 0.4)',
    fontSize: '14px',
    margin: 0,
  },
  memoryCard: {
    padding: '20px',
    borderRadius: '24px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  memoryCardGradient0: {
    background: 'rgba(244, 114, 182, 0.08)',
  },
  memoryCardGradient1: {
    background: 'rgba(168, 85, 247, 0.08)',
  },
  memoryCardGradient2: {
    background: 'rgba(139, 92, 246, 0.08)',
  },
  memoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  memoryTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  memoryStar: {
    fontSize: '20px',
    color: '#fbbf24',
  },
  memoryNickname: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '20px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 50%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  memoryMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  memoryDate: {
    color: 'rgba(226, 232, 240, 0.4)',
    fontSize: '12px',
    fontWeight: '500',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px',
    margin: '-8px',
    opacity: 0.5,
    transition: 'opacity 0.3s ease',
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteConfirm: {
    background: 'rgba(239, 68, 68, 0.15)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '12px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  deleteConfirmText: {
    color: '#f87171',
    fontSize: '14px',
    fontWeight: '600',
    display: 'block',
    marginBottom: '12px',
    textAlign: 'center',
  },
  deleteConfirmButtons: {
    display: 'flex',
    gap: '10px',
  },
  deleteConfirmYes: {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    background: '#ef4444',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    minHeight: '44px',
  },
  deleteConfirmNo: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    background: 'transparent',
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: "'Quicksand', sans-serif",
    cursor: 'pointer',
    minHeight: '44px',
  },
  memoryText: {
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
  },
  memoryTextTruncated: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  expandHint: {
    display: 'block',
    marginTop: '8px',
    color: 'rgba(244, 114, 182, 0.6)',
    fontSize: '12px',
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    padding: '32px 0 16px 0',
  },
  footerText: {
    color: 'rgba(226, 232, 240, 0.3)',
    fontSize: '13px',
    margin: 0,
  },
};
