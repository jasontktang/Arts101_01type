document.addEventListener("DOMContentLoaded", () => {
    
    const imagesPool = [
        "picture_red01.jpg",
        "picture_red02.jpg",
        "picture_red03.jpg",
        "picture_red04.jpg",
        "picture_red05.jpg"
    ];

    function getShuffledImages(count) {
        let shuffled = [...imagesPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const targetPanes = document.querySelectorAll(".image-pane");
    if (targetPanes.length > 0) {
        const assignedImages = getShuffledImages(targetPanes.length);
        targetPanes.forEach((pane, index) => {
            if (assignedImages[index]) {
                pane.style.backgroundImage = `url('${assignedImages[index]}')`;
            }
        });
    }

    // SCROLL REVEAL OBSERVER
    const revealItems = document.querySelectorAll(".scroll-reveal");
    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px"
        });

        revealItems.forEach(item => revealObserver.observe(item));
    }
});

/* LIGHTBOX MODAL FUNCTIONS */
function openLightbox(imageSrc) {
    const modal = document.getElementById("lightbox");
    const modalImg = document.getElementById("lightbox-img");
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imageSrc;
    }
}

function closeLightbox() {
    const modal = document.getElementById("lightbox");
    if (modal) {
        modal.style.display = "none";
    }
}