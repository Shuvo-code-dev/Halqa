"use client";

import { useState } from 'react';
import styles from './page.module.css';

// === API DATA MODEL === //

type ApiItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  auth: 'No Key' | 'API Key' | 'OAuth';
  https: 'Yes' | 'No';
  cors: 'Yes' | 'No' | 'Unknown';
  endpoint: string;
  schema: string;
};

const API_DATABASE: ApiItem[] = [
  // --- AI --- //
  {
    id: 'groq', category: 'AI', name: 'Groq API',
    description: 'Lightning-fast LPU inference engine for open-source LLMs like Llama 3.',
    auth: 'API Key', https: 'Yes', cors: 'Unknown',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    schema: JSON.stringify({
      id: "chatcmpl-123",
      object: "chat.completion",
      created: 1677652288,
      model: "llama3-8b-8192",
      choices: [{
        index: 0,
        message: { role: "assistant", content: "Hello!" },
        finish_reason: "stop"
      }]
    }, null, 2)
  },
  {
    id: 'gemini', category: 'AI', name: 'Google Gemini API',
    description: 'Build robust multi-modal generative AI applications utilizing Google DeepMind architecture.',
    auth: 'API Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    schema: JSON.stringify({
      candidates: [{
        content: { parts: [{ text: "I am a large language model..." }], role: "model" },
        finishReason: "STOP",
        index: 0
      }]
    }, null, 2)
  },
  {
    id: 'huggingface', category: 'AI', name: 'Hugging Face Inference',
    description: 'Access over 100,000 machine learning models via free serverless endpoints.',
    auth: 'API Key', https: 'Yes', cors: 'Unknown',
    endpoint: 'https://api-inference.huggingface.co/models/',
    schema: JSON.stringify([{ generated_text: "A beautiful sunset over the mountains, 4k resolution" }], null, 2)
  },

  // --- TESTING --- //
  {
    id: 'jsonplaceholder', category: 'Testing', name: 'JSONPlaceholder',
    description: 'Free fake REST API for testing and prototyping fetching logic.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    schema: JSON.stringify([{
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: { street: "Kulas Light", city: "Gwenborough", zipcode: "92998-3874" }
    }], null, 2)
  },
  {
    id: 'reqres', category: 'Testing', name: 'ReqRes',
    description: 'A hosted REST-API ready to respond to your AJAX requests with real fake data.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://reqres.in/api/users?page=2',
    schema: JSON.stringify({
      page: 2, per_page: 6, total: 12, total_pages: 2,
      data: [{ id: 7, email: "michael.lawson@reqres.in", first_name: "Michael", last_name: "Lawson", avatar: "https://reqres.in/img/faces/7-image.jpg" }]
    }, null, 2)
  },
  {
    id: 'dummyjson', category: 'Testing', name: 'DummyJSON',
    description: 'Get dummy JSON data for your frontend. Products, carts, users, posts, and more.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://dummyjson.com/products/1',
    schema: JSON.stringify({
      id: 1, title: "iPhone 9", description: "An apple mobile which is nothing like apple",
      price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: "Apple"
    }, null, 2)
  },

  // --- FINANCE --- //
  {
    id: 'coingecko', category: 'Finance', name: 'CoinGecko API',
    description: 'The world\'s most comprehensive cryptocurrency API with exact market pricing.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    schema: JSON.stringify({ bitcoin: { usd: 64210.55 } }, null, 2)
  },
  {
    id: 'exchangerate', category: 'Finance', name: 'ExchangeRate-API',
    description: 'Free, reliable fiat currency exchange rates API for global commerce.',
    auth: 'API Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD',
    schema: JSON.stringify({
      result: "success", base_code: "USD",
      conversion_rates: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.40 }
    }, null, 2)
  },
  {
    id: 'frankfurter', category: 'Finance', name: 'Frankfurter API',
    description: 'Open-source historical and current flat currency conversion via the European Central Bank.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.frankfurter.app/latest?from=USD&to=EUR,GBP',
    schema: JSON.stringify({ amount: 1.0, base: "USD", date: "2026-04-16", rates: { EUR: 0.92, GBP: 0.79 } }, null, 2)
  },

  // --- MULTIMEDIA --- //
  {
    id: 'unsplash', category: 'Multimedia', name: 'Unsplash API',
    description: 'The most powerful photo engine in the world. Access millions of royalty-free images.',
    auth: 'API Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.unsplash.com/photos/random',
    schema: JSON.stringify({
      id: "Dwu85P9SOIk", created_at: "2016-05-03T11:00:28-04:00",
      width: 2448, height: 3264,
      urls: { raw: "...", full: "...", regular: "...", small: "..." },
      user: { name: "John Doe", portfolio_url: "..." }
    }, null, 2)
  },
  {
    id: 'pokeapi', category: 'Multimedia', name: 'PokeAPI',
    description: 'All the Pokémon data you\'ll ever need in one place.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://pokeapi.co/api/v2/pokemon/ditto',
    schema: JSON.stringify({
      id: 132, name: "ditto", base_experience: 101, height: 3, weight: 40,
      abilities: [{ ability: { name: "limber", url: "..." }, is_hidden: false, slot: 1 }]
    }, null, 2)
  },
  {
    id: 'catapi', category: 'Multimedia', name: 'The Cat API',
    description: 'Cats as a Service. Millions of cat images natively accessible.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.thecatapi.com/v1/images/search',
    schema: JSON.stringify([{ id: "ebv", url: "https://cdn2.thecatapi.com/images/ebv.jpg", width: 176, height: 540 }], null, 2)
  },

  // --- TOOLS --- //
  {
    id: 'openweathermap', category: 'Tools', name: 'OpenWeatherMap',
    description: 'Simple and fast historical, current, and forecast weather analytics.',
    auth: 'API Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY',
    schema: JSON.stringify({
      coord: { lon: -0.1257, lat: 51.5085 },
      weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }],
      main: { temp: 289.15, feels_like: 288.9, humidity: 82 }, name: "London"
    }, null, 2)
  },
  {
    id: 'freedictionary', category: 'Tools', name: 'Free Dictionary API',
    description: 'Phonetics, definitions, parts of speech, and grammar origins instantly.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.dictionaryapi.dev/api/v2/entries/en/hello',
    schema: JSON.stringify([{
      word: "hello",
      phonetics: [{ text: "/həˈləʊ/", audio: "..." }],
      meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "An utterance of 'hello'; a greeting.", synonyms: ["greeting", "welcome"] }] }]
    }], null, 2)
  },
  {
    id: 'ipify', category: 'Tools', name: 'IPify',
    description: 'A simple public IP address API. Extremely reliable and infinitely scalable.',
    auth: 'No Key', https: 'Yes', cors: 'Yes',
    endpoint: 'https://api.ipify.org?format=json',
    schema: JSON.stringify({ ip: "98.206.134.11" }, null, 2)
  }
];

