import star2_icon from "/src/public/images/icons/stars_2.png";

class HomeBanner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
      <div
        class="home-banner-bg bg-image-settings position-absolute top-0 start-0 w-100 h-100 z-0 opacity-10"
      ></div>
      <div class="position-relative d-flex flex-column gap-3 text-center z-1">
        <h2 class="fw-bold text-white mb-0">
          Take Control of Your Health Today
        </h2>
        <p class="text-white">
          Start your journey toward better health today by predicting your
          diabetes risk
        </p>
        
        <div
          class="badge text-bg-light border-secondary-subtle fw-normal text-wrap text-start d-flex gap-3 align-items-center rounded-3 p-3 mt-3 w-fit-content mx-auto bg-opacity-75"
        >
          <img width="30" height="30" src="${star2_icon}" alt=""/>
          <p class="caption">
            900+ customers have already able to empower their health decisions
            with our tools, now it is your turn to feel the benefits
          </p>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("home-banner", HomeBanner);
