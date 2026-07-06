import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Heart, Bell, User, Layout, LogOut, ArrowRight, ChevronDown } from 'lucide-react';

export default function Navbar({ onDonateClick, onAuthClick }) {
  const { 
    currentUser, 
    logoutUser,
    notifications 
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navigateTo = (path) => {
    navigate(path);
    setShowProfileDropdown(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Logo */}
        <div onClick={() => navigateTo('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(15, 138, 95, 0.2)'
          }}>
            <Heart size={20} color="white" fill="white" />
          </div>
          <div>
            <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-title)', letterSpacing: '0.2px' }}>
              <span style={{ color: 'var(--primary)' }}>Life Changing</span>
              <span style={{ color: 'var(--secondary)' }}> Trust</span>
            </span>
            <div style={{ fontSize: '7.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '800', marginTop: '2px', letterSpacing: '0.5px' }}>
              Educational & Charitable Trust
            </div>
          </div>
        </div>

        {/* Center Menu Links */}
        <nav style={{ display: 'flex', gap: '32px' }}>
          <button 
            onClick={() => navigateTo('/')} 
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '15px',
              fontFamily: 'var(--font-title)',
              fontWeight: isActive('/') ? '600' : '500',
              color: isActive('/') ? 'var(--primary)' : 'var(--text)',
              cursor: 'pointer',
              position: 'relative',
              padding: '6px 0'
            }}
          >
            Home
            {isActive('/') && (
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--primary)', borderRadius: '20px' }}></span>
            )}
          </button>
          
          <button 
            onClick={() => navigateTo('/about')} 
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '15px',
              fontFamily: 'var(--font-title)',
              fontWeight: isActive('/about') ? '600' : '500',
              color: isActive('/about') ? 'var(--primary)' : 'var(--text)',
              cursor: 'pointer',
              position: 'relative',
              padding: '6px 0'
            }}
          >
            About Trust
            {isActive('/about') && (
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--primary)', borderRadius: '20px' }}></span>
            )}
          </button>
          
          <button 
            onClick={() => navigateTo('/transparency')} 
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '15px',
              fontFamily: 'var(--font-title)',
              fontWeight: isActive('/transparency') ? '600' : '500',
              color: isActive('/transparency') ? 'var(--primary)' : 'var(--text)',
              cursor: 'pointer',
              position: 'relative',
              padding: '6px 0'
            }}
          >
            Financial Transparency
            {isActive('/transparency') && (
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--primary)', borderRadius: '20px' }}></span>
            )}
          </button>

          {currentUser && (
            <button 
              onClick={() => navigateTo('/dashboard')} 
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '15px',
                fontFamily: 'var(--font-title)',
                fontWeight: isActive('/dashboard') ? '600' : '500',
                color: isActive('/dashboard') ? 'var(--primary)' : 'var(--text)',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Layout size={16} />
              Portal Dashboard
              {isActive('/dashboard') && (
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--primary)', borderRadius: '20px' }}></span>
              )}
            </button>
          )}
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Auth Session / Profile dropdown */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f1f5f9',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-title)',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  color: 'var(--text)',
                  transition: 'all 0.2s'
                }}
              >
                <User size={14} color="var(--primary)" />
                <span>Hi, {currentUser.name.split(' ')[0]}</span>
                <span style={{ fontSize: '10px', textTransform: 'capitalize', color: 'var(--text-muted)' }}>({currentUser.role})</span>
                <ChevronDown size={14} />
              </button>

              {showProfileDropdown && (
                <div className="glass-panel" style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  width: '200px',
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  padding: '8px',
                  zIndex: 200,
                  textAlign: 'left'
                }}>
                  <button 
                    onClick={() => navigateTo('/dashboard')} 
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'transparent', border: 'none', padding: '10px 12px',
                      fontSize: '13px', color: 'var(--text)', fontWeight: '600',
                      cursor: 'pointer', borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Layout size={14} />
                    <span>My Dashboard</span>
                  </button>
                  <button 
                    onClick={() => { logoutUser(); setShowProfileDropdown(false); navigateTo('/'); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'transparent', border: 'none', padding: '10px 12px',
                      fontSize: '13px', color: 'var(--emergency)', fontWeight: '600',
                      cursor: 'pointer', borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(229, 57, 53, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="btn btn-outline" 
              style={{ padding: '8px 20px', fontSize: '13.5px' }}
            >
              Sign In
            </button>
          )}

          {/* Notifications bell */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              <Bell size={18} color="var(--text)" />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: 'var(--emergency)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '320px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '16px',
                zIndex: 200,
                maxHeight: '350px',
                overflowY: 'auto'
              }}>
                <h4 style={{ fontSize: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>System Activity Logs</span>
                  <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 'normal' }}>Live updates</span>
                </h4>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '8px 0', borderBottom: '1px solid #f8fafc', fontSize: '13px' }}>
                    <div style={{ fontWeight: '600', color: n.read ? 'var(--text-muted)' : 'var(--text)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{n.title}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Donate */}
          <button onClick={onDonateClick} className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }}>
            <span>Donate Now</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </header>
  );
}