// === JSON HIGHLIGHT ENGINE === //
const highlightJSON = (json: string) => {
  if (!json) return { __html: '' };
  const str = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const highlighted = str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = styles.jsonNumber;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = styles.jsonKey;
      } else {
        cls = styles.jsonString;
      }
    } else if (/true|false/.test(match)) {
      cls = styles.jsonBoolean;
    } else if (/null/.test(match)) {
      cls = styles.jsonNull;
    }
    return `<span class="${cls}">${match}</span>`;
  });
  return { __html: highlighted };
};

export default function ApiLab() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openSchemas, setOpenSchemas] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const categories = ['All', 'AI', 'Testing', 'Finance', 'Multimedia', 'Tools'];
  
  const filteredAPIs = activeCategory === 'All' 
    ? API_DATABASE 
    : API_DATABASE.filter(a => a.category === activeCategory);

  const toggleSchema = (id: string) => setOpenSchemas(prev => ({ ...prev, [id]: !prev[id] }));

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch(err) {}
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={styles.filterBtn + ' ' + (activeCategory === cat ? styles.active : '')}
          >
            {cat}
          </button>
        ))}
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>API <span className="text-gradient">Lab</span></h1>
          <p className={styles.subtitle}>
            A curated directory of elite public APIs for developers. Grab endpoints instantly and visualize payload schemas without breaking your flow.
          </p>
        </header>

        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{activeCategory === 'All' ? 'All Public Endpoints' : activeCategory}</h2>
          <div className={styles.grid}>
            {filteredAPIs.map((api) => {
               const isOpen = openSchemas[api.id] || false;

               return (
                <div key={api.id} className={styles.card + ' glass-panel'}>
                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{api.name}</h3>
                    </div>
                    
                    <div className={styles.badgeRow}>
                      <span className={styles.badge + ' ' + (api.auth === 'No Key' ? styles.badgeHttpsYes : styles.badgeAuth)}>
                        {api.auth}
                      </span>
                      <span className={styles.badge + ' ' + (api.https === 'Yes' ? styles.badgeHttpsYes : styles.badgeHttpsNo)}>
                        HTTPS: {api.https}
                      </span>
                      <span className={styles.badge + ' ' + (api.cors === 'Yes' ? styles.badgeCorsYes : api.cors === 'No' ? styles.badgeCorsNo : styles.badgeCorsUnknown)}>
                        CORS: {api.cors}
                      </span>
                    </div>

                    <p className={styles.cardDesc}>{api.description}</p>
                    
                    <div className={styles.actions}>
                      <button onClick={() => copyToClipboard(api.endpoint)} className={styles.actionBtn}>
                         Copy Endpoint
                      </button>
                      <button onClick={() => toggleSchema(api.id)} className={styles.actionBtn + ' ' + (isOpen ? styles.actionBtnPrimary : '')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        {isOpen ? 'Hide Schema' : 'View Schema'}
                      </button>
                    </div>
                  </div>

                  <div className={styles.viewContainer + ' ' + (isOpen ? styles.open : '')}>
                    <div className={styles.pane}>
                      <div className={styles.schemaHeader}>
                        <span className={styles.schemaTitle}>Response Mock</span>
                        <button onClick={() => copyToClipboard(api.schema)} className={styles.actionBtn} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', flex: 'none' }}>
                          Copy JSON
                        </button>
                      </div>
                      <pre className={styles.pre} dangerouslySetInnerHTML={highlightJSON(api.schema)} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className={styles.toast + ' ' + (showToast ? styles.show : '')}>
          Copied to clipboard! 🚀
        </div>
      </main>
    </div>
  );
}
