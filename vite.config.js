import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env variables based on mode (development / production)
  const env = loadEnv(mode, process.cwd(), "");

  const LOCAL_HOST_BASE_URL = env.VITE_LOCAL_HOST_BASE_URL;

  console.log("Proxy target:", LOCAL_HOST_BASE_URL);

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: LOCAL_HOST_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
