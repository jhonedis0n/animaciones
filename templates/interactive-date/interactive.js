/**
 * Módulo Interactivo de Cita
 * Gestiona navegación por pasos y comportamiento evasivo de UI.
 */
(() => {
    'use strict';

    // Elementos del DOM
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const dateForm = document.getElementById('date-form');
    const summaryText = document.getElementById('summary-text');
    const btnWhatsapp = document.getElementById('btn-whatsapp');

    // Estado del Formulario
    const state = {
        date: '',
        plan: ''
    };

    /**
     * Mueve el botón "No" a una posición aleatoria dentro del viewport visible
     */
    const moveNoButton = () => {
        const padding = 20;
        const btnRect = btnNo.getBoundingClientRect();
        
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        btnNo.style.position = 'fixed';
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    };

    /**
     * Alterna la visibilidad entre tarjetas con transición CSS
     */
    const switchStep = (currentStep, nextStep) => {
        currentStep.classList.remove('active');
        currentStep.classList.add('hidden');
        
        nextStep.classList.remove('hidden');
        nextStep.classList.add('active');
    };

    // Eventos
    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    btnYes.addEventListener('click', () => {
        switchStep(step1, step2);
    });

    dateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dateInput = document.getElementById('date-select').value;
        const planInput = document.getElementById('plan-select').value;

        if (!dateInput || !planInput) return;

        state.date = new Date(dateInput).toLocaleString('es-ES', {
            dateStyle: 'full',
            timeStyle: 'short'
        });
        state.plan = planInput;

        summaryText.textContent = `Quedamos confirmados para: ${state.plan.toUpperCase()} el día ${state.date}.`;

        switchStep(step2, step3);
    });

    btnWhatsapp.addEventListener('click', () => {
        // Enlace configurable para enviar el resultado
        const phoneNumber = ""; // Opcional: Número de teléfono destino
        const message = encodeURIComponent(
            `¡Hola! Confirmado el plan 🥰\n\n- Plan: ${state.plan}\n- Fecha: ${state.date}`
        );
        const url = phoneNumber 
            ? `https://wa.me/${phoneNumber}?text=${message}`
            : `https://api.whatsapp.com/send?text=${message}`;

        window.open(url, '_blank');
    });
})();