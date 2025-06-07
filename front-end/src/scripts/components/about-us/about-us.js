class AboutUs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
        <section id="about-us-desc" class="padding-common d-flex flex-column gap-3">
            <img src="src/public/images/logo/big logo.png" alt="" class="mx-auto">
            <p class="text-center fs-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </section>
        <section id="about-us-team" class="padding-common mt-5 d-flex flex-column gap-5">
            <h2 class="fw-bold text-center">Meet The Team</h2>
            <div class="container">
                <div class="row row-gap-4 justify-content-center">
                    <div class="col-sm-12 col-md-6 col-xl-4 about-us">
                        <div class="card p-4 rounded-4 justify-content-end bg-image-settings">
                            <div class="card p-2 rounded-3">
                                <div class="card-body">
                                    <h5 class="card-title fs-3 fw-bolder">Claresta Ratna Cong</h5>
                                    <p class="card-text">UI/UX Designer + Front End Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-md-6 col-xl-4 about-us">
                        <div class="card p-4 rounded-4 justify-content-end bg-image-settings">
                            <div class="card p-2 rounded-3">
                                <div class="card-body">
                                    <h5 class="card-title fs-3 fw-bolder">Lisa</h5>
                                    <p class="card-text">Front End Developer + Back End Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-md-6 col-xl-4 about-us">
                        <div class="card p-4 rounded-4 justify-content-end bg-image-settings">
                            <div class="card p-2 rounded-3">
                                <div class="card-body">
                                    <h5 class="card-title fs-3 fw-bolder">Maria Stephanie R.</h5>
                                    <p class="card-text">Machine Learning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-md-6 col-xl-4 about-us">
                        <div class="card p-4 rounded-4 justify-content-end bg-image-settings">
                            <div class="card p-2 rounded-3">
                                <div class="card-body">
                                    <h5 class="card-title fs-3 fw-bolder">Valencia Sutio</h5>
                                    <p class="card-text">Machine Learning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-md-6 col-xl-4 about-us">
                        <div class="card p-4 rounded-4 justify-content-end bg-image-settings">
                            <div class="card p-2 rounded-3">
                                <div class="card-body">
                                    <h5 class="card-title fs-3 fw-bolder">Richelle Vania T.</h5>
                                    <p class="card-text">Machine Learning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("about-us", AboutUs);
