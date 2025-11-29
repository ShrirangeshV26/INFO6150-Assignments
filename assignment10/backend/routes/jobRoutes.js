import express from 'express';
import Job from '../models/Job.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create/job', auth, async (req,res)=>{
  try{
    if(req.user.type !== 'admin') return res.status(403).json({ msg: 'Admins only' });
    const { companyName, title, description, salary } = req.body;
    const job = await Job.create({ companyName, title, description, salary });
    res.json(job);
  }catch(err){ res.status(500).json({ err: err.message }); }
});

router.get('/jobs', auth, async (req,res)=>{
  try{
    if(req.user.type !== 'employee') return res.status(403).json({ msg: 'Employees only' });
    const jobs = await Job.find({}, '-__v');
    res.json(jobs);
  }catch(err){ res.status(500).json({ err: err.message }); }
});

export default router;
