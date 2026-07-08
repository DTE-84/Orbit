import { Activity, CreditCard, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const spendData = [
  { name: 'Jan', spend: 90 },
  { name: 'Feb', spend: 110 },
  { name: 'Mar', spend: 105 },
  { name: 'Apr', spend: 120 },
  { name: 'May', spend: 135 },
  { name: 'Jun', spend: 142.98 },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="flex-between mb-4">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Command Center</h1>
          <p className="text-secondary">Overview of your active subscriptions and security vault.</p>
        </div>
        <button className="btn btn-primary">
          <Activity size={18} />
          Sync with Pulse
        </button>
      </div>

      <div className="stats-grid delay-1">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="flex-between mb-2">
            <h3 className="text-secondary">Monthly Spend</h3>
            <div style={{ padding: '8px', backgroundColor: 'var(--primary-transparent)', borderRadius: '12px' }}>
              <TrendingUp size={20} className="text-gold" />
            </div>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>$142.98</h2>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-success">-4.2%</span>
            <span className="text-tertiary" style={{ fontSize: '0.85rem' }}>vs last month</span>
          </div>
          
          <div style={{ flex: 1, minHeight: '80px', width: '100%', marginTop: 'auto', marginLeft: '-12px', marginRight: '-12px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="spend" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel">
          <div className="flex-between mb-2">
            <h3 className="text-secondary">Active Subscriptions</h3>
            <div style={{ padding: '8px', backgroundColor: 'var(--bg-elevated)', borderRadius: '12px' }}>
              <CreditCard size={20} className="text-primary" />
            </div>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>12</h2>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
            <span className="text-tertiary" style={{ fontSize: '0.85rem' }}>2 renewing this week</span>
          </div>
        </div>

        <div className="glass-panel">
          <div className="flex-between mb-2">
            <h3 className="text-secondary">Vault Health</h3>
            <div style={{ padding: '8px', backgroundColor: 'var(--bg-elevated)', borderRadius: '12px' }}>
              <Shield size={20} className="text-primary" />
            </div>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>98%</h2>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
            <span className="text-tertiary" style={{ fontSize: '0.85rem' }}>AES-256 Encrypted</span>
          </div>
        </div>
      </div>

      <div className="grid-cards delay-2">
        <div className="glass-panel" style={{ gridColumn: 'span 2' }}>
          <div className="flex-between mb-4">
            <h3>Upcoming Renewals</h3>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>View All</button>
          </div>
          <div className="list-container">
            {[
              { name: 'Figma Professional', price: '$15.00', date: 'Tomorrow', icon: '🎨' },
              { name: 'AWS Cloud Services', price: '$42.18', date: 'In 3 days', icon: '☁️' },
              { name: 'Netflix Premium', price: '$22.99', date: 'In 5 days', icon: '🍿' }
            ].map((sub, i) => (
              <div key={i} className="list-item">
                <div className="flex-center" style={{ gap: '16px' }}>
                  <div style={{ fontSize: '1.5rem', width: '40px', height: '40px', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                    {sub.icon}
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>{sub.name}</h4>
                    <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Renews {sub.date}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h4 style={{ marginBottom: '4px' }}>{sub.price}</h4>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <div className="flex-between mb-4">
            <h3>Security Alerts</h3>
            <AlertCircle size={20} className="text-gold" />
          </div>
          <div style={{ padding: '16px', backgroundColor: 'var(--primary-transparent)', border: '1px solid var(--border-gold)', borderRadius: '12px', marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Password Reuse Detected</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
              You are using the same password for <strong>Spotify</strong> and <strong>Hulu</strong>. Consider updating them.
            </p>
            <button className="btn btn-primary mt-2" style={{ width: '100%', padding: '8px' }}>Resolve Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
