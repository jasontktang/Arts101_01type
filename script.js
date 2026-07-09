document.addEventListener("DOMContentLoaded", () => {
    setupInfiniteScroll();
});

function setupInfiniteScroll() {
    const track = document.getElementById("artTrack");
    if (!track) return;

    // Duplicate standard items dynamically to facilitate perfect calculation-based wrapping
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollSpeed = 0.6; // Speed density configuration
    let currentY = 0;
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            currentY -= scrollSpeed;
            if (Math.abs(currentY) >= (track.scrollHeight / 2)) {
                currentY = 0;
            }
            track.style.transform = `translateY(${currentY}px)`;
        }
        requestAnimationFrame(animate);
    }

    track.addEventListener("mouseenter", () => isPaused = true);
    track.addEventListener("mouseleave", () => isPaused = false);

    requestAnimationFrame(animate);
}