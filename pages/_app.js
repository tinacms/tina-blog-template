import React from 'react'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
