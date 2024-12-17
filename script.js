const projects = [
    { id: 1, name: 'Project A', description: 'Description of Project A' },
    { id: 2, name: 'Project B', description: 'Description of Project B' },
    { id: 3, name: 'Project C', description: 'Description of Project C' }
];

let selectedProject = null;
let progress = 0;
let score = 0;

// Render project assignments
const projectList = document.getElementById('project-list');
projects.forEach(project => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${project.name}</strong><p>${project.description}</p>
                   <button onclick="acceptProject(${project.id})">Accept Project</button>`;
    projectList.appendChild(li);
});

// Accept project function
function acceptProject(id) {
    selectedProject = projects.find(project => project.id === id);
    document.getElementById('progress-details').innerHTML = `
        <p>Progress for: <strong>${selectedProject.name}</strong></p>
        <label for="progress">Enter Progress (%): </label>
        <input type="number" id="progress" value="0" min="0" max="100">
    `;
    document.getElementById('submit-progress').style.display = 'inline-block';
}

// Submit progress function
document.getElementById('submit-progress').addEventListener('click', () => {
    progress = parseInt(document.getElementById('progress').value);
    score = progress * 10; // Example scoring mechanism
    document.getElementById('score').innerText = `Score: ${score}`;
    alert('Progress submitted successfully!');
});
