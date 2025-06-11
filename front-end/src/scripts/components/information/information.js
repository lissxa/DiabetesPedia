class InformationSection extends HTMLElement {
  constructor() {
    super();
    this.currentFilter = "all";
    this.render();
    this.initAnimations();
  }

  render() {
    this.innerHTML = `
      <div class="container-fluid padding-common">
        <div class="hero-section text-center mb-5" data-aos="fade-up">
          <div class="hero-content">
            <div class="floating-icon mb-4">
              <i class="bi bi-heart-pulse-fill"></i>
            </div>
            <h1 class="display-4 fw-bold gradient-text mb-3">
              Understand Diabetes Risk Factors
            </h1>
            <p class="lead text-muted mb-4 mx-auto" style="max-width: 600px;">
              Every piece of data you enter has a story. Let's explore together how your body "speaks" about your diabetes risk.
            </p>
            
            <div class="filter-buttons mb-5">
              <button class="filter-btn active" data-filter="all">
                <i class="bi bi-grid-3x3-gap"></i>
                All
              </button>
              <button class="filter-btn" data-filter="basic">
                <i class="bi bi-person"></i>
                Basic Info
              </button>
              <button class="filter-btn" data-filter="medical">
                <i class="bi bi-hospital"></i>
                Medical Info
              </button>
              <button class="filter-btn" data-filter="lifestyle">
                <i class="bi bi-heart"></i>
                Lifestyle
              </button>
            </div>
          </div>
        </div>

        <div class="cards-container">
          <div class="row g-4" id="cards-grid">
            ${this.generateInfoCards()}
          </div>
        </div>

        <div class="stats-section mt-5" data-aos="fade-up">
          <div class="glass-card p-5 text-center">
            <h3 class="mb-4 gradient-text">Do you know?</h3>
            <div class="row g-4">
              <div class="col-md-4">
                <div class="stat-item">
                  <div class="stat-number" data-count="463">0</div>
                  <div class="stat-label">Millions of people with diabetes in the world</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-item">
                  <div class="stat-number" data-count="90">0</div>
                  <div class="stat-label">% of cases of type 2 diabetes</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-item">
                  <div class="stat-number" data-count="50">0</div>
                  <div class="stat-label">% can be prevented with a healthy lifestyle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateInfoCards() {
    const infoData = [
      {
        icon: "bi-calendar-heart",
        title: "Age",
        subtitle: "The Time Factor in Health",
        description:
          "As you age, your metabolism slows down and your risk of insulin resistance increases. Your body needs extra attention after age 45.",
        highlight: "The risk increases 2-fold after age 45",
        category: "basic",
        color: "#6366f1",
        gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      },
      {
        icon: "bi-gender-ambiguous",
        title: "Gender",
        subtitle: "Biological Differences",
        description:
          "Hormones and genetics play a role in diabetes risk. Men and women have different risk patterns due to hormonal and lifestyle factors.",
        highlight: "Hormonal factors influence metabolism",
        category: "basic",
        color: "#ec4899",
        gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
      },
      {
        icon: "bi-rulers",
        title: "Body Dimensions",
        subtitle: "Height and weight",
        description:
          "Body proportions provide an initial picture of metabolic health. This data is the basis for calculating BMI to assess risk.",
        highlight: "The basis for calculating the health index",
        category: "basic",
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
      },
      {
        icon: "bi-calculator",
        title: "Body Mass Index",
        subtitle: "Key Health Indicators",
        description:
          "BMI measures whether your weight is proportional to your height. An optimal value indicates a healthy metabolism.",
        categories: [
          { range: "< 18.5", status: "Thin", color: "#64748b" },
          { range: "18.5-24.9", status: "Ideal", color: "#10b981" },
          { range: "25-29.9", status: "Over", color: "#f59e0b" },
          { range: "≥ 30", status: "Obese", color: "#ef4444" },
        ],
        category: "medical",
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      },
      {
        icon: "bi-heart-pulse",
        title: "Blood pressure",
        subtitle: "Cardiovascular Health",
        description:
          "High blood pressure damages tiny blood vessels and affects blood flow throughout the body, including the organs that regulate blood sugar.",
        highlight: "Normal: < 120/80 mmHg",
        category: "medical",
        color: "#ef4444",
        gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      },
      {
        icon: "bi-heart-fill",
        title: "Heart Health",
        subtitle: "Circulation System",
        description:
          "The heart is the center of circulation that supplies nutrients and oxygen. Heart disorders are often associated with disorders of sugar metabolism.",
        highlight: "Close relationship with metabolism",
        category: "medical",
        color: "#dc2626",
        gradient: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
      },
      {
        icon: "bi-lungs",
        title: "Smoking Habit",
        subtitle: "Lifestyle Impact",
        description:
          "Nicotine damages blood vessels and interferes with insulin function. The toxins in cigarettes affect almost every organ in the body.",
        highlight: "The risk is 30-40% higher in smokers",
        category: "lifestyle",
        color: "#64748b",
        gradient: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
      },
      {
        icon: "bi-graph-up-arrow",
        title: "HbA1c Level",
        subtitle: "3 Month Blood Sugar Average",
        description:
          'This test is like a "recording" of your blood sugar levels over the past 2-3 months. The lower the reading, the better your blood sugar control.',
        categories: [
          { range: "< 5.7%", status: "Normal", color: "#10b981" },
          { range: "5.7-6.4%", status: "Pra-diabetes", color: "#f59e0b" },
          { range: "≥ 6.5%", status: "Diabetes", color: "#ef4444" },
        ],
        category: "medical",
        color: "#8b5cf6",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
      },
      {
        icon: "bi-droplet-fill",
        title: "Blood Glucose",
        subtitle: "Current Sugar Level",
        description:
          "Measures your current blood sugar concentration. This value fluctuates throughout the day and is affected by food and activity.",
        categories: [
          { range: "< 100", status: "Normal", color: "#10b981" },
          { range: "100-125", status: "Pra-diabetes", color: "#f59e0b" },
          { range: "≥ 126", status: "Diabetes", color: "#ef4444" },
        ],
        highlight: "The value of fasting (mg/dL)",
        category: "medical",
        color: "#06b6d4",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      },
    ];
    return infoData
      .map(
        (item, index) => `
      <div class="col-lg-6 col-xl-4 card-item" data-category="${
        item.category
      }" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="modern-card" style="--card-gradient: ${
          item.gradient
        }; --card-color: ${item.color};">
          <div class="card-header-modern">
            <div class="card-icon">
              <i class="${item.icon}"></i>
            </div>
            <div class="card-header-text">
              <h4 class="card-title">${item.title}</h4>
              <p class="card-subtitle">${item.subtitle}</p>
            </div>
          </div>
          
          <div class="card-body-modern">
            <p class="card-description">${item.description}</p>
            
            ${
              item.categories
                ? `
              <div class="categories-container">
                <h6 class="categories-title">Value Category:</h6>
                <div class="categories-grid">
                  ${item.categories
                    .map(
                      (cat) => `
                    <div class="category-item">
                      <div class="category-indicator" style="background: ${cat.color};"></div>
                      <div class="category-info">
                        <span class="category-range">${cat.range}</span>
                        <span class="category-status">${cat.status}</span>
                      </div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
            
            ${
              item.highlight
                ? `
              <div class="highlight-box">
                <i class="bi bi-lightbulb"></i>
                <span>${item.highlight}</span>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  initAnimations() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      });
    }

    setTimeout(() => {
      this.initFilters();
      this.initCounters();
      this.initCardHovers();
    }, 100);
  }

  initFilters() {
    const filterBtns = this.querySelectorAll(".filter-btn");
    const cards = this.querySelectorAll(".card-item");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        cards.forEach((card, index) => {
          const category = card.dataset.category;
          const shouldShow = filter === "all" || category === filter;

          if (shouldShow) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  initCounters() {
    const counters = this.querySelectorAll("[data-count]");

    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach((counter) => observer.observe(counter));
  }

  initCardHovers() {
    const cards = this.querySelectorAll(".modern-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }
}

const modernStyles = document.createElement("style");
modernStyles.textContent = ``;

document.head.appendChild(modernStyles);

const aosScript = document.createElement("script");
aosScript.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
document.head.appendChild(aosScript);

customElements.define("information-section", InformationSection);

export default InformationSection;
