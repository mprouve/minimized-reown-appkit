/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_PUBLIC_URL: string;

  // BASE URLS
  readonly VITE_BASE_URL: string;

  // APPKIT MODAL
  readonly VITE_APPKIT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
