import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DonationLog from './pages/DonationLog';
import FoodForecast from './pages/FoodForecast';
import Profile from './pages/Profile';
import Prediction from './pages/Prediction';
import { User, UserRole } from './types';
import ConsumptionPrediction from './pages/consumption';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Green Valley Restaurant',
    email: 'contact@greenvalley.com',
    role: 'supplier' as UserRole,
    organization: 'Green Valley Restaurant',
    verified: true,
    joinedAt: new Date('2023-01-15')
  });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      <Router>
        <div className={`min-h-screen transition-colors duration-300 ${
          theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'
        }`}>
          <Navbar />
          <main className="relative">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/donations" element={<DonationLog />} />
              <Route path="/forecast" element={<FoodForecast />} />
              <Route path="/profile" element={<Profile />} />
               <Route path="/prediction" element={<Prediction />} />
                <Route path="/consumption" element={<ConsumptionPrediction />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;