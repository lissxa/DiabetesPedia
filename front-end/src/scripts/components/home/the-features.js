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
      
      
      <div class="row g-4" id="the-features-content">
        <div class="col-md-6">
          <div class="card feature-card p-4 rounded-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 rounded-3" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                <i class="bi bi-clipboard-data feature-icon text-white" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h4 class="card-title fw-bold mb-1" style="color: #1e40af;">Log Your Data</h4>
                <p class="card-text mb-0 text-muted">
                  Track your health metrics with simple form entries
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card feature-card p-4 rounded-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 rounded-3" style="background: linear-gradient(135deg, #06b6d4, #0891b2);">
                <i class="bi bi-graph-up feature-icon text-white" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h4 class="card-title fw-bold mb-1" style="color: #0891b2;">View Your History</h4>
                <p class="card-text mb-0 text-muted">
                  Review past entries and analyze your health trends
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card feature-card p-4 rounded-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 rounded-3 pulse-animation" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
                <i class="bi bi-lightbulb feature-icon text-white" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h4 class="card-title fw-bold mb-1" style="color: #7c3aed;">Get Smart Insights</h4>
                <p class="card-text mb-0 text-muted">
                  Receive AI-powered health recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card feature-card p-4 rounded-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 rounded-3" style="background: linear-gradient(135deg, #10b981, #059669);">
                <i class="bi bi-shield-check feature-icon text-white" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h4 class="card-title fw-bold mb-1" style="color: #059669;">Risk Assessment</h4>
                <p class="card-text mb-0 text-muted">
                  Get personalized diabetes risk evaluation
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card feature-card p-4 rounded-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 rounded-3" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                <i class="bi bi-book feature-icon text-white" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h4 class="card-title fw-bold mb-1" style="color: #d97706;">Learn From Experts</h4>
                <p class="card-text mb-0 text-muted">
                  Access curated articles about diabetes prevention
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card feature-card p-4 rounded-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 rounded-3" style="background: linear-gradient(135deg, #ec4899, #db2777);">
                <i class="bi bi-heart-pulse feature-icon text-white" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h4 class="card-title fw-bold mb-1" style="color: #db2777;">Health Monitoring</h4>
                <p class="card-text mb-0 text-muted">
                  Monitor vital signs and health indicators
                </p>
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

customElements.define("the-features", TheFeatures);
