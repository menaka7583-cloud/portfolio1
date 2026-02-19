const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const currentFrame = (index) => {
    const frameNumber = index.toString().padStart(3, '0');
    return `frames/ezgif-frame-${frameNumber}.png`;
};

const images = [];
const imageSeq = {
    frame: 0
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame when loaded
images[0].onload = function () {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex));
});

function updateImage(index) {
    const img = images[index];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Resize fix
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateImage(imageSeq.frame);
});
