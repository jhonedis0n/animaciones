/**
 * Módulo de Animación Paramétrica de Rosa (Canvas 2D)
 * Algoritmo de trazado matemático basado en proyecciones polares y degradados de sombras.
 */
(() => {
    'use strict';

    const canvas = document.getElementById('roseCanvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId = null;
    let t = 0; // Parámetro del tiempo/crecimiento

    /**
     * Dibuja los pétalos de la rosa mediante ecuaciones polares avanzadas
     * @param {CanvasRenderingContext2D} c - Contexto del Canvas
     * @param {number} progress - Progreso del florecimiento (0 a 1)
     */
    const drawRose = (c, progress) => {
        const centerX = width / 2;
        const centerY = height / 2 - 20;
        const scale = Math.min(width, height) / 800;

        c.save();
        c.translate(centerX, centerY);
        c.scale(scale, scale);

        // Renderizado capa por capa de los pétalos
        const totalPetals = 350 * progress;
        for (let i = 0; i < totalPetals; i++) {
            const theta = i * 0.1;
            // Ecuación de la rosa matemática combinada con espiral de Fermat
            const r = 200 * Math.sin(theta * 0.8) * Math.sin(theta * 0.3);
            
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta) - (i * 0.2); // Elevación vertical para simular profundidad 3D

            const red = Math.floor(180 + Math.sin(i * 0.05) * 75);
            const green = Math.floor(20 + Math.cos(i * 0.05) * 20);
            const blue = Math.floor(40 + Math.sin(i * 0.05) * 20);

            c.beginPath();
            c.arc(x, y, Math.max(1, 12 - i * 0.03), 0, Math.PI * 2);
            c.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.85)`;
            c.shadowBlur = 10;
            c.shadowColor = `rgba(${red}, 0, 0, 0.4)`;
            c.fill();
        }

        c.restore();
    };

    /**
     * Dibuja el tallo de la rosa
     */
    const drawStem = (c, progress) => {
        const centerX = width / 2;
        const centerY = height / 2 - 20;
        const stemLength = (height / 2) * progress;

        c.save();
        c.beginPath();
        c.moveTo(centerX, centerY);
        c.quadraticCurveTo(centerX - 30, centerY + stemLength * 0.5, centerX - 10, centerY + stemLength);
        c.lineWidth = 6;
        c.strokeStyle = '#2d6a4f';
        c.shadowBlur = 5;
        c.shadowColor = '#1b4332';
        c.stroke();
        c.restore();
    };

    /**
     * Bucle de animación optimizado con requestAnimationFrame
     */
    const render = () => {
        // Limpieza del canvas
        ctx.fillStyle = '#030305';
        ctx.fillRect(0, 0, width, height);

        if (t < 1) {
            t += 0.005; // Velocidad de crecimiento
        }

        drawStem(ctx, Math.min(t * 1.5, 1));
        drawRose(ctx, t);

        animationFrameId = requestAnimationFrame(render);
    };

    /**
     * Manejador de redimensionamiento de pantalla (Debounced/Responsive)
     */
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Inicialización
    render();
})();