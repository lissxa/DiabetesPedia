class MyFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `          
      <div>
          <div class="row row-gap-4">
              <div class="col-sm-12 col-md-6">
              <div class="d-flex flex-column justify-content-between gap-4 h-100">
                  <h6 class="fs-5">
                  Empowering you with personalized tools to take control of your
                  health journey
                  </h6>
                  <div class="horizontal-divider bg-body-secondary"></div>
                  <div class="city-copyright">
                  <p>Medan, Indonesia</p>
                  <p>&copy DiabetesPedia 2025. All right reserved</p>
                  </div>
              </div>
              </div>
              <div class="col-sm-12 col-md-6">
              <div class="footer-links d-flex gap-5 d-flex justify-content-end">
                  <div id="learn-more-links">
                    <h5 class="footer-link-title text-secondary text-uppercase">
                        Learn More
                    </h5>
                    <ul class="navbar-nav me-auto my-2 mb-lg-0 d-flex flex-column gap-2">
                        <li class="nav-item">
                          <a class="nav-link" href="/about-us">About Us</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="/blog">Blogs</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="/contact-us">Contact Us</a>
                        </li>
                    </ul>
                  </div>

                  <div id="follow-us-links">
                    <h5 class="footer-link-title text-secondary text-uppercase">
                        Follow Us
                    </h5>
                    <ul class="navbar-nav me-auto my-2 mb-lg-0 d-flex flex-column gap-2">
                        <li class="nav-item">
                          <a class="nav-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">Youtube</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                        </li>
                    </ul>
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

customElements.define("my-footer", MyFooter);
