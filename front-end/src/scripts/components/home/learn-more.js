import play_icon from "/src/public/images/icons/play.png";

class LearnMore extends HTMLElement {
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
        class="linear-gradient-bg blue-gradient-bg position-absolute top-0 start-0 w-100 h-100 z-0"
      ></div>
      <div class="container-fluid p-0 d-flex align-items-center h-100">
        <div class="row row-gap-5 position-relative w-100">
          <div class="col-sm-12 col-md-7 p-0">
            <div
              class="d-flex flex-column z-1 text-white h-100 text-start gap-3"
              id="learn-more-header"
            >
              <h6>
                <span class="badge text-bg-warning fw-semibold px-3 py-2"
                  >Learn More About How It Works</span
                >
              </h6>
              <div id="learn-more-desc h-100">
                <h2 class="fw-bold mb-3" id="learn-more-desc">
                  A Simple Form, Big Insights
                </h2>
                <p>
                  See how easy it is to provide your health data and start
                  your prediction
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center"
            id="play-button-section"
          >
            <div
              class="play-button p-2 bg-white rounded-circle z-2 d-flex align-items-center justify-content-center"
            >
              <img width="42" height="42" src="${play_icon}" alt=""/>
              </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("learn-more", LearnMore);
