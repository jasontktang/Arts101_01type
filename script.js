document.addEventListener("DOMContentLoaded", () => {
    setupInfiniteScroll();
});

function setupInfiniteScroll() {
    const track = document.getElementById("artTrack");
    if (!track) return;

    // 1. Automatically clone the elements to ensure a perfect, seamless loop illusion
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    // 2. Set structural scrolling configuration variables
    let scrollSpeed = 0.6; // Higher number means faster auto-scroll speed
    let currentY = 0;
    let isPaused = false;

    // Calculate halfway point where loop safely resets instantly
    const getResetPoint = () => {
        // Total height of track divided by 2 (since we duplicated everything)
        return track.scrollHeight / 2;
    };

    // 3. High-performance Animation Loop
    function animate() {
        if (!isPaused) {
            currentY -= scrollSpeed;
            
            // If scrolled past original set, snap cleanly back to index 0
            if (Math.abs(currentY) >= getResetPoint()) {
                currentY = 0;
            }
            
            track.style.transform = `translateY(${currentY}px)`;
        }
        requestAnimationFrame(animate);
    }

    // 4. Pause interactions when browsing or hovering individual drawings
    track.addEventListener("mouseenter", () => isPaused = true);
    track.addEventListener("mouseleave", () => isPaused = false);

    // Initialize the engine loop
    requestAnimationFrame(animate);
}