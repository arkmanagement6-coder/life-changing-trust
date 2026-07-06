import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { X, Lock, Mail, User, ShieldAlert, Sparkles, Building, Phone } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { loginUser, signupUser, resetPasswordUser } = useContext(AppContext);
  
  // Tabs: 'login' | 'signup' | 'forgot'
  const [activeTab, setActiveTab] = useState('login');
  
  // Shared States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('donor');
  
  // Role Specific details
  const [orgName, setOrgName] = useState('');
  const [docName, setDocName] = useState('');
  const [location, setLocation] = useState('');
  const [accessCode, setAccessCode] = useState('');

  // Password Recovery States
  const [recoveryStep, setRecoveryStep] = useState(1); // 1: Email input, 2: OTP verify, 3: Reset password
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Action status reports
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = loginUser(email, password);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const details = {
      email,
      password,
      name,
      role,
      organization: role === 'csr' || role === 'hospital' || role === 'school' ? orgName : '',
      location: role === 'volunteer' ? location : '',
    };

    if (role === 'admin' && accessCode !== 'LIFE2026') {
      setErrorMsg("Invalid Admin Authorization Code. Please contact Trust boards.");
      return;
    }

    const res = signupUser(details);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleResetRequest = (e) => {
    e.preventDefault();
    setErrorMsg('');
    // Simulate sending OTP to email/WhatsApp
    setRecoveryStep(2);
    setSuccessMsg("✔ Simulated OTP reset code '1234' dispatched to email & WhatsApp.");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode === '1234') {
      setRecoveryStep(3);
      setErrorMsg('');
      setSuccessMsg('');
    } else {
      setErrorMsg("Incorrect verification OTP code. Try entering '1234'.");
    }
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    const res = resetPasswordUser(email, newPassword);
    if (res.success) {
      setSuccessMsg("✔ Password updated! You can now log in using your new credentials.");
      setTimeout(() => {
        setSuccessMsg('');
        setRecoveryStep(1);
        setActiveTab('login');
      }, 2000);
    } else {
      setErrorMsg(res.message);
    }
  };

  // Sandbox Quick Fill Shortcut helper
  const handleQuickFill = (roleName) => {
    setErrorMsg('');
    setSuccessMsg('');
    setEmail(`${roleName}@projectlife.org`);
    setPassword('password');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px'
    }}>
      
      {/* Modal Box */}
      <div className="glass-panel" style={{
        background: 'white',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '92vh',
        overflowY: 'auto',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(15, 138, 95, 0.2)',
        position: 'relative',
        padding: '30px'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px', right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text)'
          }}
        >
          <X size={18} />
        </button>

        {/* Brand Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', textAlign: 'left' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            width: '36px', height: '36px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Lock size={18} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Project LIFE</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Secure Identity Gateway</span>
          </div>
        </div>

        {/* Form Tab Switches */}
        {activeTab !== 'forgot' && (
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <button 
              onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
              style={{
                flexGrow: 1, background: 'transparent', border: 'none', padding: '12px',
                fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-title)',
                color: activeTab === 'login' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'login' ? '3px solid var(--primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              Log In
            </button>
            <button 
              onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
              style={{
                flexGrow: 1, background: 'transparent', border: 'none', padding: '12px',
                fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-title)',
                color: activeTab === 'signup' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'signup' ? '3px solid var(--primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Alerts messages */}
        {errorMsg && (
          <div style={{ background: 'rgba(229, 57, 53, 0.05)', border: '1px solid rgba(229, 57, 53, 0.15)', color: 'var(--emergency)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', textAlign: 'left' }}>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ background: 'rgba(22, 163, 74, 0.05)', border: '1px solid rgba(22, 163, 74, 0.15)', color: 'var(--success)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', textAlign: 'left' }}>
            {successMsg}
          </div>
        )}

        {/* TAB 1: LOG IN */}
        {activeTab === 'login' && (
          <div style={{ textAlign: 'left' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. donor@projectlife.org"
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ marginBottom: 0 }}>Password</label>
                  <button 
                    type="button" 
                    onClick={() => { setActiveTab('forgot'); setRecoveryStep(1); setErrorMsg(''); }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-control" 
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '10px' }}>
                Secure Access Login
              </button>
            </form>

            {/* Sandbox Quick Bypass tools */}
            <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '750', display: 'block', marginBottom: '12px' }}>
                🔑 Developer Sandbox Quick logins
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['donor', 'volunteer', 'csr', 'hospital', 'school', 'admin'].map(rl => (
                  <button
                    key={rl}
                    onClick={() => handleQuickFill(rl)}
                    style={{
                      border: '1px solid #cbd5e1',
                      padding: '6px 4px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      background: 'white',
                      color: 'var(--text)',
                      textTransform: 'capitalize',
                      textAlign: 'center'
                    }}
                  >
                    Quick {rl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIGN UP */}
        {activeTab === 'signup' && (
          <div style={{ textAlign: 'left' }}>
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div className="form-group">
                <label>Select Workspace Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                  style={{ fontWeight: '600' }}
                >
                  <option value="donor">Donor (Support Campaigns & download 80G)</option>
                  <option value="volunteer">Volunteer (Claim Tasks & earn medals)</option>
                  <option value="csr">CSR Corporate Partner ( MCA filings & proposals)</option>
                  <option value="hospital">Hospital Partner (Create pediatric cases)</option>
                  <option value="school">School Partner (Create tuition proposals)</option>
                  <option value="admin">NGO Admin Team (Full CRM management)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Full Name / Main Contact</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="form-control" 
                  placeholder="Enter your name"
                />
              </div>

              {/* Dynamic Field: Organization name for CSR, Hospital and Schools */}
              {(role === 'csr' || role === 'hospital' || role === 'school') && (
                <div className="form-group">
                  <label>
                    {role === 'csr' ? 'Corporate Company Name' : role === 'hospital' ? 'Registered Hospital Center Name' : 'School Institution Name'}
                  </label>
                  <input 
                    type="text" 
                    value={orgName} 
                    onChange={(e) => setOrgName(e.target.value)} 
                    required 
                    className="form-control" 
                    placeholder="e.g. Tata Trusts, Fortis Hospital, Gaya Academy"
                  />
                </div>
              )}

              {/* Dynamic Field: Location for Volunteers */}
              {role === 'volunteer' && (
                <div className="form-group">
                  <label>Primary Working Location (City)</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                    className="form-control" 
                    placeholder="e.g. Delhi, Mumbai, Pune"
                  />
                </div>
              )}

              {/* Dynamic Field: Access code for NGO Team */}
              {role === 'admin' && (
                <div className="form-group">
                  <label>Admin Authorization Code</label>
                  <input 
                    type="text" 
                    value={accessCode} 
                    onChange={(e) => setAccessCode(e.target.value)} 
                    required 
                    className="form-control" 
                    placeholder="Enter trust security key (LIFE2026)"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="form-control" 
                  placeholder="you@domain.org"
                />
              </div>

              <div className="form-group">
                <label>Secret Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="form-control" 
                  placeholder="Min 6 characters"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '10px' }}>
                Register Profile & Login
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: FORGOT PASSWORD */}
        {activeTab === 'forgot' && (
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Reset Trust Password</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              We will send a security OTP to verify your email. Follow the steps below to set a new password.
            </p>

            {/* Step 1: Input email */}
            {recoveryStep === 1 && (
              <form onSubmit={handleResetRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="Enter registered email address"
                    className="form-control" 
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => { setActiveTab('login'); setErrorMsg(''); }} className="btn btn-outline" style={{ flexGrow: 1 }}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                    Send Verification code
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Verify OTP */}
            {recoveryStep === 2 && (
              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label>Enter 4-Digit OTP Code</label>
                  <input 
                    type="text" 
                    value={otpCode} 
                    onChange={(e) => setOtpCode(e.target.value)} 
                    required 
                    maxLength="4"
                    placeholder="Enter '1234' for sandbox pass"
                    className="form-control" 
                    style={{ textAlign: 'center', fontSize: '20px', letterSpacing: '8px', fontWeight: '800' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setRecoveryStep(1)} className="btn btn-outline" style={{ flexGrow: 1 }}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                    Verify Reset Code
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Enter new password */}
            {recoveryStep === 3 && (
              <form onSubmit={handleNewPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label>Set New Password</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    placeholder="Min 6 characters"
                    className="form-control" 
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  Update Password
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
