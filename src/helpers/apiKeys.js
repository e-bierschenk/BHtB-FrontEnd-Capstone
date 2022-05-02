export const imdbApi = {
    key: "k_6bs09q45",
    url: "https://imdb-api.com/API"
}

export const baconApi = {
    url: "http://localhost:8088"
}

export const netlifyConfig = {
    imdbApiKey: process.env.REACT_APP_IMDB_API_KEY,
    imdbUrl: process.env.REACT_APP_AUTH_DOMAIN,
    baconUrl: REACT_APP_BACON_URL,
    
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};