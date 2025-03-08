document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de hover suave a las tarjetas
    const cards = document.querySelectorAll('.card');
    
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

    // Carrusel para móviles
    const cardsWrapper = document.querySelector('.cards-wrapper');
    let startX;
    let currentTranslate = -113; // Posición inicial
    let isDragging = false;
    let startDragX;

    function handleTouchStart(e) {
        if (window.innerWidth > 768 || window.innerHeight < window.innerWidth) return;
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        startDragX = startX;
        
        cardsWrapper.style.transition = 'none';
        cardsWrapper.style.cursor = 'grabbing';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = (startX - x);
        const newTranslate = currentTranslate - walk;
        
        // Limitar el deslizamiento
        if (newTranslate > -50 || newTranslate < -176) return;
        
        cardsWrapper.style.transform = `translateX(${-newTranslate}px)`;
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const x = e.type === 'mouseup' ? e.pageX : (e.changedTouches ? e.changedTouches[0].pageX : startDragX);
        const walk = startDragX - x;
        
        cardsWrapper.style.transition = 'transform 0.3s ease';
        cardsWrapper.style.cursor = 'grab';

        // Determinar la posición final basada en la dirección y distancia del deslizamiento
        if (Math.abs(walk) > 30) { // Umbral más pequeño para un deslizamiento más sensible
            if (walk > 0) {
                // Deslizar a la derecha
                currentTranslate = -176; // Posición final derecha
            } else {
                // Deslizar a la izquierda
                currentTranslate = -50; // Posición final izquierda
            }
        } else {
            // Volver a la posición inicial
            currentTranslate = -113;
        }

        cardsWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Event listeners
    cardsWrapper.addEventListener('mousedown', handleTouchStart, { passive: false });
    cardsWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    document.addEventListener('mousemove', handleTouchMove, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    document.addEventListener('mouseup', handleTouchEnd);
    document.addEventListener('touchend', handleTouchEnd);
    
    // Prevenir arrastre de imágenes
    cardsWrapper.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    // Restablecer transformación en cambio de orientación
    window.addEventListener('orientationchange', () => {
        if (window.innerWidth > 768 || window.innerHeight < window.innerWidth) {
            cardsWrapper.style.transform = 'none';
        } else {
            currentTranslate = -113;
            cardsWrapper.style.transform = `translateX(${currentTranslate}px)`;
        }
    });
});