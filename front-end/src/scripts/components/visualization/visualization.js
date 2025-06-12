class Visualization extends HTMLElement {
  constructor() {
    super();
    this.visualizations = [
      {
        id: 1,
        title: "Age Distribution Analysis",
        description:
          "Statistical analysis of age distribution patterns in the dataset",
        image: "/images/visualization/distribusi_age.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Statistical Analysis",
      },
      {
        id: 2,
        title: "Blood Glucose Level Distribution",
        description:
          "Distribution analysis of blood glucose levels across different patient groups",
        image: "/images/visualization/distribusi_blood_glucose_level.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Histogram Analysis",
      },
      {
        id: 3,
        title: "BMI Distribution Pattern",
        description:
          "Body Mass Index distribution visualization and health categorization",
        image: "/images/visualization/distribusi_bmi.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Statistical Distribution",
      },
      {
        id: 4,
        title: "Gender Distribution Overview",
        description:
          "Gender-based distribution analysis in diabetes patient data",
        image: "/images/visualization/distribusi_gender.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Categorical Analysis",
      },
      {
        id: 5,
        title: "Gender-Based Diabetes Analysis",
        description:
          "Correlation analysis between gender and diabetes occurrence rates",
        image:
          "/images/visualization/distribusi_gender_berdasarkan_diabetes.png",
        category: "Correlation",
        date: "2025-06-12",
        modelType: "Cross-tabulation Analysis",
      },
      {
        id: 6,
        title: "HbA1c Level Distribution",
        description:
          "Hemoglobin A1c level distribution patterns for diabetes monitoring",
        image: "/images/visualization/distribusi_hba1c_level.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Medical Parameter Analysis",
      },
      {
        id: 7,
        title: "Heart Disease Distribution",
        description:
          "Distribution analysis of heart disease prevalence in the patient population",
        image: "/images/visualization/distribusi_heart_disease.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Medical Condition Analysis",
      },
      {
        id: 8,
        title: "Heart Disease vs Diabetes Correlation",
        description:
          "Correlation study between heart disease and diabetes occurrence",
        image:
          "/images/visualization/distribusi_heart_disease_berdasarkan_diabetes.png",
        category: "Correlation",
        date: "2025-06-12",
        modelType: "Medical Correlation Analysis",
      },
      {
        id: 9,
        title: "Hypertension Distribution Analysis",
        description:
          "Statistical distribution of hypertension cases in the dataset",
        image: "/images/visualization/distribusi_hypertension.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Cardiovascular Analysis",
      },
      {
        id: 10,
        title: "Hypertension-Diabetes Relationship",
        description:
          "Analysis of hypertension distribution based on diabetes status",
        image:
          "/images/visualization/distribusi_hypertension_berdasarkan_diabetes.png",
        category: "Correlation",
        date: "2025-06-12",
        modelType: "Comorbidity Analysis",
      },
      {
        id: 11,
        title: "Smoking History Distribution",
        description:
          "Distribution analysis of smoking history patterns among patients",
        image: "/images/visualization/distribusi_smoking_history.png",
        category: "Distribution",
        date: "2025-06-12",
        modelType: "Lifestyle Factor Analysis",
      },
      {
        id: 12,
        title: "Smoking History vs Diabetes",
        description:
          "Correlation between smoking history and diabetes development",
        image:
          "/images/visualization/distribusi_smoking_history_berdasarkan_diabetes.png",
        category: "Correlation",
        date: "2025-06-12",
        modelType: "Risk Factor Analysis",
      },
      {
        id: 13,
        title: "Feature Correlation Heatmap",
        description:
          "Comprehensive correlation matrix visualization between all numerical features",
        image: "/images/visualization/heatmap_korelasi_antar_fitur_numerik.png",
        category: "Correlation",
        date: "2025-06-12",
        modelType: "Correlation Matrix Analysis",
      },
    ];

    this.filteredVisualizations = [...this.visualizations];
    this.currentFilter = "all";
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="container-fluid padding-common">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h1 class="display-4 fw-bold text-primary mb-3">
              <i class="bi bi-graph-up me-3"></i>
              Model Visualization Gallery
            </h1>
            <p class="lead text-muted">
              Explore our comprehensive collection of diabetes prediction and analysis visualizations
            </p>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-12">
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <button class="btn btn-outline-primary filter-btn active" data-filter="all">
                <i class="bi bi-grid-3x3-gap me-2"></i>All Models
              </button>
              <button class="btn btn-outline-primary filter-btn" data-filter="Distribution">
                <i class="bi bi-graph-up-arrow me-2"></i>Distribution
              </button>
              <button class="btn btn-outline-primary filter-btn" data-filter="Correlation">
                <i class="bi bi-bar-chart me-2"></i>Correlation
              </button>
            </div>
          </div>
        </div>

        <div class="row g-4" id="visualization-grid">
          ${this.renderVisualizationCards()}
        </div>

       
      </div>

      <div class="modal fade" id="imagePreviewModal" tabindex="-1" aria-labelledby="imagePreviewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title fw-bold" id="imagePreviewModalLabel">Visualization Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div id="modal-content-area"></div>
            </div>
          </div>
        </div>
      </div>

      
    `;
  }

  renderVisualizationCards() {
    return this.filteredVisualizations
      .map(
        (viz) => `
      <div class="col-lg-4 col-md-6 col-sm-12 fade-in">
        <div class="card visualization-card h-100" data-viz-id="${viz.id}">
          <div class="card-img-container">
            <img src="${viz.image}" class="card-img-top" alt="${viz.title}" onerror="this.onerror=null; this.src='/images/fallback/diabetes_pedia_fallback.png';"  />
            <div class="card-overlay">
              <button class="btn btn-light btn-sm preview-btn">
                <i class="bi bi-eye me-1"></i>Preview
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge category-badge">${viz.category}</span>
            </div>
            <h5 class="card-title fw-bold mb-2">${viz.title}</h5>
            <p class="card-text text-muted mb-3">${viz.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <i class="bi bi-calendar3 me-1"></i>${viz.date}
              </small>
              <small class="text-primary fw-semibold">
                <i class="bi bi-cpu me-1"></i>${viz.modelType}
              </small>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  attachEventListeners() {
    const filterBtns = this.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        const filter = e.target.dataset.filter;
        this.filterVisualizations(filter);
      });
    });

    this.addEventListener("click", (e) => {
      if (
        e.target.closest(".preview-btn") ||
        e.target.closest(".card-img-top")
      ) {
        const card = e.target.closest(".visualization-card");
        const vizId = parseInt(card.dataset.vizId);
        this.showPreviewModal(vizId);
      }
    });
  }

  filterVisualizations(category) {
    this.currentFilter = category;

    if (category === "all") {
      this.filteredVisualizations = [...this.visualizations];
    } else {
      this.filteredVisualizations = this.visualizations.filter(
        (viz) => viz.category === category
      );
    }

    this.updateGrid();
  }

  updateGrid() {
    const grid = this.querySelector("#visualization-grid");
    grid.innerHTML = this.renderVisualizationCards();

    this.attachEventListeners();
  }

  showPreviewModal(vizId) {
    const visualization = this.visualizations.find((viz) => viz.id === vizId);
    if (!visualization) return;

    const modalContent = this.querySelector("#modal-content-area");
    const modalTitle = this.querySelector("#imagePreviewModalLabel");

    modalTitle.textContent = visualization.title;

    modalContent.innerHTML = `
      <div class="text-center">
        <img src="${visualization.image}" class="preview-image" alt="${visualization.title}" 
             onerror="this.onerror=null; this.src='/images/fallback/diabetes_pedia_fallback.png';" />
      </div>
      <div class="p-4">
        <div class="row">
          <div class="col-md-8">
            <h4 class="fw-bold mb-3">${visualization.title}</h4>
            <p class="text-muted mb-3">${visualization.description}</p>
            <div class="d-flex gap-2 mb-3">
              <span class="badge category-badge fs-6">${visualization.category}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stats-container">
              <div class="stat-item">
                <i class="bi bi-cpu text-primary"></i>
                <span><strong>Model:</strong> ${visualization.modelType}</span>
              </div>
              <div class="stat-item">
                <i class="bi bi-calendar3 text-primary"></i>
                <span><strong>Date:</strong> ${visualization.date}</span>
              </div>
              <div class="stat-item">
                <i class="bi bi-tag text-primary"></i>
                <span><strong>Category:</strong> ${visualization.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = new bootstrap.Modal(this.querySelector("#imagePreviewModal"));
    modal.show();
  }
}

customElements.define("visualization-component", Visualization);
