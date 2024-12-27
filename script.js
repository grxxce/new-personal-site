
const brain = document.querySelector('.brain');
const headshot = document.querySelector('.headshot');

const prefrontal = document.querySelector('.prefrontal');
const hippo = document.querySelector('.hippocampus');
const parietal = document.querySelector('.parietal');
const temporal = document.querySelector('.temporal');
const occipital = document.querySelector('.occipital');

// Brain regions and their corresponding text anchors
const regions = [
    {
        element: document.querySelector('.prefrontal'),
        anchor: document.querySelector('.now'),
        isAttached: false,
        baseOffset: 45,
        scaleFactor: 0.8,
        leftOffset: 0 
    },
    {
        element: document.querySelector('.hippocampus'),
        anchor: document.querySelector('.past'),
        isAttached: false,
        baseOffset: 40,
        scaleFactor: 0.8,
        leftOffset: 30 
    },
    {
        element: document.querySelector('.temporal'),
        anchor: document.querySelector('.books'),
        isAttached: false,
        baseOffset: 40,
        scaleFactor: 0.8,
        leftOffset: 6   
    },
    {
        element: document.querySelector('.parietal'),
        anchor: document.querySelector('.thoughts'),
        isAttached: false,
        baseOffset: 55,
        scaleFactor: 0.8,
        leftOffset: 16  
    },
    {
        element: document.querySelector('.occipital'),
        anchor: document.querySelector('.art'),
        isAttached: false,
        baseOffset: 46,
        scaleFactor: 0.8,
        leftOffset: 40  
    }
];

function getHeadshotLeftPosition() {
    const headshotRect = headshot.getBoundingClientRect();
    return headshotRect.left;
}

function getResponsiveOffset() {
    const screenWidth = window.innerWidth;
    return 10 + (40 * (screenWidth - 320) / (1920 - 320));
}

function getResponsiveVerticalOffset(baseOffset, scaleFactor) {
    const screenWidth = window.innerWidth;
    const minWidth = 320;
    const maxWidth = 1920;
    
    const screenRatio = (screenWidth - minWidth) / (maxWidth - minWidth);
    const scaledOffset = baseOffset * (0.6 + (screenRatio * 0.4 * scaleFactor));
    
    return Math.max(20, scaledOffset);
}

function getResponsiveLeftOffset(baseLeftOffset) {
    const screenWidth = window.innerWidth;
    const minWidth = 320;
    const maxWidth = 1920;
    
    // Scale the left offset based on screen width
    const screenRatio = (screenWidth - minWidth) / (maxWidth - minWidth);
    return baseLeftOffset * (0.6 + (screenRatio * 0.4));
}

function checkIntersections() {
    const brainRect = brain.getBoundingClientRect();

    regions.forEach(region => {
        if (!region.element || !region.anchor) return;

        const regionRect = region.element.getBoundingClientRect();
        const anchorRect = region.anchor.getBoundingClientRect();
        const verticalOffset = getResponsiveVerticalOffset(region.baseOffset, region.scaleFactor);
        const leftOffset = getResponsiveLeftOffset(region.leftOffset);
        
        if (!region.isAttached && regionRect.top <= brainRect.bottom - verticalOffset) {
            region.isAttached = true;
        } else if (region.isAttached && brainRect.bottom - verticalOffset <= anchorRect.top) {
            region.isAttached = false;
        }
        
        if (region.isAttached) {
            region.element.style.position = 'fixed';
            region.element.style.top = `${brainRect.bottom - verticalOffset}px`;
            region.element.style.left = `${finalLeftPosition + leftOffset}px`;
        } else {
            region.element.style.position = 'fixed';
            region.element.style.left = `${finalLeftPosition + leftOffset}px`;
            region.element.style.top = `${anchorRect.top }px`;
        }
    });
}

function updatePositions() {
    initialPosition = (window.innerWidth - brain.offsetWidth) / 2;
    const offset = getResponsiveOffset();
    finalLeftPosition = getHeadshotLeftPosition() - brain.offsetWidth - offset;
    
    if (window.scrollY === 0) {
        brain.style.left = `${initialPosition}px`;
    } else if (window.scrollY >= maxScroll) {
        brain.style.left = `${finalLeftPosition}px`;
    } else {
        const totalDistance = initialPosition - finalLeftPosition;
        const newPosition = initialPosition - (window.scrollY * (totalDistance / maxScroll));
        brain.style.left = `${newPosition}px`;
    }
    
    checkIntersections();
}

let initialPosition = (window.innerWidth - brain.offsetWidth) / 2;
let finalLeftPosition;

const maxScroll = 80;
brain.style.position = 'fixed';

// Set initial positions for all regions
regions.forEach(region => {
    if (region.element) {
        region.element.style.position = 'fixed';
    }
});

