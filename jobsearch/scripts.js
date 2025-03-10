document.addEventListener('DOMContentLoaded', function() {
    const jobListings = document.querySelector('.job-listings');
    if (!jobListings) return;

    // Static jobs data
    const staticJobs = [
        { 
            title: 'Web Developer',
            company: 'TechCorp Solutions',
            logo: 'company-logos/techcorp.png',
            location: 'Jakarta, Indonesia',
            salary: '$3,000 - $5,000/month',
            type: 'Full-time',
            posted: '2 days ago',
            description: 'Looking for a skilled web developer to build and maintain websites.',
            skills: ['HTML', 'CSS', 'JavaScript']
        },
        { 
            title: 'Mobile App Developer',
            company: 'AppWave Innovation',
            logo: 'company-logos/appwave.png',
            location: 'Bandung, Indonesia',
            salary: '$2,800 - $4,500/month',
            type: 'Full-time',
            posted: '5 days ago',
            description: 'Seeking a mobile app developer to create iOS and Android applications.',
            skills: ['React Native', 'Swift', 'Kotlin']
        },
        { 
            title: 'Data Scientist',
            company: 'DataMind Analytics',
            logo: 'company-logos/datamind.png',
            location: 'Surabaya, Indonesia',
            salary: '$3,500 - $6,000/month',
            type: 'Full-time',
            posted: '1 week ago',
            description: 'Hiring a data scientist to analyze large datasets and build machine learning models.',
            skills: ['Python', 'Machine Learning', 'Data Analysis']
        }
    ];

    // Load both static and dynamic jobs
    function loadAllJobs() {
        // Clear existing content
        jobListings.innerHTML = '';
        
        // Load dynamic jobs from localStorage first
        const dynamicJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        dynamicJobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobListings.appendChild(jobCard);
        });

        // Then load static jobs
        staticJobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobListings.appendChild(jobCard);
        });
    }

    function createJobCard(job) {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        
        // Handle both array and comma-separated string formats for skills
        const skillsArray = Array.isArray(job.skills) 
            ? job.skills 
            : job.skills.split(',').map(skill => skill.trim());

        jobCard.innerHTML = `
            <div class="job-header">
                <img src="${job.logo || 'company-logos/default.png'}" alt="${job.company} Logo" class="company-logo">
                <div class="job-title-container">
                    <h2>${job.title}</h2>
                    <h3>${job.company}</h3>
                </div>
                <span class="job-type">${job.type}</span>
            </div>
            <div class="job-details">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                <span><i class="fas fa-clock"></i> ${job.posted || 'Posted today'}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-tags">
                ${skillsArray.map(skill => `<span>${skill}</span>`).join('')}
            </div>
            <div class="job-actions">
                <button class="save-job"><i class="far fa-bookmark"></i> Save</button>
                <button class="apply-btn">Apply Now</button>
            </div>
        `;

        // Add save button functionality
        const saveBtn = jobCard.querySelector('.save-job');
        saveBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });

        return jobCard;
    }

    // Initialize jobs display
    loadAllJobs();
});
