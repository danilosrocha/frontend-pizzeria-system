import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={2500} />
    </AuthProvider>
  )
}

export default App;
