import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import AppRoutes from './routes/AppRoutes/AppRoutes';
import './App.css';

function App () {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className="App">
          <Header />
          <main className="container mt-5 pt-4">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
