/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  // add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}