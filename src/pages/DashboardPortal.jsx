import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DonorDashboard from '../dashboards/DonorDashboard';
import VolunteerDashboard from '../dashboards/VolunteerDashboard';
import CSRDashboard from '../dashboards/CSRDashboard';
import HospitalDashboard from '../dashboards/HospitalDashboard';
import SchoolDashboard from '../dashboards/SchoolDashboard';
import AdminDashboard from '../dashboards/AdminDashboard';

export default function DashboardPortal() {
  const { currentUserRole, handleRoleChange } = useContext(AppContext);

  const renderDashboard = () => {
    switch (currentUserRole) {
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
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Access Portal Workspaces</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
              Please select a role from the profile switcher in the navigation bar to preview our role-specific dashboards.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              {['donor', 'volunteer', 'csr', 'hospital', 'school', 'admin'].map(role => (
                <button 
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className="btn btn-outline"
                  style={{ textTransform: 'capitalize' }}
                >
                  Switch to {role}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

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
              {currentUserRole} Workspace Dashboard
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>Environment: Sandbox Dev</span>
          </div>
        </div>

        {renderDashboard()}

      </div>
    </div>
  );
}
