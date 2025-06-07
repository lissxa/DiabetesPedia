class TestimonialCard extends HTMLElement {
  constructor() {
    super();
  }

  set testimonial(testimonial) {
    this._testimonial = testimonial;
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `

        <div class="card bg-white rounded-4 border-0 p-3" id="${this._testimonial.id}">
            <div class="card-body d-flex flex-column gap-4">
                <p class="card-text">"${this._testimonial.review}"</p>
                <div class="horizontal-divider bg-body-secondary"></div>
                <h5 class="card-title fw-bolder fs-4">${this._testimonial.name}</h5>
            </div>
        </div>
    `;
    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("testimonial-card", TestimonialCard);
