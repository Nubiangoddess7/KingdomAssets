import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { FranchiseUserAccessPanel } from './components/FranchiseUserAccessPanel';

// ----------- ENV VAR LOADING -----------
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ----------- SUPABASE INIT -----------
let supabase = null;
try {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️ Missing Supabase environment variables. Supabase not initialized.');
  } else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized.');
  }
} catch (err) {
  console.error('❌ Supabase initialization error:', err);
}

// ----------- APP COMPONENT -----------
export default function App() {
  return (
    <div style={{ padding: 40, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: 'black', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        🚀 Kingdom Assets is Running!
      </h1>

      <p style={{ color: '#333', marginBottom: '20px' }}>
        Below are your main platform modules, displayed for testing.
      </p>

      {!SUPABASE_URL || !SUPABASE_ANON_KEY ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ⚠️ Warning: Missing Supabase credentials. <br />
          Please set them in your `.env` file and restart the server.
        </p>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          ✅ Supabase connected and ready.
        </p>
      )}

      {/* ✅ FranchiseUserAccessPanel module */}
      <section style={{ border: '1px solid #ccc', padding: '15px', marginTop: '30px', background: '#fff' }}>
        <FranchiseUserAccessPanel supabase={supabase} />
      </section>
    </div>
  );
}
