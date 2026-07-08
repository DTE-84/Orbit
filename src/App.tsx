import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Vault from './pages/Vault';
import Breakdown from './pages/Breakdown';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router basename="/Orbit">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ProtectedRoute allowedTiers={['bundle', 'orbit_only', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="subscriptions" element={
              <ProtectedRoute allowedTiers={['bundle', 'orbit_only', 'admin']}>
                <Subscriptions />
              </ProtectedRoute>
            } />
            <Route path="vault" element={
              <ProtectedRoute allowedTiers={['bundle', 'orbit_only', 'admin']}>
                <Vault />
              </ProtectedRoute>
            } />
            <Route path="breakdown" element={<Breakdown />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
