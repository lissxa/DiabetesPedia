class TheFeatures extends HTMLElement {
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
        class="d-flex flex-column z-1 justify-content-between h-100 text-center gap-2"
      >
        <h6>
          <span class="badge text-bg-warning fw-semibold px-3 py-2"
            >The Features</span
          >
        </h6>
        <div class="d-flex flex-column gap-2">
          <h2 class="fw-bold">More Than Just Predictions</h2>
          <p>
            Explore the tools that make managing your health easier and more
            effective
          </p>
        </div>
      </div>
      <div class="d-grid gap-4" id="the-features-content">
        <div class="card p-3 rounded-4 border-0">
          <div class="card-body d-flex flex-column gap-2">
            <h3 class="card-title fs-3 fw-bolder">Log Your Data</h3>
            <p class="card-text">
              Track your health over time with simple form entries
            </p>
          </div>
          <div class="h-100 d-flex align-items-center justify-content-center">
            <img
              src="src/public/images/homepage/feature-01.gif"
              class="feature-gif card-img-bottom"
              alt=""
            />
          </div>
        </div>
        <div class="card p-3 rounded-4 border-0">
          <div class="card-body order-2 d-flex flex-column gap-2">
            <h3 class="card-title fs-3 fw-bolder">View Your History</h3>
            <p class="card-text">
              Review past entries and see trends in your prediction
            </p>
          </div>
          <div class="h-100 d-flex align-items-center justify-content-center">
            <img
              src="src/public/images/homepage/feature-02.gif"
              class="feature-gif card-img-bottom order-1"
              alt=""
            />
          </div>
        </div>
        <div class="card p-3 rounded-4 border-0">
          <div class="card-body order-2 d-flex flex-column gap-2">
            <h3 class="card-title fs-3 fw-bolder">Set reminders</h3>
            <p class="card-text">
              Get notified for logging with customizable notifications
            </p>
          </div>
          <div class="h-100 d-flex align-items-center justify-content-center">
            <img
              src="src/public/images/homepage/feature-03.gif"
              class="feature-gif card-img-bottom order-1"
              alt=""
            />
          </div>
        </div>
        <div class="card p-3 rounded-4 border-0">
          <div class="card-body d-flex flex-column gap-2">
            <h3 class="card-title fs-3 fw-bolder">Learn From Experts</h3>
            <p class="card-text">
              Explore blogs about diabetes care and prevention
            </p>
          </div>
          <div class="h-100 d-flex align-items-center justify-content-center">
            <img
              src="src/public/images/homepage/feature-04.gif"
              class="feature-gif card-img-bottom"
              alt=""
            />
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("the-features", TheFeatures);
