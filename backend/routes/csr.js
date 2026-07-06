const express = require('express');
const router = express.Router();

const mockCsrPartners = [
  { id: "csr1", company_name: "Tata Consultancy Services (TCS)", budget: 2500000.00, industry: "Technology", contact_person: "Rajesh Gopinathan", email: "csr@tcs.com" }
];

const mockCsrProjects = [
  { id: "proj1", title: "Digital India Literacy Hubs", budget_allocated: 2500000.00, utilized_amount: 1800000.00, beneficiaries: 4500 }
];

// POST /api/csr/register
router.post('/register', (req, res) => {
  const { company_name, contact_person, email, budget, industry } = req.body;
  
  if (!company_name || !email || !budget) {
    return res.status(400).json({ error: "Company name, email, and budget are required" });
  }

  const newPartner = {
    id: "csr-" + Math.floor(1000 + Math.random()*9000),
    company_name,
    contact_person: contact_person || "Operations Lead",
    email,
    budget: parseFloat(budget),
    industry
  };

  mockCsrPartners.push(newPartner);
  res.status(201).json({ message: "CSR Corporate partner registered successfully", partner: newPartner });
});

// GET /api/csr/projects
router.get('/projects', (req, res) => {
  res.status(200).json(mockCsrProjects);
});

// POST /api/csr/proposal
router.post('/proposal', (req, res) => {
  const { title, budget_allocated, description } = req.body;
  if (!title || !budget_allocated) {
    return res.status(400).json({ error: "Title and budget allocation are required" });
  }

  const newProj = {
    id: "proj-" + Math.floor(1000 + Math.random()*9000),
    title,
    budget_allocated: parseFloat(budget_allocated),
    utilized_amount: 0.00,
    beneficiaries: 150,
    description: description || ""
  };

  mockCsrProjects.push(newProj);
  res.status(201).json({ message: "CSR Grant project proposal created", project: newProj });
});

module.exports = router;
