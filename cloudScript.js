const drifters = ["assets/airborneDrifters/cloud1.png","assets/airborneDrifters/cloud2.png"];

const activeHeights = [];

function createDrifter(progress = 0) {

    // Pick a random image
    const randomImage =
        drifters[Math.floor(Math.random() * drifters.length)];

    // Create an <img> element
    const drifter = document.createElement("img");

    drifter.src = randomImage;
    drifter.classList.add("airborne-drifter");


    // Random vertical position
    let height;
    do { height = Math.random() * 75 - 15; }
    while (activeHeights.some(h => Math.abs(h - height) < 15));
    activeHeights.push(height);
    drifter.style.top = height + "%";


    // Random crossing speed: 40–80 seconds
    const duration = 70 + Math.random() * 40;

    const driftDelay = -(duration * progress)

    // Random bob height between 15px and 50px
    const bobHeight = 15 + Math.random() * 20;

    drifter.style.setProperty( "--bob-height", `${bobHeight}px`);


    // Random bob speed between 3 and 7 seconds
    const bobSpeed = 20 + Math.random() * 5;


    // Start each drifter at a different point in its bob cycle
    const bobDelay = -(Math.random() * bobSpeed);

    drifter.style.animationDelay =`${driftDelay}s, ${bobDelay}s`;



    drifter.style.animationDuration = `${duration}s, ${bobSpeed}s`;


    // Put it on the page
    document.body.appendChild(drifter);


    // Delete it after it crosses the screen
    setTimeout(() => {
        drifter.remove();
        activeHeights.splice(activeHeights.indexOf(height), 1);
    }, duration *(1- progress)* 1000);
}


// Create a new drifter every 8 seconds
setInterval(createDrifter, 30000);

// Make one immediately
createDrifter(0);
createDrifter(0.30);
createDrifter(0.60);