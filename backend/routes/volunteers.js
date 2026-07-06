const express = require('express');
const router = express.Router();

const mockVolunteers = [
  { id: "v1", user_id: "vol-sbox", name: "Kunal Gupta", skills: ["Marketing", "Field Work"], referral_code: "KUNAL10", total_referrals: 120, total_donations_generated: 15000.00, level: "active" }
];

const mockTasks = [
  { id: "t1", title: "Translate Aarav's Story into Hindi", points: 100, category: "Translation", status: "pending" }
];

// POST /api/volunteers/register
router.post('/register', (req, res) => {
  const { user_id, skills, referral_code } = req.body;
  if (!user_id || !referral_code) {
    return res.status(400).json({ error: "User ID and unique referral code are required" });
  }

  const newVol = {
    id: "vol-" + Math.floor(1000 + Math.random()*9000),
    user_id,
    skills: skills || [],
    referral_code,
    total_referrals: 0,
    total_donations_generated: 0.00,
    level: "beginner"
  };

  mockVolunteers.push(newVol);
  res.status(201).json({ message: "Volunteer profile registered successfully", volunteer: newVol });
});

// GET /api/volunteers/dashboard
router.get('/dashboard', (req, res) => {
  // Return stats and leaderboard ranks
  const sortedVolunteers = [...mockVolunteers].sort((a, b) => b.total_donations_generated - a.total_donations_generated);
  
  res.status(200).json({
    activeTasks: mockTasks,
    leaderboard: sortedVolunteers.map((v, index) => ({
      rank: index + 1,
      name: v.name || "Volunteer Participant",
      donationsGenerated: v.total_donations_generated,
      level: v.level
    }))
  });
});

// POST /api/volunteers/task
router.post('/task', (req, res) => {
  const { task_id, action } = req.body; // action: 'claim' | 'complete'
  if (!task_id || !action) {
    return res.status(400).json({ error: "Task ID and action are required" });
  }

  const taskIndex = mockTasks.findIndex(t => t.id === task_id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (action === 'claim') {
    mockTasks[taskIndex].status = 'in-progress';
  } else if (action === 'complete') {
    mockTasks[taskIndex].status = 'completed';
  }

  res.status(200).json({ message: `Task status updated to ${mockTasks[taskIndex].status}`, task: mockTasks[taskIndex] });
});

module.exports = router;
