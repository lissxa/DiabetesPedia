import "../../ui-components/big-button";
class MyJumbotron extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addButtonListener();
  }

  render() {
    const button = document.createElement("big-button");
    button.label = "Start Your Prediction Now";
    button.type = "btn-primary";
    button.btnId = "predictButton";
    button.btnTagElement = "button";

    const container = document.createElement("div");
    container.className =
      "jumbotron padding-common py-5 w-100 position-relative z-1 d-flex align-items-center justify-content-center";

    container.innerHTML = `
      <div class="jumbotron padding-common py-5 w-100 position-relative z-1 d-flex align-items-center justify-content-center" id="jumbotron-btn">
        <div class="jumbotron-text-action d-flex flex-column align-items-center gap-4 text-center">
          <div class="title-animation-container">
            <h1 class="fw-bold jumbotron-headline title-animation split-text-animation">Predict Your Risk of Diabetes <span class="position-relative bg-warning bg-animation">Effortlessly<span class="bg-warning"></h1>
          </div>
          <div class="title-animation-container">
            <p class="fs-4 fw-semibold title-animation text-animation">
            Input your health data and receive insights to take charge of your wellness journey
          </p>
          </div>
        </div>
      </div>
    `;

    const textAction = container.querySelector(".jumbotron-text-action");
    textAction.appendChild(button);

    this.innerHTML = "";
    this.appendChild(container);
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
