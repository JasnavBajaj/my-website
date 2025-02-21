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
              setTimeout(typeWriter, 100); 
          }
      }
  
      typeWriter();
      
  });

  
  
  const skillsData = [
    {
      category: "Programming Languages:",
      icon: "fas fa-Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 70 },
        { name: "Java", level: 95 },
        { name: "C", level: 70 },
        { name: "HTML/CSS", level: 90 },
      ]
    },
    {
      category: "Developer Tools:",
      icon: "fas fa-Languages",
      skills: [
        { name: "Git", level: 75 },
        { name: "Jupyter Notebook", level: 95 },
        { name: "VS Code", level: 95 },
        { name: "npm", level: 70 },
        { name: "uvicorn", level: 70 },
        { name: "pip", level: 70 },
      ]
    },
    {
      category: "Frameworks/Libraries",
      icon: "fas fa-Frameworks",
      skills: [
        { name: "Pandas", level: 75 },
        { name: "OpenCV (cv2)", level: 70 },
        { name: "NumPy", level: 75 },
        { name: "Scikit-learn", level: 70 },
        { name: "Plotly", level: 80 },
        { name: "nltk", level: 65 },
        { name: "joblib", level: 70 }
      ]
    },
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