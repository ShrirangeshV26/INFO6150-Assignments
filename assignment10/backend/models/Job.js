import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  salary: { type: Number }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
