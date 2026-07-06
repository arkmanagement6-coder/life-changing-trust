import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Lock, ShieldAlert, Sparkles, LogOut } from 'lucide-react';
import DonorDashboard from '../dashboards/DonorDashboard';
import VolunteerDashboard from '../dashboards/VolunteerDashboard';
import CSRDashboard from '../dashboards/CSRDashboard';
import HospitalDashboard from '../dashboards/HospitalDashboard';
import SchoolDashboard from '../dashboards/SchoolDashboard';
import AdminDashboard from '../dashboards/AdminDashboard';

export default function DashboardPortal({ onAuthClick }) {
  const { currentUser, logoutUser } = useContext(AppContext);

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'donor':
        return <DonorDashboard />;
      case 'volunteer':
        return <VolunteerDashboard />;
      case 'csr':
        return <CSRDashboard />;
      case 'hospital':
        return <HospitalDashboard />;
      case 'school':
        return <SchoolDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Unknown User Role</h3>
            <p style={{ color: 'var(--text-muted)' }}>We were unable to resolve your profile access dashboard.</p>
          </div>
        );
    }
  };

  // ACCESS GUARD: If user is not logged in
  if (!currentUser) {
    return (
      <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div className="glass-panel" style={{
          background: 'white',
          width: '100%',
          maxWidth: '550px',
          padding: '40px 30px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(15, 138, 95, 0.08)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: 'var(--warning)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Lock size={30} color="var(--warning)" />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px' }}>
            Workspace Access Protected
          </h2>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '30px' }}>
            This workspace contains private donor tax declarations, volunteer points registers, corporate CSR proposal agreements, and clinical hospital bills. Please sign in to authenticate.
          </p>

          <button onClick={onAuthClick} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
            Sign In / Sign Up to Continue
          </button>

          {/* Sandbox note */}
          <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px', textAlign: 'left' }}>
            <span style={{ fontWeight: '750', color: 'var(--text)', display: 'block', marginBottom: '6px' }}>
              💡 Testing Sandbox Credentials:
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)' }}>
              <li>• Admin: <code>admin@projectlife.org</code> (password: <code>password</code>)</li>
              <li>• Donor: <code>donor@projectlife.org</code> (password: <code>password</code>)</li>
              <li>• Volunteer: <code>volunteer@projectlife.org</code> (password: <code>password</code>)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '40px 0' }}>
      <div className="container">
        
        {/* Workspace Portal Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '20px',
          padding: '24px 30px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '750', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px' }}>
              Secure Session Active
            </span>
            <h2 style={{ color: 'white', fontSize: '24px', marginTop: '4px', textTransform: 'capitalize' }}>
              {currentUser.name}'s Workspace ({currentUser.role})
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={logoutUser}
              className="btn btn-outline-white" 
              style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={12} />
              <span>Log Out</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>Live Auth</span>
            </div>
          </div>
        </div>

        {renderDashboard()}

      </div>
    </div>
  );
}
