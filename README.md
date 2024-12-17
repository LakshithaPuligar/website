Backend (Node.js with Express):
Setup:

Created a Node.js server with Express to handle HTTP requests.
Used CORS to allow the frontend (which might be on a different domain) to access the backend.
Task Management:

Implemented endpoints to manage tasks:
GET /tasks to fetch all tasks, displaying task names and their completion status.
POST /tasks/:id/upload to upload files related to each task and update task completion.
File Upload:

Utilized Multer middleware to handle file uploads for each task.
Stored the uploaded files on the server, and tracked task completion.
Score Calculation:

Calculated the score based on the number of completed tasks (each task could add points to the candidate's score).
Stored and updated scores dynamically as files were uploaded for each task.
Frontend (HTML, CSS, and JavaScript):
Display Task List:

Designed a simple frontend interface that displays the list of tasks fetched from the backend.
For each task, it shows its name, completion status, and provides an option to upload a file.
File Upload:

Added file upload inputs next to each task, which candidates can use to upload files for tasks they are assigned to.
Once the file is uploaded, the status of the task changes to "Completed."
Score Display:

Dynamically updated and displayed the candidate's score at the top of the page, reflecting the number of completed tasks.
The score is updated whenever a new file is uploaded, based on the successful completion of tasks.
