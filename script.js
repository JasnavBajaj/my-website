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