// Initial setup
updatePositions();

// Handle window resize
window.addEventListener('resize', updatePositions);

// Keep track of active text elements
let activeNeuralText = null;
let activeHippoText = null;
let activeFrontalText = null;
let activeOcciText = null;
let activeTempText = null;
let activeParText = null;


// Function to update all text positions
// Function to update all text positions
function updateTextPositions() {
    if (activeNeuralText) {
        const brainRect = brain.getBoundingClientRect();
        const centerX = brainRect.left + (brainRect.width / 2);
        const centerY = brainRect.top + (brainRect.height / 2);
        activeNeuralText.style.left = `${centerX}px`;
        activeNeuralText.style.top = `${centerY - 30}px`;
    }

    if (activeHippoText) {
        const hippoRect = hippo.getBoundingClientRect();
        const centerX = hippoRect.left + (hippoRect.width / 2);
        const centerY = hippoRect.top + (hippoRect.height / 2);
        activeHippoText.style.left = `${centerX - 30}px`;
        activeHippoText.style.top = `${centerY + 15}px`;
    }

    if (activeFrontalText) {
        const frontalRect = prefrontal.getBoundingClientRect();
        const centerX = frontalRect.left + (frontalRect.width / 2);
        const centerY = frontalRect.top + (frontalRect.height / 2);
        activeFrontalText.style.left = `${centerX - 26}px`;
        activeFrontalText.style.top = `${centerY + 15}px`;
    }

    if (activeOcciText) {
        const occiRect = occipital.getBoundingClientRect();
        const centerX = occiRect.left + (occiRect.width / 2);
        const centerY = occiRect.top + (occiRect.height / 2);
        activeOcciText.style.left = `${centerX - 10}px`;
        activeOcciText.style.top = `${centerY+20}px`;
    }

    if (activeTempText) {
        const tempRect = temporal.getBoundingClientRect();
        const centerX = tempRect.left + (tempRect.width / 2);
        const centerY = tempRect.top + (tempRect.height / 2);
        activeTempText.style.left = `${centerX - 30}px`;
        activeTempText.style.top = `${centerY + 15}px`;
    }

    if (activeParText) {
        const parRect = parietal.getBoundingClientRect();
        const centerX = parRect.left + (parRect.width / 2);
        const centerY = parRect.top + (parRect.height / 2);
        activeParText.style.left = `${centerX - 20}px`;
        activeParText.style.top = `${centerY - 20}px`;
    }
}

// Update brain click handler
brain.addEventListener('click', () => {
    if (activeNeuralText) {
        activeNeuralText.remove();
    }
    
    const neuralText = document.createElement('div');
    neuralText.textContent = 'my neural net';
    neuralText.style.position = 'fixed';
    neuralText.style.fontSize = '16px';
    neuralText.style.color = '#1f2937';
    neuralText.style.zIndex = '1000';
    neuralText.style.transform = 'translate(-50%, -50%)';
    neuralText.style.opacity = '0';
    neuralText.style.transition = 'opacity 0.3s ease-in-out';
    
    const container = brain.parentElement;
    container.style.position = 'relative';
    container.appendChild(neuralText);
    
    activeNeuralText = neuralText;
    updateTextPositions();
    
    // Fade in
    requestAnimationFrame(() => {
        neuralText.style.opacity = '1';
    });
    
    setTimeout(() => {
        if (activeNeuralText === neuralText) {
            neuralText.style.opacity = '0';
            setTimeout(() => {
                if (activeNeuralText === neuralText) {
                    activeNeuralText = null;
                }
                neuralText.remove();
            }, 300);
        }
    }, 1700);
});

// Update hippo click handler
hippo.addEventListener('click', () => {
    if (activeHippoText) {
        activeHippoText.remove();
    }
    
    const hippoText = document.createElement('div');
    hippoText.textContent = 'hippocampus';
    hippoText.style.position = 'fixed';
    hippoText.style.fontSize = '16px';
    hippoText.style.color = '#1f2937';
    hippoText.style.zIndex = '1000';
    hippoText.style.opacity = '0';
    hippoText.style.transition = 'opacity 0.3s ease-in-out';
    
    const container = brain.parentElement;
    container.style.position = 'relative';
    container.appendChild(hippoText);
    
    activeHippoText = hippoText;
    updateTextPositions();
    
    // Fade in
    requestAnimationFrame(() => {
        hippoText.style.opacity = '1';
    });
    
    setTimeout(() => {
        if (activeHippoText === hippoText) {
            hippoText.style.opacity = '0';
            setTimeout(() => {
                if (activeHippoText === hippoText) {
                    activeHippoText = null;
                }
                hippoText.remove();
            }, 300);
        }
    }, 1700);
});

