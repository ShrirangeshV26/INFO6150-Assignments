import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/user/create', async (req,res)=>{
  try{
    const { name, email, password, type } = req.body;
    if(!name || !email || !password || !type) return res.status(400).json({ msg: 'All fields required' });
    if(!['admin','employee'].includes(type)) return res.status(400).json({ msg: 'Invalid type' });
    const existing = await User.findOne({ email });
    if(existing) return res.status(409).json({ msg: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, type });
    return res.json({ msg: 'User created', user: { id: user._id, name: user.name, email: user.email, type: user.type }});
  }catch(err){
    return res.status(500).json({ err: err.message });
  }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ msg: 'User not found' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, type: user.type, name: user.name });
  }catch(err){ res.status(500).json({ err: err.message }); }
});

router.get('/users', auth, async (req,res)=>{
  try{
    if(req.user.type !== 'admin') return res.status(403).json({ msg: 'Admins only' });
    const users = await User.find({}, '-password -__v');
    res.json(users);
  }catch(err){ res.status(500).json({ err: err.message }); }
});


export default router;
