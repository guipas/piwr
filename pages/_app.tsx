import { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';


export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
