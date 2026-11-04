/**
 * Módulo de Animación de Corazón con Sistema de Partículas
 * Aplica ecuaciones paramétricas y renderizado en HTML5 Canvas 2D.
 */
(() => {
    'use strict';

    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 600;
    const particles = [];

    // Ajuste dinámico de escala según el tamaño del viewport
    const getScale = () => Math.min(width, height) / 50;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            // Parámetro 't' para la ecuación paramétrica del corazón (0 a 2*PI)
            this.t = Math.random() * Math.PI * 2;
            this.scale = getScale();

            // Coordenadas base en forma de corazón
            const xBase = 16 * Math.pow(Math.sin(this.t), 3);
            const yBase = -(
                13 * Math.cos(this.t) -
                5 * Math.cos(2 * this.t) -
                2 * Math.cos(3 * this.t) -
                Math.cos(4 * this.t)
            );

            // Posición objetivo con variación aleatoria interna
            const scatter = Math.random();
            this.targetX = width / 2 + xBase * this.scale * scatter;
            this.targetY = height / 2 + yBase * this.scale * scatter;

            // Posición inicial con dispersión aleatoria
            this.x = width / 2 + (Math.random() - 0.5) * width;
            this.y = height / 2 + (Math.random() - 0.5) * height;

            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.02 + 0.01;
            this.alpha = Math.random() * 0.8 + 0.2;
            this.color = `hsl(${Math.random() * 40 + 330}, 100%, 65%)`; // Sombras rosa/rojo
        }

        update() {
            // Interpolación lineal (LERP) hacia la posición de la figura
            this.x += (this.targetX - this.x) * this.speed;
            this.y += (this.targetY - this.y) * this.speed;
        }

        draw(context) {
            context.save();
            context.globalAlpha = this.alpha;
            context.fillStyle = this.color;
            context.shadowBlur = 8;
            context.shadowColor = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    }

    const init = () => {
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        // Fondo semi-transparente para efecto de estela (trail)
        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach((p) => {
            p.update();
            p.draw(ctx);
        });

        requestAnimationFrame(animate);
    };

    // Recálculo en redimensionamiento de ventana
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    });

    // Iniciar
    init();
    animate();
})();