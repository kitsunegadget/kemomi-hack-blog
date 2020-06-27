import '../style/global.scss'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export function reportWebVitals(metric) {
    console.log(metric)
}