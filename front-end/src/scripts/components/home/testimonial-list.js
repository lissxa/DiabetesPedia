import "./testimonial-card.js";

class TestimonialList extends HTMLElement {
  constructor() {
    super();
  }

  set testimonials(testimonials) {
    this._testimonials = testimonials;
    this.render();
  }

  render() {
    this.innerHTML = ""; // light DOM clear
    this._testimonials.forEach((testimonial, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item";
      if (index === 0) carouselItem.classList.add("active");
      carouselItem.setAttribute("data-bs-interval", "5000");

      const card = document.createElement("testimonial-card");
      card.testimonial = testimonial;

      carouselItem.appendChild(card);
      this.appendChild(carouselItem);
    });
  }
}

customElements.define("testimonial-list", TestimonialList);
