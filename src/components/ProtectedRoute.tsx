import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTiers: string[];
}

export default function ProtectedRoute({ children, allowedTiers }: ProtectedRouteProps) {
  const { tier, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-spin mb-4" style={{ margin: '0 auto', width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--border-subtle)', borderTopColor: 'var(--primary)' }} />
          <p className="text-secondary">Authenticating Nexus Credentials...</p>
        </div>
      </div>
    );
  }

  // If tier is null or not in allowed list, show paywall
  if (!tier || !allowedTiers.includes(tier)) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh', width: '100%', padding: '24px' }}>
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '48px 32px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-strong)' }}>
          
          {/* Shatter-Gate Glow */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, var(--danger-transparent) 0%, transparent 70%)', opacity: 0.8, filter: 'blur(20px)', pointerEvents: 'none' }} />
          
          <div style={{ width: '80px', height: '80px', borderRadius: '24px', backgroundColor: 'rgba(255, 69, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid rgba(255, 69, 58, 0.2)' }}>
            <Lock size={40} style={{ color: 'var(--danger)' }} />
          </div>
          
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Orbit Add-on Required</h2>
          <p className="text-secondary" style={{ marginBottom: '32px', lineHeight: '1.6' }}>
            Your current access tier is restricted. Upgrade to the <strong>DTE Nexus Bundle</strong> to unlock the Zero-Knowledge Vault and comprehensive Subscription Analytics.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              <Zap size={18} /> Upgrade to Bundle
            </button>
            <Link to="/" style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}>
              Return to Pulse Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
