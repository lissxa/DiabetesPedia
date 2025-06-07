import star_icon from "/src/public/images/icons/star.png";
import starhalf_icon from "/src/public/images/icons/star_half.png";

class CustomerRating extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `          
    <h3 class="fs-5 text-white">Our Customers Say</h3>
      <div
        class="rating d-flex align-items-center gap-3 px-4 py-3 bg-white rounded-3 flex-wrap w-fit-content"
      >
        <p class="rating-category fw-bold fs-4 text-danger">EXCELLENT</p>
        <div
          class="vertical-divider bg-dark-subtle"
          style="height: 2rem"
        ></div>
        <div class="d-flex gap-2 align-items-center">
          <h5 class="fs-3 fw-bold">4.8</h5>
          <div class="star-rating d-flex align-items-center">
            <img width="30" height="30" src="${star_icon}" alt=""/>
            <img width="30" height="30" src="${star_icon}" alt=""/>
            <img width="30" height="30" src="${star_icon}" alt=""/>
            <img width="30" height="30" src="${star_icon}" alt=""/>
            <img width="30" height="30" src="${starhalf_icon}" alt=""/>
          </div>
          <p class="total-ratings text-body-secondary">(1,103 reviews)</p>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("customer-rating", CustomerRating);
