document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.querySelector('.project-list');
    
    // Sample project data
    const projects = [
        { name: 'Website Redesign', client: 'ABC Corp', status: 'In Progress', dueDate: '2023-12-25' },
        { name: 'Mobile App Development', client: 'XYZ Ltd', status: 'Review', dueDate: '2023-12-30' },
        { name: 'E-commerce Platform', client: '123 Store', status: 'Planning', dueDate: '2024-01-15' }
    ];

    // Render projects
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-item';
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <p>Client: ${project.client}</p>
            <p>Status: <span class="status">${project.status}</span></p>
            <p>Due: ${project.dueDate}</p>
        `;
        projectList.appendChild(projectElement);
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('.sidebar a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.textContent.toLowerCase() + '-content';
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show/hide content sections
            contentSections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Initialize charts
    const earningsCtx = document.getElementById('earningsChart').getContext('2d');
    new Chart(earningsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Earnings',
                data: [1500, 2300, 3200, 2800, 5000, 4200],
                borderColor: '#2c3e50',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Handle settings form and skills
    const settingsForm = document.getElementById('settings-form');
    const skillInput = document.getElementById('skillInput');
    const skillsContainer = document.querySelector('.skills-tags');
    const skills = new Set();

    if (skillInput) {
        skillInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const skill = skillInput.value.trim();
                if (skill && !skills.has(skill)) {
                    skills.add(skill);
                    const skillTag = document.createElement('div');
                    skillTag.className = 'skill-tag';
                    skillTag.innerHTML = `
                        ${skill}
                        <button type="button" onclick="this.parentElement.remove()">×</button>
                    `;
                    skillsContainer.appendChild(skillTag);
                    skillInput.value = '';
                }
            }
        });
    }

    // Handle portfolio and certification additions
    const addPortfolio = document.getElementById('add-portfolio');
    const addCertification = document.getElementById('add-certification');

    if (addPortfolio) {
        addPortfolio.addEventListener('click', () => {
            const container = document.createElement('div');
            container.className = 'portfolio-input';
            container.innerHTML = `
                <input type="url" placeholder="Project URL">
                <input type="text" placeholder="Project Description">
            `;
            addPortfolio.parentElement.insertBefore(container, addPortfolio);
        });
    }

    if (addCertification) {
        addCertification.addEventListener('click', () => {
            const container = document.createElement('div');
            container.className = 'certification-input';
            container.innerHTML = `
                <input type="text" placeholder="Certification Name">
                <input type="text" placeholder="Issuing Organization">
                <input type="date" placeholder="Date Acquired">
            `;
            addCertification.parentElement.insertBefore(container, addCertification);
        });
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically collect all the form data and send it to a server
            alert('Profile settings saved successfully!');
        });
    }
});
