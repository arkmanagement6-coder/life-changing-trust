import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, Plus, FileText, CheckCircle, Award, ShieldAlert } from 'lucide-react';

export default function HospitalDashboard() {
  const { hospitalCases, submitHospitalCase } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form States
  const [patientName, setPatientName] = useState('Rahul Mehra (8y)');
  const [condition, setCondition] = useState('Leukemia (Chemotherapy)');
  const [hospital, setHospital] = useState('Fortis Hospital, Noida');
  const [doctor, setDoctor] = useState('Dr. Rahul Bhargava');
  const [budgetNeeded, setBudgetNeeded] = useState('600000');
  const [docName, setDocName] = useState('Fortis_Prescription_Leukemia.pdf');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !condition || !budgetNeeded) return;

    submitHospitalCase({
      patientName,
      condition,
      hospital,
      doctor,
      budgetNeeded: parseFloat(budgetNeeded),
      docName
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddForm(false);
      setPatientName('');
      setCondition('');
      setBudgetNeeded('');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Metrics */}
      <div className="grid-3">
        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Funds Received
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginTop: '8px' }}>
            ₹45,00,000
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Sustaining 18 heart & cancer surgeries.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Patient Cases Active
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--secondary)', marginTop: '8px' }}>
            {hospitalCases.length} Cases
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Pending administrative document reviews.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Linked Hospitals
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--text)', marginTop: '8px' }}>
            8 Centers
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Fortis, Apollo, Tata Memorial, Max.
          </p>
        </div>
      </div>

      {/* Dynamic forms and listings */}
      <div style={{ display: 'grid', gridTemplateColumns: showAddForm ? '1fr' : '1.5fr 1fr', gap: '30px' }}>
        
        {/* Left Column: Registered cases */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '18px' }}>Hospital Patient Register</h4>
            {!showAddForm && (
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Plus size={14} />
                <span>Register Patient Case</span>
              </button>
            )}
          </div>

          {showAddForm ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h5 style={{ fontSize: '16px', fontWeight: '700' }}>Submit New Patient Treatment Case</h5>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Patient Name & Age</label>
                  <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Medical Diagnosis Condition</label>
                  <input 
                    type="text" 
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Hospital Center</label>
                  <input 
                    type="text" 
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Treating Doctor (Oncology/Cardiac)</label>
                  <input 
                    type="text" 
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Budget Requested (₹)</label>
                <input 
                  type="number" 
                  value={budgetNeeded}
                  onChange={(e) => setBudgetNeeded(e.target.value)}
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label>Mock Prescription document upload (Label name)</label>
                <input 
                  type="text" 
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  required
                  className="form-control" 
                />
              </div>

              {formSubmitted ? (
                <div style={{ color: 'var(--success)', fontWeight: '600' }}>✔ Patient Case submitted! Awaiting Admin review...</div>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline" style={{ flexGrow: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                    Upload Case Files
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {hospitalCases.map((c, idx) => (
                <div key={c.id || idx} style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge badge-warning" style={{ fontSize: '10px', marginBottom: '8px', background: c.status === 'Approved' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: c.status === 'Approved' ? 'var(--success)' : 'var(--warning)' }}>
                      {c.status}
                    </span>
                    <h5 style={{ fontSize: '16px', color: 'var(--text)' }}>Patient: {c.patientName}</h5>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Condition: <strong>{c.condition}</strong> • Medical Center: {c.hospital}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Attending Surgeon: {c.doctor} • Submitted: {c.date}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--primary)', fontWeight: '600', marginTop: '12px' }}>
                      <FileText size={12} />
                      <span>Verified File: {c.docName}</span>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <strong style={{ fontSize: '16px', color: 'var(--emergency)', display: 'block', marginBottom: '8px' }}>₹{c.budgetNeeded.toLocaleString('en-IN')}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status: Checked</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Hospital regulatory guidelines */}
        {!showAddForm && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '17px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} color="var(--primary)" />
              <span>Hospital Verification Code</span>
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              Medical institutions onboarding must register under trust compliance. All funds matching bills are settled directly to corporate billing accounts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span>
                <span>Requires official medical superintendent seal</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span>
                <span>Doctor prescriptions with GMC codes</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span>
                <span>Post-operative clinical outcome report required</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
