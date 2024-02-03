import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Responsável por importar o arquivo de estilos globais, para que não seja necessário importar em cada componente.
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/styles/style.scss';`,
      },
    },
  },
});
