const glow = document.querySelector(".cursor-glow");
const features = Array.from(document.querySelectorAll(".feature"));
const aboutText = document.querySelector(".about-text");
const aboutSection = document.querySelector("#about");
const aboutElements = document.querySelectorAll(".about-text, .feature");

function updateCursorPosition(e) {
    requestAnimationFrame(() => {
        const bounds = aboutSection.getBoundingClientRect();

        if (
            e.clientX >= bounds.left &&
            e.clientX <= bounds.right &&
            e.clientY >= bounds.top &&
            e.clientY <= bounds.bottom
        ) {
            glow.style.left = `${e.clientX + window.scrollX}px`;
            glow.style.top = `${e.clientY + window.scrollY}px`;
            glow.style.opacity = 1;
            glow.style.transition = "opacity 0.3s ease-in-out";

            if (aboutText.contains(e.target)) {
                glow.style.background = "rgba(255, 255, 255, 0.2)";
            } else if (features.some(f => f.contains(e.target))) {
                glow.style.background = "rgba(255, 165, 0, 0.7)";
                glow.style.boxShadow = "0 0 30px rgba(255, 165, 0, 1)";
            } else {
                glow.style.background = "rgba(255, 165, 0, 0.5)";
                glow.style.boxShadow = "0 0 20px rgba(255, 165, 0, 0.8)";
            }
        } else {
            glow.style.opacity = 0;
        }
    });
}

document.addEventListener("mousemove", updateCursorPosition);
document.addEventListener("scroll", updateCursorPosition);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

aboutElements.forEach(el => observer.observe(el))

document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".service-card .stats-number")

    const startCount = (element, target) => {
        let count = 0;
        const speed = Math.ceil(target / 50);
        const updateCount = () => {
            count += speed;
            if (count >= target) {
                count = target;
            }
            element.textContent = count;
            if (count < target) {
                requestAnimationFrame(updateCount);
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.getAttribute("data-target")
                startCount(entry.target, parseInt(number))
            }
        });
    }, { threshold: 0.8 });

    stats.forEach(stat => observer.observe(stat))
});

document.addEventListener("DOMContentLoaded", () => {
    const modalTriggers = document.querySelectorAll(".details-button")
    const modals = document.querySelectorAll(".modal")
    const closeButtons = document.querySelectorAll(".close")

    modalTriggers.forEach(button => {
        button.addEventListener("click", () => {
            const targetModal = document.querySelector(button.getAttribute("data-target"))
            if (targetModal) {
                targetModal.style.display = "flex"
            }
        })
    })

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none"
        })
    })

    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none"
            }
        })
    })
})


document.addEventListener("DOMContentLoaded", () => {
    // Открытие модальных окон портфолио
    const portfolioTriggers = document.querySelectorAll('.portfolio-details-button');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal .close');
  
    portfolioTriggers.forEach(button => {
      button.addEventListener("click", () => {
        const targetModal = document.querySelector(button.getAttribute("data-target"));
        if (targetModal) {
          targetModal.style.display = "flex";
        }
      });
    });
  
    // Закрытие модальных окон через кнопку Close
    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });
  
    // Закрытие модального окна при клике вне его
    window.addEventListener("click", (e) => {
      modals.forEach(modal => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  });

  let character = document.getElementById("character");
  let targetX = 50; // Целевая позиция персонажа по X
  
  document.addEventListener("mousemove", function(event) {
      targetX = event.clientX; // Запоминаем позицию мыши, но перемещаем с задержкой
  });
  
  // Функция плавного движения
  function moveCharacter() {
      let currentX = parseInt(character.style.left) || 50;
      let speed = 0.1; // Скорость следования (чем меньше, тем медленнее)
  
      character.style.left = currentX + (targetX - currentX) * speed + "px";
  
      if (targetX > currentX) {
          character.style.transform = "scaleX(1)";
      } else {
          character.style.transform = "scaleX(-1)"; 
      }
  
      requestAnimationFrame(moveCharacter);
  }
  
  moveCharacter();
  