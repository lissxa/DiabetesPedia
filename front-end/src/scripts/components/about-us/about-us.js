import "../ui-components/big-button";

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
        <section id="about-us-desc" class="padding-common d-flex flex-column align-items-center">
        
        <div class="floating-particle" style="left: 10%; animation-delay: 0s;"></div>
        <div class="floating-particle" style="left: 20%; animation-delay: -3s;"></div>
        <div class="floating-particle" style="left: 30%; animation-delay: -6s;"></div>
        <div class="floating-particle" style="left: 70%; animation-delay: -9s;"></div>
        <div class="floating-particle" style="left: 80%; animation-delay: -12s;"></div>
        <div class="floating-particle" style="left: 90%; animation-delay: -15s;"></div>

        <div class="text-center mb-5 reveal">
            <div class="logo-container">
            <img src="/images/logo/logo_with_text.png" alt="DiabetesPedia Logo" class="mx-auto mb-4" style="max-width: 100px;">
            </div>
            <h2 class="display-4 fw-bold text-gradient-primary mb-4">About DiabetesPedia</h2>
            <div class="divider mx-auto my-4" style="width: 100px; height: 4px; background: linear-gradient(90deg, #4e79ff, #f45a8a);"></div>
            <p class="lead text-muted mt-4" style="max-width: 600px; margin: 0 auto;">
            Empowering lives through intelligent health insights and comprehensive diabetes education
            </p>
        </div>

        <div class="container px-4">
            <div class="row g-4 justify-content-center">
            
            <div class="col-lg-4 col-md-6 reveal" style="animation-delay: 0.2s;">
                <div class="card h-100 border-0 shadow-lg">
                <div class="card-body p-5 text-center">
                    <div class="icon-wrapper mb-4" style="font-size: 3rem; color: #4e79ff;">
                    <i class="fas fa-book-open"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-3" style="color: #2c3e50;">Educational Platform</h3>
                    <p class="mb-0 text-muted" style="line-height: 1.8;">
                    DiabetesPedia is dedicated to helping people understand diabetes risk through comprehensive education. We believe <strong style="color: #4e79ff;">knowledge is the first step</strong> toward a healthier lifestyle.
                    </p>
                </div>
                </div>
            </div>

           
            <div class="col-lg-4 col-md-6 reveal" style="animation-delay: 0.4s;">
                <div class="card h-100 border-0 shadow-lg">
                <div class="card-body p-5 text-center">
                    <div class="icon-wrapper mb-4" style="font-size: 3rem; color: #f45a8a;">
                    <i class="fas fa-chart-line"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-3" style="color: #2c3e50;">Data-Driven Insights</h3>
                    <p class="mb-0 text-muted" style="line-height: 1.8;">
                    Our advanced prediction technology transforms your health data into <strong style="color: #f45a8a;">easy-to-understand insights</strong>, helping you make informed decisions about your wellbeing.
                    </p>
                </div>
                </div>
            </div>

     
            <div class="col-lg-4 col-md-6 reveal" style="animation-delay: 0.6s;">
                <div class="card h-100 border-0 shadow-lg">
                <div class="card-body p-5 text-center">
                    <div class="icon-wrapper mb-4" style="font-size: 3rem; color: #6bbf59;">
                    <i class="fas fa-heartbeat"></i>
                    </div>
                    <h3 class="h4 fw-bold mb-3" style="color: #2c3e50;">Our Mission</h3>
                    <p class="mb-0 text-muted" style="line-height: 1.8;">
                    We empower individuals with <strong style="color: #6bbf59;">reliable information and accessible solutions</strong> to live healthy, productive lives without diabetes concerns.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div class="cta-box text-center mt-5 p-5 rounded-4 reveal" style="max-width: 800px; width: 100%; animation-delay: 0.8s;">
            <h3 class="display-6 fw-bold mb-4" style="color: #2c3e50;">Join Our Wellness Journey!</h3>
            <p class="fs-5 mb-4 text-muted">Take the first step towards better health with DiabetesPedia</p>
        </div>
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
                                    <p class="card-text"><a href="https://www.linkedin.com/in/clarestaratnacong" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-md-6 col-xl-4 about-us">
                        <div class="card p-4 rounded-4 justify-content-end bg-image-settings">
                            <div class="card p-2 rounded-3">
                                <div class="card-body">
                                    <h5 class="card-title fs-3 fw-bolder">Lisa</h5>
                                    <p class="card-text">Front End + Back End Developer</p>
                                    <p class="card-text"><a href="https://www.linkedin.com/in/lisa-ang-516792234" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
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
                                    <p class="card-text"><a href="https://www.linkedin.com/in/mariaawen" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
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
                                    <p class="card-text"><a href="https://www.linkedin.com/in/valenciasutio" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
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
                                    <p class="card-text"><a href="https://www.linkedin.com/in/richellevaniathionanda" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
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

    // Create and configure the big-button
    const button = document.createElement("big-button");
    button.label = "Start Your Assessment Now";
    button.type = "btn-primary";
    button.btnId = "";
    button.btnTagElement = "a";
    button.className = "btn btn-primary shadow-sm p-0";

    this.querySelector(".cta-box").appendChild(button);

    document
      .querySelector("big-button a")
      .setAttribute("href", "/log-new-entry");
  }
}

customElements.define("about-us", AboutUs);
