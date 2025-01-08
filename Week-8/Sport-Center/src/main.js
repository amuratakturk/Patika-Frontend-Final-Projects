// DOMContentLoaded ile DOM'un tamamen yüklendiğinden emin olun
document.addEventListener('DOMContentLoaded', () => {
  //  Navbar Scroll
  const navbar = document.querySelector('.nav-scroll');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      navbar.classList.remove('transparent'); // Scroll
    } else {
      navbar.classList.add('transparent'); // Transparent
    }
  });

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  //  Content Switching
  function showContent(contentId) {
    event.preventDefault();
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.style.display = 'none';
    });
    const activeSection = document.getElementById(contentId);
    if (activeSection) {
      activeSection.style.display = 'flex';
    }
  }

  //  BMI Hesaplama
  function calculateBMI() {
    const height = document.getElementById('height').value / 100; // cm to m
    const weight = document.getElementById('weight').value;

    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height); // BMI hesaplama
      const indicator = document.getElementById('bmi-indicator');
      const bmiResult = document.getElementById('bmi-result'); // Sonuç göstergesi

      // BMI sonucunu HTML'e yazdır
      bmiResult.innerText = `: ${bmi.toFixed(2)}`;

      // BMI sonucuna göre oku yerleştir
      if (bmi < 18.5) {
        indicator.style.left = '15%'; // Sol alt
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        indicator.style.left = '30%'; // Sol orta
      } else if (bmi >= 25 && bmi <= 29.9) {
        indicator.style.left = '50%'; // Orta
      } else if (bmi >= 30 && bmi <= 34.9) {
        indicator.style.left = '65%'; // Sağ orta
      } else if (bmi > 35) {
        indicator.style.left = '80%'; // Sağ alt
      }
    }
  }

  // Fonksiyonları Global Erişilebilir Yap
  window.showContent = showContent;
  window.calculateBMI = calculateBMI;
});
