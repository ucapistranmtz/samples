declare namespace NodeJS {
  interface ProcessEnv {
    ENV: 'development' | 'production' | 'test' | 'local';
    PORT: string;
    API_PORT: string;
    MONGODB_CONNECTION: string;
    TZ: 'America/Chicago';
  }
}