// Prefrontal click handler
prefrontal.addEventListener('click', () => {
    if (activeFrontalText) {
        activeFrontalText.remove();
    }
    
    const frontalText = document.createElement('div');
    frontalText.textContent = 'prefrontal';
    frontalText.style.position = 'fixed';
    frontalText.style.fontSize = '16px';
    frontalText.style.color = '#1f2937';
    frontalText.style.zIndex = '1000';
    frontalText.style.opacity = '0';
    frontalText.style.transition = 'opacity 0.3s ease-in-out';
    
    const container = brain.parentElement;
    container.style.position = 'relative';
    container.appendChild(frontalText);
    
    activeFrontalText = frontalText;
    updateTextPositions();
    
    requestAnimationFrame(() => {
        frontalText.style.opacity = '1';
    });
    
    setTimeout(() => {
        if (activeFrontalText === frontalText) {
            frontalText.style.opacity = '0';
            setTimeout(() => {
                if (activeFrontalText === frontalText) {
                    activeFrontalText = null;
                }
                frontalText.remove();
            }, 300);
        }
    }, 1700);
});

// Temporal click handler
temporal.addEventListener('click', () => {
    if (activeTempText) {
        activeTempText.remove();
    }
    
    const tempText = document.createElement('div');
    tempText.textContent = 'temporal';
    tempText.style.position = 'fixed';
    tempText.style.fontSize = '16px';
    tempText.style.color = '#1f2937';
    tempText.style.zIndex = '1000';
    tempText.style.opacity = '0';
    tempText.style.transition = 'opacity 0.3s ease-in-out';
    
    const container = brain.parentElement;
    container.style.position = 'relative';
    container.appendChild(tempText);
    
    activeTempText = tempText;
    updateTextPositions();
    
    requestAnimationFrame(() => {
        tempText.style.opacity = '1';
    });
    
    setTimeout(() => {
        if (activeTempText === tempText) {
            tempText.style.opacity = '0';
            setTimeout(() => {
                if (activeTempText === tempText) {
                    activeTempText = null;
                }
                tempText.remove();
            }, 300);
        }
    }, 1700);
});

// Parietal click handler
parietal.addEventListener('click', () => {
    if (activeParText) {
        activeParText.remove();
    }
    
    const parText = document.createElement('div');
    parText.textContent = 'parietal';
    parText.style.position = 'fixed';
    parText.style.fontSize = '16px';
    parText.style.color = '#1f2937';
    parText.style.zIndex = '1000';
    parText.style.opacity = '0';
    parText.style.transition = 'opacity 0.3s ease-in-out';
    
    const container = brain.parentElement;
    container.style.position = 'relative';
    container.appendChild(parText);
    
    activeParText = parText;
    updateTextPositions();
    
    requestAnimationFrame(() => {
        parText.style.opacity = '1';
    });
    
    setTimeout(() => {
        if (activeParText === parText) {
            parText.style.opacity = '0';
            setTimeout(() => {
                if (activeParText === parText) {
                    activeParText = null;
                }
                parText.remove();
            }, 300);
        }
    }, 1700);
});

// Occipital click handler
occipital.addEventListener('click', () => {
    if (activeOcciText) {
        activeOcciText.remove();
    }
    
    const occiText = document.createElement('div');
    occiText.textContent = 'occipital';
    occiText.style.position = 'fixed';
    occiText.style.fontSize = '16px';
    occiText.style.color = '#1f2937';
    occiText.style.zIndex = '1000';
    occiText.style.opacity = '0';
    occiText.style.transition = 'opacity 0.3s ease-in-out';
    
    const container = brain.parentElement;
    container.style.position = 'relative';
    container.appendChild(occiText);
    
    activeOcciText = occiText;
    updateTextPositions();
    
    requestAnimationFrame(() => {
        occiText.style.opacity = '1';
    });
    
    setTimeout(() => {
        if (activeOcciText === occiText) {
            occiText.style.opacity = '0';
            setTimeout(() => {
                if (activeOcciText === occiText) {
                    activeOcciText = null;
                }
                occiText.remove();
            }, 300);
        }
    }, 1700);
});

// Update the scroll handler to include text position updates
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition <= maxScroll) {
        const totalDistance = initialPosition - finalLeftPosition;
        const newPosition = initialPosition - (scrollPosition * (totalDistance / maxScroll));
        brain.style.left = `${newPosition}px`;
    } else {
        brain.style.left = `${finalLeftPosition}px`;
    }
    
    checkIntersections();
    updateTextPositions(); // Add this line to update text positions during scroll
});

// Update resize handler to include text position updates
window.addEventListener('resize', () => {
    updatePositions();
    updateTextPositions(); // Add this line to update text positions during resize
});