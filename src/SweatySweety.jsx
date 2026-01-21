// SweatySweety.jsx - Refactored Version
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SweatySweety() {
  const [memory, setMemory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedMemories, setSavedMemories] = useState([]);

  useEffect(() => {
    fetchMemories();
  }, []);

  async function fetchMemories() {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSavedMemories(data);
  }

  const handleGenerateAndSave = async (finalMemory) => {
    if (!finalMemory || isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: "Generate 5 playful nicknames for this memory: " + finalMemory
          }]
        })
      });

      const data = await response.json();
      const nicknames = data.content[0].text.split(',').map(n => n.trim());

      await supabase.from('memories').insert([{ 
        memory_text: finalMemory, 
        nicknames: nicknames 
      }]);

      fetchMemories();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea value={memory} onChange={(e) => setMemory(e.target.value)} />
      <button onClick={() => handleGenerateAndSave(memory)} disabled={isLoading}>
        Generate & Save
      </button>
      {savedMemories.map(m => (
        <div key={m.id}>{m.memory_text}: {m.nicknames.join(', ')}</div>
      ))}
    </div>
  );
}