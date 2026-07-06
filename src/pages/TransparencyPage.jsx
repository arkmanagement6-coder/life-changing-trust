import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FileText, ShieldAlert, Award, ArrowUpRight, DollarSign, Users, Scale } from 'lucide-react';

export default function TransparencyPage() {
  const { donations } = useContext(AppContext);

  // Prepopulated Expense Ledger matching direct payouts
  const expenseLedger = [
    { id: "PAY-3001", date: "2026-07-05", cause: "Aarav's Heart Transplant", hospital: "Apollo Hospital, Delhi", amount: 350000, description: "Direct disbursal to Apollo billing desk for donor heart harvesting fees.", receiptNo: "HSP-TX-987" },
    { id: "PAY-3002", date: "2026-07-02", cause: "Bihar Solar Classroom Labs", supplier: "Luminous Solar Systems", amount: 120000, description: "Payment for solar inverters, lithium backup batteries and solar panels.", receiptNo: "SOL-TX-334" },
    { id: "PAY-3003", date: "2026-06-29", cause: "Priya's Breast Cancer Chemo", hospital: "Tata Memorial Hospital, Mumbai", amount: 180000, description: "Payout for oncology drug procurement (chemo cycles 1 & 2).", receiptNo: "TMH-TX-109" },
    { id: "PAY-3004", date: "2026-06-25", cause: "Girls High School Scholarship", school: "Life Trust Academy, Pune", amount: 250000, description: "Direct school tuition fees deposit for 50 registered girl child scholars.", receiptNo: "SCH-TX-089" }
  ];

  return (
    <div className="container" style={{ padding: '60px 24px', textAlign: 'left' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Compliance & Audits</span>
        <h1 style={{ fontSize: '42px', marginTop: '10px', fontWeight: '800' }}>Transparency & Ledger Accountability</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '650px', margin: '16px auto 0', lineHeight: '1.6' }}>
          Every rupee donated is recorded, audited, and published. Discover how our direct-to-vendor settlement guarantees zero leakages.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid-3" style={{ marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '30px', background: 'white' }}>
          <div style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '14px', textTransform: 'uppercase', marginBottom: '6px' }}>Compliance Rating</div>
          <strong style={{ fontSize: '28px', color: 'var(--success)' }}>Grade A+ (10/10)</strong>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Audited by independent Chartered Accountants annually.</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', background: 'white' }}>
          <div style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '14px', textTransform: 'uppercase', marginBottom: '6px' }}>Direct Cause Deployed</div>
          <strong style={{ fontSize: '28px' }}>85.4%</strong>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Surpasses global standards of non-profit efficiency thresholds.</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', background: 'white' }}>
          <div style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '14px', textTransform: 'uppercase', marginBottom: '6px' }}>Ledger Checks</div>
          <strong style={{ fontSize: '28px' }}>Real-time Audit</strong>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Public listing of receipts matching actual hospital transaction IDs.</p>
        </div>
      </div>

      {/* Expense ledger listing */}
      <div className="glass-panel" style={{ background: 'white', padding: '40px', marginBottom: '60px' }}>
        <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Direct Disbursal Expense Ledger</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Real-time updates of fund disbursements from Project LIFE bank accounts directly to hospitals, medical suppliers, and educational institutions.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.5px' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Txn Date</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Beneficiary / Cause</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Vendor Settled</th>
                <th style={{ textAlign: 'right', padding: '12px' }}>Amount Settled</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Receipt / Bill No</th>
              </tr>
            </thead>
            <tbody>
              {expenseLedger.map((exp, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{exp.date}</td>
                  <td style={{ padding: '12px' }}>
                    <strong>{exp.cause}</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{exp.description}</div>
                  </td>
                  <td style={{ padding: '12px' }}>{exp.hospital || exp.school || exp.supplier}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700', color: 'var(--emergency)' }}>- ₹{exp.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px', color: 'var(--primary)', fontWeight: '600' }}>{exp.receiptNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit reports download center */}
      <div className="grid-2">
        <div className="glass-panel" style={{ background: 'white', padding: '30px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--primary)" />
            <span>CA Audited Financial Statements</span>
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: '20px' }}>
            Download complete filings, auditor notes, and bank balance sheets. We publish reports quarterly.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['FY_2024-25_Audited_Balance_Sheet.pdf', 'FY_2023-24_Annual_Report_Trust.pdf', 'NITI_Aayog_Compliance_Certificate.pdf'].map((doc, idx) => (
              <div key={idx} onClick={() => alert(`Downloading ${doc}`)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px' }}>
                <span style={{ fontWeight: '500' }}>{doc}</span>
                <ArrowUpRight size={16} color="var(--primary)" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ background: 'white', padding: '30px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="var(--secondary)" />
            <span>Income Tax & Trust Registrations</span>
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: '20px' }}>
            Download official orders from the Commissioner of Income Tax and Ministry of Corporate Affairs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['CIT_80G_Final_Order_Approval.pdf', '12A_Trust_Accreditation_Certificate.pdf', 'CSR-1_MCA_Form_Receipt.pdf'].map((doc, idx) => (
              <div key={idx} onClick={() => alert(`Downloading ${doc}`)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px' }}>
                <span style={{ fontWeight: '500' }}>{doc}</span>
                <ArrowUpRight size={16} color="var(--secondary)" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
