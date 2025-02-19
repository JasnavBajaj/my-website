function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() {
    const text = "Hello, I'm Jasnav Bajaj Software Engineer";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            document.querySelector(".typewriter-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Adjust typing speed here
        }
    }

    typeWriter();
    
});
<<<<<<< HEAD


const skillsData = [
    {
        category: "Machine Learning",
        icon: "fas fa-brain",
        skills: [
            { name: "TensorFlow/Keras", level: 90 },
            { name: "PyTorch", level: 85 },
            { name: "Scikit-learn", level: 95 },
            { name: "Deep Learning", level: 85 }
        ]
    },
    {
        category: "Data Engineering",
        icon: "fas fa-database",
        skills: [
            { name: "SQL", level: 90 },
            { name: "Apache Spark", level: 80 },
            { name: "Data Pipeline Design", level: 85 },
            { name: "ETL Processes", level: 85 }
        ]
    },
    {
        category: "Programming",
        icon: "fas fa-code",
        skills: [
            { name: "Python", level: 95 },
            { name: "R", level: 80 },
            { name: "Java", level: 75 },
            { name: "C++", level: 70 }
        ]
    },
    {
        category: "Data Visualization",
        icon: "fas fa-chart-bar",
        skills: [
            { name: "Matplotlib", level: 90 },
            { name: "Seaborn", level: 85 },
            { name: "Plotly", level: 80 },
            { name: "Tableau", level: 75 }
        ]
    },
    {
        category: "Version Control & DevOps",
        icon: "fas fa-code-branch",
        skills: [
            { name: "Git", level: 90 },
            { name: "Docker", level: 85 },
            { name: "CI/CD", level: 80 },
            { name: "Kubernetes", level: 75 }
        ]
    },
    {
        category: "MLOps",
        icon: "fas fa-flask",
        skills: [
            { name: "Model Deployment", level: 85 },
            { name: "Model Monitoring", level: 80 },
            { name: "ML Pipeline Design", level: 85 },
            { name: "Model Optimization", level: 80 }
        ]
    }
];

function createSkillCard(categoryData) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'skill-category';
    categoryTitle.innerHTML = `<i class="${categoryData.icon}"></i> ${categoryData.category}`;
    
    card.appendChild(categoryTitle);

    categoryData.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: 0%"></div>
            </div>
        `;
        
        card.appendChild(skillItem);
    });

    return card;
}

function initializeSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsData.forEach(category => {
        skillsGrid.appendChild(createSkillCard(category));
    });

    // Animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach((bar, index) => {
                    const level = entry.target.querySelectorAll('.skill-level')[index].textContent;
                    setTimeout(() => {
                        bar.style.width = level;
                    }, 200 * index);
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initializeSkills);
=======
>>>>>>> 00f4baac73fa2c8acfbe307e8b345b8ede91df93
