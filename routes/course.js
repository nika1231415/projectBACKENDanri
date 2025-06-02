const express = require('express');
const Course = require('../models/Course');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const courses = await Course.find().populate('instructor', 'username');
  res.json(courses);
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json(course);
  } catch {
    res.status(400).json({ message: 'Could not create course' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  const deleted = await Course.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Course deleted' });
});

module.exports = router;