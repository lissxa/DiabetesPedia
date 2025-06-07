class TheSteps extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
      <div class="d-flex flex-column text-center gap-2">
        <h6>
          <span class="badge text-bg-warning fw-semibold px-3 py-2"
            >The Steps</span
          >
        </h6>
        <h2 class="fw-bold">How It Works</h2>
        <p>
          Understand how our tool works in three simple steps to predict your
          diabetes risk
        </p>
      </div>
      <div class="container-fluid p-0">
        <div class="row row-gap-5" id="the-steps-content">
          <div class="col-sm-12 col-md-4">
            <div class="card bg-white rounded-4 border-0 p-3 h-100">
              <div
                class="step-number bg-primary text-white fs-3 rounded-circle d-flex align-items-center justify-content-center fw-medium position-absolute top-0 end-0 border border-5"
              >
                01
              </div>
              <div class="card-body d-flex flex-column gap-4">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/material-rounded/24/task.png"
                  alt="task"
                />
                <div class="d-flex flex-column gap-2">
                  <h3 class="card-title fs-3 fw-bolder">
                    Input Your Health Information
                  </h3>
                  <p class="card-text fs-6">
                    Fill out a simple form with basic health details
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div class="card bg-white rounded-4 border-0 p-3 h-100">
              <div
                class="step-number bg-primary text-white fs-3 rounded-circle d-flex align-items-center justify-content-center fw-medium position-absolute top-0 end-0 border border-5"
              >
                02
              </div>
              <div class="card-body d-flex flex-column gap-4">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/ios-filled/50/diabetes-monitor.png"
                  alt="diabetes-monitor"
                />
                <div class="d-flex flex-column gap-2">
                  <h3 class="card-title fs-3 fw-bolder">Get Your Results</h3>
                  <p class="card-text fs-6">
                    Receive a prediction of your diabetes risk in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div class="card bg-white rounded-4 border-0 p-3 h-100">
              <div
                class="step-number bg-primary text-white fs-3 rounded-circle d-flex align-items-center justify-content-center fw-medium position-absolute top-0 end-0 border border-5"
              >
                03
              </div>
              <div class="card-body d-flex flex-column gap-4">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/material-rounded/24/ingredients-list.png"
                  alt="ingredients-list"
                />
                <div class="d-flex flex-column gap-2">
                  <h3 class="card-title fs-3 fw-bolder">Take Action</h3>
                  <p class="card-text fs-6">
                    Access resources, set reminders, and log progress to stay
                    proactive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("the-steps", TheSteps);
