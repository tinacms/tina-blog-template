import React from 'react'
import '../styles/globals.css'
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src:
    [
      {
        path: '../public/font/charter/charter_regular-webfont.woff',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../public/font/charter/charter_italic-webfont.woff',
        weight: '400',
        style: 'italic',
      },
      {
        path: '../public/font/charter/charter_bold-webfont.woff',
        weight: '700',
        style: 'bold',
      },

    ]
})


const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
