import React from 'react'
import '../styles/globals.css'
import localFont from 'next/font/local'
import Head from 'next/head'
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter&family=Noto+Serif+JP:wght@700;900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
