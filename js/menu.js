// Criar partículas flutuantes
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Posições e propriedades aleatórias
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // Cores estilo pixel art indie
      const colors = ['#4158D0', '#C850C0', '#FFCC70', '#55eb9c', 'white'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Aplicar estilos
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.backgroundColor = randomColor;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Animação em keyframes inline
      particle.style.animation = `floatParticle ${duration}s infinite ease-in-out ${delay}s`;
      
      // Adicionar ao container
      container.appendChild(particle);
    }
  }
  
  // Animação de flutuação para as partículas
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `
    @keyframes floatParticle {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
      50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
      75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Efeito de glitch para o personagem
  function startGlitchEffect() {
    const glitchElement = document.querySelector('.glitch-effect');
    glitchElement.classList.add('glitch-anim');
  }
  
  // Mostrar notificação
  function showNotification() {
    const notification = document.getElementById('notification');
    setTimeout(() => {
      notification.classList.add('show');
    }, 2000);
    
    // Adicionar evento para fechar notificação
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('show');
    });
  }
  
  // Inicializar
  document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    startGlitchEffect();
    showNotification();
    
    // Adicionar evento aos botões do menu
    const menuBtns = document.querySelectorAll('.menu-btn');
    menuBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        menuBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });