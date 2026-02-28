import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TextInput from '../components/TextInput';
import CognitivePanel from '../components/CognitivePanel';
import SimplifiedText from '../components/SimplifiedText';
import DyslexiaToggle from '../components/DyslexiaToggle';
import AudioPlayer from '../components/AudioPlayer';
import { postSimplify } from '../services/api';
import type { SimplifyResponse, UserProfile } from '../types/apiTypes';

interface SimplifierProps {
  userId: string;
  onUserIdChange: (id: string) => void;
}

const Simplifier: React.FC<SimplifierProps> = ({ userId, onUserIdChange }) => {
  const [profile, setProfile] = useState<UserProfile>('default');
  const [text, setText] = useState<string>('');
  const [dyslexiaEnabled, setDyslexiaEnabled] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimplifyResponse | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text to simplify.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const data = await postSimplify({
        text,
        profile,
        user_id: userId,
      });
      setResult(data);
    } catch (e) {
      setError('Unable to fetch simplified content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="simplifier-header">
        <motion.h1
          className="simplifier-title"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          AI‑Accessibility Assistant
        </motion.h1>
        <motion.p
          className="simplifier-subtitle"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Helping Neurodiverse Students Read With Ease
        </motion.p>
      </header>

      <section className="card app-section app-section-centered">
        <TextInput
          text={text}
          onTextChange={setText}
          profile={profile}
          onProfileChange={setProfile}
          dyslexiaEnabled={dyslexiaEnabled}
          onDyslexiaToggle={setDyslexiaEnabled}
          audioEnabled={audioEnabled}
          onAudioToggle={setAudioEnabled}
          userId={userId}
          onUserIdChange={onUserIdChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {error && <p className="app-error">{error}</p>}
      </section>

      <section className="app-grid">
        <div className="card">
          <CognitivePanel result={result} />
        </div>

        <div className="app-right">
          <div className="card app-reading-card">
            <div className="app-reading-header">
              <h2 className="app-reading-title">Adapted Reading View</h2>
              <DyslexiaToggle enabled={dyslexiaEnabled} onToggle={setDyslexiaEnabled} />
            </div>

            <div className="app-reading-body">
              <SimplifiedText
                simplifiedText={result?.simplified_text ?? ''}
                chunkedVersion={result?.chunked_version ?? ''}
                isolationMode={result?.isolation_mode ?? false}
                dyslexiaEnabled={dyslexiaEnabled}
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {result && result.audio_file && audioEnabled && (
              <motion.div
                className="card app-audio-card"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <AudioPlayer src={result.audio_file} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Simplifier;
