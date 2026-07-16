document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EXACT POOL OF VALID FILENAMES (Matches your actual upload case details)
    const imagesPool = [
        "picture_red07.jpg",
        "picture_red02.jpg",
        "picture_red03.jpg",
        "picture_red04.jpg",
        "picture_red05.jpg"
    ];

    // Helper engine to pick a random file without repeating elements on the same load
    function getShuffledImages(count) {
        let shuffled = [...imagesPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Grab all 3 image slots on your homepage
    const targetPanes = document.querySelectorAll(".image-pane");
    const assignedImages = getShuffledImages(targetPanes.length);

    // Inject backgrounds safely into your 50/50 grid boxes
    targetPanes.forEach((pane, index) => {
        if (assignedImages[index]) {
            pane.style.backgroundImage = `url('${assignedImages[index]}')`;
        }
    });

    // 2. SCROLL REVEAL INTERSECTION HANDLER FOR TEXT ELEMENTS
    const revealItems = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.15, // Triggers when 15% of the card peeks onto screen
        rootMargin: "0px 0px -50px 0px" // Slight bottom offset for dynamic snap feeling
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });
});