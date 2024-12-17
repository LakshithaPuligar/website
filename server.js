const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for frontend access
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set unique filename
  }
});

// Set up multer with file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single('file'); // Single file upload with 'file' as the field name

// Sample data for tasks (tasks with initial completion status and score)
let tasks = [
  { id: 1, name: 'Assignment 1', completed: false },
  { id: 2, name: 'Assignment 2', completed: false },
  { id: 3, name: 'Assignment 3', completed: false },
];

// Calculate total score based on completed tasks (1 point per task)
const calculateScore = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  return completedTasks; // Score equals the number of completed tasks
};

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route to handle file upload for each task
app.post('/tasks/:id/upload', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).send('Task not found');
  }

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).send('Multer error: ' + err.message);
    } else if (err) {
      return res.status(500).send('Error uploading file: ' + err.message);
    }

    // Mark task as completed
    task.completed = true;

    // Recalculate and send the updated score
    const score = calculateScore();
    res.status(200).send({
      message: 'File uploaded and Assignment is submitted!',
      task: task,
      score: score,
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
