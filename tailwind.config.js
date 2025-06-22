/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cores principais do projeto
        primary: {
          50: '#f0f9f4', // verde muito claro
          100: '#dcf3e1', // verde claro
          200: '#bce6c6', // verde claro médio
          300: '#8dd4a0', // verde médio
          400: '#5bb574', // verde médio escuro
          500: '#009739', // verde da bandeira (principal)
          600: '#007a2f', // verde escuro
          700: '#006225', // verde mais escuro
          800: '#004f1e', // verde muito escuro
          900: '#003d17', // verde quase preto
        },
        // Cores secundárias (branco e cinza)
        secondary: {
          50: '#ffffff', // branco puro
          100: '#f9f9f9', // branco quase puro
          200: '#f4f4f4', // cinza muito claro
          300: '#e5e5e5', // cinza claro
          400: '#d1d1d1', // cinza médio claro
          500: '#a3a3a3', // cinza médio
          600: '#737373', // cinza escuro
          700: '#525252', // cinza mais escuro
          800: '#404040', // cinza muito escuro
          900: '#262626', // quase preto
        },
        // Atalhos para as cores principais
        'verde-brasil': '#009739',
        branco: '#ffffff',
      },
    },
  },
  plugins: [],
}
