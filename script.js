let highestZ = 1;

class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    touchMoveX = 0;
    touchMoveY = 0;
    prevTouchX = 0;
    prevTouchY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;
    
    init(paper) {
        // Event listeners for both mouse and touch events
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleRelease.bind(this));
        paper.addEventListener('mousedown', this.handleHold.bind(this));
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleRelease.bind(this), { passive: false });
        paper.addEventListener('touchstart', this.handleHold.bind(this), { passive: false });
        
        paper.style.zIndex = highestZ;
        highestZ += 1;
    }
    
    handleMove(e) {
        if (!this.holdingPaper || this.rotating) return;

        if (e.type === 'mousemove') {
            this.touchMoveX = e.clientX;
            this.touchMoveY = e.clientY;
        } else if (e.type === 'touchmove') {
            this.touchMoveX = e.touches[0].clientX;
            this.touchMoveY = e.touches[0].clientY;
        }

        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;
    }
    
    handleHold(e) {
        if (this.holdingPaper) return;
        this.holdingPaper = true;
        if (e.type === 'mousedown') {
            this.touchStartX = e.clientX;
            this.touchStartY = e.clientY;
            this.prevTouchX = this.touchStartX;
            this.prevTouchY = this.touchStartY;
        } else if (e.type === 'touchstart') {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.prevTouchX = this.touchStartX;
            this.prevTouchY = this.touchStartY;
        }
        this.rotating = (e.type === 'contextmenu');
    }
    
    handleRelease() {
        this.holdingPaper = false;
        this.rotating = false;
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
