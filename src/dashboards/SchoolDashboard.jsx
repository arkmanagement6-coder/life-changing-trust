import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BookOpen, Plus, FileText, CheckCircle, Award, Users } from 'lucide-react';

export default function SchoolDashboard() {
  const { schoolCases, submitSchoolCase } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form States
  const [schoolName, setSchoolName] = useState('Dr. Ambedkar Primary School, Gaya');
  const [studentCount, setStudentCount] = useState('45');
  const [requirements, setRequirements] = useState('High School Textbooks & Stationeries');
  const [budgetNeeded, setBudgetNeeded] = useState('75000');
  const [docName, setDocName] = useState('Ambedkar_School_Enrollment.pdf');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schoolName || !requirements || !budgetNeeded) return;

    submitSchoolCase({
      schoolName,
      studentCount: parseInt(studentCount),
      requirements,
      budgetNeeded: parseFloat(budgetNeeded),
      docName
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddForm(false);
      setSchoolName('');
      setStudentCount('');
      setRequirements('');
      setBudgetNeeded('');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      
      {/* Metrics */}
      <div className="grid-3">
        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Educational Grants
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--primary)', marginTop: '8px' }}>
            ₹18,50,000
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Sponsoring 1,450 underprivileged children.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Active School Projects
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--secondary)', marginTop: '8px' }}>
            {schoolCases.length} Cases
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Pending trust board verification logs.
          </p>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '24px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Volunteers Linked
          </span>
          <h3 style={{ fontSize: '28px', color: 'var(--text)', marginTop: '8px' }}>
            34 Members
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Providing local English & math tuitions.
          </p>
        </div>
      </div>

      {/* Forms and list */}
      <div style={{ display: 'grid', gridTemplateColumns: showAddForm ? '1fr' : '1.5fr 1fr', gap: '30px' }}>
        
        {/* Left Column: Registered cases */}
        <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '18px' }}>School Partnerships Register</h4>
            {!showAddForm && (
              <button onClick={() => setShowAddForm(true)} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Plus size={14} />
                <span>Register School Project</span>
              </button>
            )}
          </div>

          {showAddForm ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h5 style={{ fontSize: '16px', fontWeight: '700' }}>Submit New Classroom Infrastructure/Tuition Proposal</h5>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>School Institution Name</label>
                  <input 
                    type="text" 
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Total Student Beneficiaries</label>
                  <input 
                    type="number" 
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value)}
                    required
                    className="form-control" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Core Equipment/Tutor Requirements</label>
                <input 
                  type="text" 
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g. Desks, Science Lab Kits, Digital Tablets"
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label>Target Funding Needed (₹)</label>
                <input 
                  type="number" 
                  value={budgetNeeded}
                  onChange={(e) => setBudgetNeeded(e.target.value)}
                  required
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label>Enrollment Certification Proof (File name)</label>
                <input 
                  type="text" 
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  required
                  className="form-control" 
                />
              </div>

              {formSubmitted ? (
                <div style={{ color: 'var(--success)', fontWeight: '600' }}>✔ School Case submitted! Awaiting Trust board review...</div>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline" style={{ flexGrow: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }}>
                    Upload Proposals
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {schoolCases.map((c, idx) => (
                <div key={c.id || idx} style={{ border: '1px solid #cbd5e1', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge badge-warning" style={{ fontSize: '10px', marginBottom: '8px', background: c.status === 'Approved' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: c.status === 'Approved' ? 'var(--success)' : 'var(--warning)' }}>
                      {c.status}
                    </span>
                    <h5 style={{ fontSize: '16px', color: 'var(--text)' }}>Institution: {c.schoolName}</h5>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Requirements: <strong>{c.requirements}</strong> • Student Count: {c.studentCount} children
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Submitted: {c.date}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--primary)', fontWeight: '600', marginTop: '12px' }}>
                      <FileText size={12} />
                      <span>Audit Document: {c.docName}</span>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <strong style={{ fontSize: '16px', color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>₹{c.budgetNeeded.toLocaleString('en-IN')}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status: Active</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: regulatory guidelines */}
        {!showAddForm && (
          <div className="glass-panel" style={{ background: 'white', padding: '30px' }}>
            <h4 style={{ fontSize: '17px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--primary)" />
              <span>School Sponsorship Code</span>
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              To receive digital labs or textbooks, school heads must upload block education officer (BEO) clearances and enrollment registers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span>
                <span>Requires local government school registration certs</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span>
                <span>Verification of student attendance lists quarterly</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span>
                <span>Direct vendor settlement for all equipment orders</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
