class ContactUs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="padding-common">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="text-center mb-5">
                <h2 class="fw-bold text-dark mb-3">Get in touch!</h2>
                <p class="text-muted">
                  We love hearing from you. Please feel free to contact us if you have any questions, suggestions or need assistance.
                </p>
              </div>

              <div class="card shadow-sm border-0 mb-5">
                <div class="card-body p-4">
                  <form id="contactForm">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="firstName" class="form-label fw-semibold">
                          <i class="bi bi-person-fill me-2 text-primary"></i>First Name
                        </label>
                        <input type="text" class="form-control" id="firstName" required>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="lastName" class="form-label fw-semibold">
                          <i class="bi bi-person-fill me-2 text-primary"></i>Last Name
                        </label>
                        <input type="text" class="form-control" id="lastName">
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <label for="email" class="form-label fw-semibold">
                        <i class="bi bi-envelope-fill me-2 text-primary"></i>Email
                      </label>
                      <input type="email" class="form-control" id="email" required>
                    </div>
                    
                    <div class="mb-3">
                      <label for="phone" class="form-label fw-semibold">
                        <i class="bi bi-telephone-fill me-2 text-primary"></i>Phone Number
                      </label>
                      <input type="tel" class="form-control" id="phone">
                    </div>
                    
                    <div class="mb-3">
                      <label for="subject" class="form-label fw-semibold">
                        <i class="bi bi-chat-dots-fill me-2 text-primary"></i>Subject
                      </label>
                      <select class="form-select" id="subject" required>
                        <option value="">Select...</option>
                        <option value="general">General Questions</option>
                        <option value="technical">Technical Support</option>
                        <option value="feedback">Suggestions & Feedback</option>
                        <option value="partnership">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div class="mb-4">
                      <label for="message" class="form-label fw-semibold">
                        <i class="bi bi-chat-text-fill me-2 text-primary"></i>Message
                      </label>
                      <textarea class="form-control" id="message" rows="5" required 
                        placeholder="Write your message here..."></textarea>
                    </div>
                    
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary btn-lg px-5">
                        <i class="bi bi-send-fill me-2"></i>Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div class="row g-4 mb-5">
                <div class="col-md-4">
                  <div class="card h-100 border-0 shadow-sm text-center">
                    <div class="card-body p-4">
                      <div class="mb-3">
                        <i class="bi bi-geo-alt-fill text-primary" style="font-size: 2rem;"></i>
                      </div>
                      <h5 class="card-title fw-bold">Address</h5>
                      <p class="card-text text-muted">
                        Medan, Sumatera Utara<br>
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4">
                  <div class="card h-100 border-0 shadow-sm text-center">
                    <div class="card-body p-4">
                      <div class="mb-3">
                        <i class="bi bi-envelope-fill text-primary" style="font-size: 2rem;"></i>
                      </div>
                      <h5 class="card-title fw-bold">Email</h5>
                      <p class="card-text text-muted">
                        <a href="mailto:info@diabetespedia.com" class="text-decoration-none">
                          info@diabetespedia.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4">
                  <div class="card h-100 border-0 shadow-sm text-center">
                    <div class="card-body p-4">
                      <div class="mb-3">
                        <i class="bi bi-clock-fill text-primary" style="font-size: 2rem;"></i>
                      </div>
                      <h5 class="card-title fw-bold">Service Hours</h5>
                      <p class="card-text text-muted">
                        Monday - Friday<br>
                        09:00 - 17:00 WIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card border-0 shadow-sm bg-light">
                <div class="card-body p-4 text-center">
                  <h5 class="fw-bold mb-3">
                    <i class="bi bi-code-slash text-primary me-2"></i>DiabetesPedia
                  </h5>
                  <p class="text-muted mb-3">
                    DiabetesPedia was developed with a dedication to provide the best information about diabetes and health.
                  </p>
                  <div class="d-flex justify-content-center gap-3">
                    <a href="https://github.com/lissxa/DiabetesPedia" 
                       target="_blank" 
                       class="btn btn-outline-dark">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initializeContactForm();
  }

  initializeContactForm() {
    const form = this.querySelector("#contactForm");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }
  }

  handleFormSubmit() {
    const firstName = this.querySelector("#firstName").value.trim();
    const lastName = this.querySelector("#lastName").value.trim();
    const email = this.querySelector("#email").value.trim();
    const phone = this.querySelector("#phone").value.trim();
    const subject = this.querySelector("#subject").value;
    const message = this.querySelector("#message").value.trim();

    if (!firstName || !email || !subject || !message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please complete all required fields!",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="bi bi-hourglass-split me-2"></i>Sending...';

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: `Thank you ${firstName}! Your message has been sent successfully. We will contact you soon.`,
        confirmButtonColor: "#0d6efd",
      }).then(() => {
        this.querySelector("#contactForm").reset();
      });

      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }, 2000);
  }
}

customElements.define("contact-us", ContactUs);
