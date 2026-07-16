document.addEventListener("DOMContentLoaded", () => {
    shuffleAndAssignArt();
    initTextRevealEngine();
});

// Shuffles and assigns arts on page refresh
function shuffleAndAssignArt() {
    const artPool = [
        { name: "Abstract Fluid Ink painting", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80" },
        { name: "Neo-Classical Form Sculpture", url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1000&q=80" },
        { name: "Cyberpunk Digital Vector Art", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=80" },
        { name: "Dynamic Minimal Line Sketching", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80" },
        { name: "Architectural Surrealism concept", url: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?auto=format&fit=crop&w=1000&q=80" },
        { name: "Contemporary Graphic Canvas", url: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1000&q=80" }
    ];

    for (let i = artPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [artPool[i], artPool[j]] = [artPool[j], artPool[i]];
    }

    for (let canvasId = 1; canvasId <= 4; canvasId++) {
        const canvasEl = document.getElementById(`canvas-${canvasId}`);
        const labelEl = document.getElementById(`label-${canvasId}`);

        if (canvasEl && labelEl && artPool[canvasId - 1]) {
            const chosenArt = artPool[canvasId - 1];
            canvasEl.style.backgroundImage = `url('${chosenArt.url}')`;
            labelEl.textContent = chosenArt.name;
        }
    }
}

// Monitors users scroll depth and applies visibility matrix
function initTextRevealEngine() {
    const revealTargets = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
        root: null, // Relative to browser screen viewport
        rootMargin: "0px 0px -15% 0px", // Triggers transition slightly before entering full focus
        threshold: 0.1 // Triggers once 10% of element container is seen
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add execution class to trigger crisp hardware accelerated CSS translation
                entry.target.classList.add('visible');
                // Optional: Unobserve element if you only want the animation to trigger once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class if you want the text to hide again when scrolling away
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealTargets.forEach(target => scrollObserver.observe(target));
}