document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de hover suave a las tarjetas
    const cards = document.querySelectorAll('.card');
    
    // Verificar si el dispositivo es táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Reducir aún más el ángulo de rotación
                const angleX = (y - centerY) / 60;
                const angleY = (centerX - x) / 60;
                
                // Añadir transición más suave
                card.style.transition = 'transform 0.3s ease-out';
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(2px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transition = 'transform 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Prevenir arrastre de imágenes
    const cardsWrapper = document.querySelector('.cards-wrapper');
    cardsWrapper.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    // Restablecer transformación en cambio de orientación
    window.addEventListener('orientationchange', () => {
        if (window.innerWidth > 768 || window.innerHeight < window.innerWidth) {
            cardsWrapper.style.transform = 'none';
        } else {
            cardsWrapper.style.transform = 'none';
        }
    });
});