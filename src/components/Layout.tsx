import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, CreditCard, LogOut, Settings, BookOpen, Menu, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} /> , label: 'Dashboard' },
    { path: '/subscriptions', icon: <CreditCard size={20} /> , label: 'Subscriptions' },
    { path: '/vault', icon: <Shield size={20} /> , label: 'Orbit Vault' },
    { path: '/breakdown', icon: <BookOpen size={20} /> , label: 'Architecture' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="flex-between mb-4" style={{ padding: '0 8px' }}>
          <div className="flex-center" style={{ justifyContent: 'flex-start' }}>
            <Shield size={28} className="text-gold" style={{ marginRight: '12px' }} />
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Orbit</h2>
          </div>
          <button className="mobile-menu-btn md-hidden" onClick={() => setIsOpen(false)}>
            <X size={24} className="text-secondary" />
          </button>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item" style={{ cursor: 'pointer' }}>
            <Settings size={20} />
            Settings
          </div>
          <div className="nav-item mt-1" style={{ cursor: 'pointer', color: 'var(--danger)' }}>
            <LogOut size={20} />
            Sign Out
          </div>
        </div>
      </div>
    </>
  );
};

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container animate-fade-in">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="main-content">
        <header className="header">
          <div className="flex-center" style={{ gap: '16px' }}>
            <button className="mobile-menu-btn md-hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} className="text-primary" />
            </button>
            {/* Contextual header title could go here */}
          </div>
          <div className="flex-center" style={{ gap: '16px' }}>
            <span className="text-secondary sm-hidden" style={{ fontSize: '0.9rem' }}>drew@dte.solutions</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-gold)', color: 'var(--primary)', fontWeight: 'bold' }}>
              D
            </div>
          </div>
        </header>
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
