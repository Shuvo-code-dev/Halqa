export type ApiEntry = {
  id: string;
  category: string;
  name: string;
  description: string;
  auth: 'No Key' | 'API Key' | 'OAuth';
  https: 'Yes' | 'No';
  cors: 'Yes' | 'No' | 'Unknown';
  endpoint: string;
  schema?: string;
};

export const API_REGISTRY: ApiEntry[] = [
  // --- ANIMALS --- //
  { id: 'dog-ceo', category: 'Animals', name: 'Dog CEO', description: 'Access images, breeds, and sub-breeds of dogs from around the world.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://dog.ceo/api/breeds/image/random' },
  { id: 'cat-fact', category: 'Animals', name: 'Cat Facts', description: 'Daily random cat facts for feline enthusiasts.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://catfact.ninja/fact' },
  { id: 'pokeapi', category: 'Animals', name: 'PokéAPI', description: 'Complete database of Pokémon data, moves, and abilities.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://pokeapi.co/api/v2/pokemon/1' },
  { id: 'shibe', category: 'Animals', name: 'Shibe.online', description: 'High-quality Shibe Inu, Cat, and Bird images.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://shibe.online/api/shibes' },

  // --- ANIME --- //
  { id: 'jikan', category: 'Anime', name: 'Jikan API', description: 'Unofficial MyAnimeList API for anime and manga data.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.jikan.moe/v4/anime/1' },
  { id: 'animechan', category: 'Anime', name: 'AnimeChan', description: 'Get random anime quotes with character names.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://animechan.xyz/api/random' },

  // --- CRYPTO --- //
  { id: 'coingecko', category: 'Cryptocurrency', name: 'CoinGecko', description: 'Market data for 10,000+ cryptocurrencies.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.coingecko.com/api/v3/ping' },
  { id: 'coinbase', category: 'Cryptocurrency', name: 'Coinbase API', description: 'Real-time price information for Bitcoin, Ethereum, and more.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.coinbase.com/v2/prices/BTC-USD/spot' },
  { id: 'blockchain-info', category: 'Cryptocurrency', name: 'Blockchain.info', description: 'Bitcoin block and transaction data statistics.', auth: 'No Key', https: 'Yes', cors: 'Unknown', endpoint: 'https://blockchain.info/ticker' },

  // --- FINANCE --- //
  { id: 'frankfurter', category: 'Finance', name: 'Frankfurter', description: 'Fiat currency exchange rates from the ECB.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.frankfurter.app/latest' },
  { id: 'exchangerate', category: 'Finance', name: 'ExchangeRate-API', description: 'Reliable currency conversion for 160+ currencies.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://v6.exchangerate-api.com/v6/latest/USD' },

  // --- ART & DESIGN --- //
  { id: 'unsplash', category: 'Art & Design', name: 'Unsplash API', description: 'The largest library of free, high-resolution photos.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.unsplash.com/photos/random' },
  { id: 'artic', category: 'Art & Design', name: 'Art Institute of Chicago', description: 'Explore thousands of artworks from the AIC collection.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.artic.edu/api/v1/artworks' },
  { id: 'metmuseum', category: 'Art & Design', name: 'The Met API', description: 'Access to data on over 470,000 objects in The Met collection.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://collectionapi.metmuseum.org/public/collection/v1/objects' },

  // --- BOOKS --- //
  { id: 'google-books', category: 'Books', name: 'Google Books', description: 'Search and browse a library of millions of books.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://www.googleapis.com/books/v1/volumes?q=search+terms' },
  { id: 'open-library', category: 'Books', name: 'Open Library', description: 'An open, editable library catalog with book data.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json' },

  // --- NEWS --- //
  { id: 'newsapi', category: 'News', name: 'NewsAPI', description: 'Get breaking news headlines and search for articles.', auth: 'API Key', https: 'Yes', cors: 'No', endpoint: 'https://newsapi.org/v2/top-headlines?country=us' },
  { id: 'nyt', category: 'News', name: 'New York Times', description: 'Retrieve articles, book reviews, and top stories.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.nytimes.com/svc/topstories/v2/home.json' },

  // --- WEATHER --- //
  { id: 'openweathermap', category: 'Weather', name: 'OpenWeatherMap', description: 'Current and forecast weather data for any location.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.openweathermap.org/data/2.5/weather?q=London' },
  { id: 'weatherapi', category: 'Weather', name: 'WeatherAPI', description: 'Real-time, forecast, and historical weather data.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.weatherapi.com/v1/current.json?q=London' },

  // --- MACHINE LEARNING --- //
  { id: 'huggingface', category: 'Machine Learning', name: 'Hugging Face', description: 'Access 100k+ ML models via serverless inference.', auth: 'API Key', https: 'Yes', cors: 'Unknown', endpoint: 'https://api-inference.huggingface.co/models/' },
  { id: 'openai', category: 'Machine Learning', name: 'OpenAI API', description: 'GPT-4 and GPT-3.5 models for NLP and coding.', auth: 'API Key', https: 'Yes', cors: 'No', endpoint: 'https://api.openai.com/v1/chat/completions' },

  // --- TEST DATA --- //
  { id: 'jsonplaceholder', category: 'Test Data', name: 'JSONPlaceholder', description: 'Fake Online REST API for Testing and Prototyping.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://jsonplaceholder.typicode.com/posts' },
  { id: 'reqres', category: 'Test Data', name: 'ReqRes', description: 'A hosted REST-API ready to respond to your AJAX requests.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://reqres.in/api/users' },
  { id: 'fakerestapi', category: 'Test Data', name: 'FakeRESTApi', description: 'Test API with Swagger UI documentation.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://fakerestapi.azurewebsites.net/api/v1/Activities' },

  // --- HEALTH --- //
  { id: 'nutritionix', category: 'Health', name: 'Nutritionix', description: 'Largest verified nutrition database for health apps.', auth: 'API Key', https: 'Yes', cors: 'Unknown', endpoint: 'https://trackapi.nutritionix.com/v2/search/instant' },

  // --- JOBS --- //
  { id: 'adzuna', category: 'Jobs', name: 'Adzuna API', description: 'Search thousands of jobs and property data.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.adzuna.com/v1/api/jobs/gb/search/1' },

  // --- GAMES --- //
  { id: 'free-to-play', category: 'Games', name: 'Free-To-Play Games', description: 'Access a database of over 500+ free-to-play games and news.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://www.freetogame.com/api/games' },
  { id: 'giant-bomb', category: 'Games', name: 'Giant Bomb API', description: 'The ultimate video game wiki database API.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://www.giantbomb.com/api/games/' },

  // --- FOOD & DRINK --- //
  { id: 'spoonacular', category: 'Food & Drink', name: 'Spoonacular', description: 'Recipe search, meal planning, and nutrition data.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://api.spoonacular.com/recipes/complexSearch' },
  { id: 'cocktaildb', category: 'Food & Drink', name: 'TheCocktailDB', description: 'Crowd-sourced database of drinks and cocktails.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://www.thecocktaildb.com/api/json/v1/1/random.php' },

  // --- MUSIC --- //
  { id: 'spotify', category: 'Music', name: 'Spotify Web API', description: 'Access Spotify data about artists, albums, and tracks.', auth: 'OAuth', https: 'Yes', cors: 'Yes', endpoint: 'https://api.spotify.com/v1/search' },
  { id: 'lastfm', category: 'Music', name: 'Last.fm API', description: 'Music metadata and listener statistics for any artist.', auth: 'API Key', https: 'Yes', cors: 'Yes', endpoint: 'https://ws.audioscrobbler.com/2.0/' },

  // --- GEOCODING --- //
  { id: 'nominatim', category: 'Geocoding', name: 'Nominatim', description: 'OpenStreetMap geocoding service.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://nominatim.openstreetmap.org/search?q=London&format=json' },
  { id: 'ipapi', category: 'Geocoding', name: 'ipapi', description: 'IP Address Location API for any IP address.', auth: 'No Key', https: 'Yes', cors: 'Yes', endpoint: 'https://ipapi.co/json/' },
];

export const API_CATEGORIES = [
  'All',
  'AI',
  'Animals',
  'Anime',
  'Art & Design',
  'Blockchain',
  'Books',
  'Business',
  'Cryptocurrency',
  'Finance',
  'Food & Drink',
  'Games',
  'Geocoding',
  'Government',
  'Health',
  'Jobs',
  'Machine Learning',
  'Music',
  'News',
  'Security',
  'Shopping',
  'Social',
  'Sports',
  'Test Data',
  'Weather'
];
