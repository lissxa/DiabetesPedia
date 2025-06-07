class MyJumbotron extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addButtonListener();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
      <div class="jumbotron padding-common py-5 w-100 position-relative z-1 d-flex align-items-center justify-content-center">
        <div class="jumbotron-text-action d-flex flex-column align-items-center gap-4 text-center">
          <h1 class="fw-bold jumbotron-headline">Predict Your Risk of Diabetes Effortlessly</h1>
          <p class="fs-4 fw-semibold">
            Input your health data and receive insights to take charge of your wellness journey
          </p>
          <button class="btn btn-primary fw-semibold btn-lg fs-6" type="button" id="predictButton">
            Start Your Prediction Now
          </button>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }

  addButtonListener() {
    setTimeout(() => {
      const button = this.querySelector("#predictButton");
      if (button) {
        button.addEventListener("click", () => {
          window.location.href = "/log-new-entry";
        });
      }
    }, 100);
  }
}

customElements.define("my-jumbotron", MyJumbotron);
