const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const enrollmentModel = require('../models/enrollmentModel');

// POST route for creating a course
router.post('/', auth, upload.single('logo'), async (req, res) => {
  const { title, description, fee } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      fee,
      logo: req.file ? `/uploads/${req.file.filename}` : null,
      mentor: req.user.userId, // Assuming req.user is set from the auth middleware
    });

    await newCourse.save();
    res.json({ message: 'Course created successfully', course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching all courses created by the mentor
router.get('/', auth, async (req, res) => {
    console.log("hi mentor course");
    
  try {

    
    const courses = await Course.find({ mentor: req.user.userId });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET route to fetch all courses
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from the database
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/check', async (req, res) => {
  try {
    const { id } = req.params; // courseId from params

    // Query the enrollment model to check if the course is paid
    const enrollment = await enrollmentModel.findOne({ courseId: id, status: 'Paid' });

    if (!enrollment) {
      return res.status(200).json({ isPaid: false, message: 'No paid enrollment found for this course.' });
    }

    // If found, the course is paid
    return res.status(200).json({ isPaid: true, message: 'The course has been paid for.' });
  } catch (error) {
    console.error('Error checking course payment status:', error);
    res.status(500).json({ message: 'Server error' });
  }
})


router.get('/:id', auth, async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate('sections');
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;
