function Slideshow(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error("Không tìm thấy container:", selector);
        return;
    }

    this.slidesWrapper = this.container.querySelector(".slides");
    this.originalSlides = Array.from(this.container.querySelectorAll(".slide"));

    this.settings = Object.assign(
        {
            duration: 500,
            autoplay: true,
            autoplayDelay: 3000,
        },
        options
    );

    this.totalSlides = this.originalSlides.length;
    this.index = 1;
    this.isAnimating = false;
    this.autoPlayInterval = null;

    this.init();
}

Slideshow.prototype.init = function () {
    this._cloneSlides();
    this._createNavButtons();
    this._createPagination();
    this._bindEvents();
    this._updateTransform(false);
    this._startAutoplay();
};

Slideshow.prototype._cloneSlides = function () {
    const firstClone = this.originalSlides[0].cloneNode(true);
    const lastClone = this.originalSlides[this.totalSlides - 1].cloneNode(true);

    this.slidesWrapper.appendChild(firstClone);
    this.slidesWrapper.insertBefore(lastClone, this.slidesWrapper.firstChild);

    this.slides = Array.from(this.container.querySelectorAll(".slide"));
};

Slideshow.prototype._createNavButtons = function () {
    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "nav-btn prev";
    this.prevBtn.innerHTML = "&lt;";

    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "nav-btn next";
    this.nextBtn.innerHTML = "&gt;";

    this.container.appendChild(this.prevBtn);
    this.container.appendChild(this.nextBtn);
};

Slideshow.prototype._createPagination = function () {
    this.pagination = document.createElement("div");
    this.pagination.className = "pagination";

    for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            this.goTo(i + 1);
        });

        this.pagination.appendChild(dot);
    }

    this.container.appendChild(this.pagination);
};

Slideshow.prototype._updatePagination = function () {
    const dots = this.container.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle(
            "active",
            i === (this.index - 1 + this.totalSlides) % this.totalSlides
        );
    });
};

Slideshow.prototype._updateTransform = function (withTransition = true) {
    this.slidesWrapper.style.transition = withTransition
        ? `transform ${this.settings.duration}ms ease`
        : "none";

    this.slidesWrapper.style.transform = `translateX(-${this.index * 100}%)`;
    this._updatePagination();
};

Slideshow.prototype.goTo = function (newIndex) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.index = newIndex;
    this._updateTransform(true);

    setTimeout(() => {
        if (this.index === 0) {
            this.index = this.totalSlides;
            this._updateTransform(false);
        } else if (this.index === this.totalSlides + 1) {
            this.index = 1;
            this._updateTransform(false);
        }
        this.isAnimating = false;
    }, this.settings.duration);
};

Slideshow.prototype._startAutoplay = function () {
    if (!this.settings.autoplay) return;

    this.autoPlayInterval = setInterval(() => {
        this.goTo(this.index + 1);
    }, this.settings.autoplayDelay);
};

Slideshow.prototype._stopAutoplay = function () {
    clearInterval(this.autoPlayInterval);
};

Slideshow.prototype._bindEvents = function () {
    this.prevBtn.addEventListener("click", () => this.goTo(this.index - 1));
    this.nextBtn.addEventListener("click", () => this.goTo(this.index + 1));

    this.container.addEventListener("mouseenter", () => this._stopAutoplay());
    this.container.addEventListener("mouseleave", () => this._startAutoplay());
};
