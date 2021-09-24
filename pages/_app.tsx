import * as React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface IProps extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: IProps) {
  return (<CacheProvider value={emotionCache}>
    <Head>
      <title>{pageProps.title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>)

}
export default MyApp
