class PredictionResult {
  constructor() {
    this.resultContainer = document.getElementById(
      "prediction-result-container"
    );
    this.init();
  }

  init() {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser || !currentUser.id) {
      this.displayLoginRequired();
      return;
    }

    const historyPrediction = sessionStorage.getItem(
      "selectedHistoryPrediction"
    );
    const currentPrediction = sessionStorage.getItem(
      "diabetesPredictionResult"
    );

    let resultData = null;
    let isHistoryPrediction = false;

    if (historyPrediction) {
      const parsedHistory = JSON.parse(historyPrediction);
      if (!parsedHistory.userId || parsedHistory.userId === currentUser.id) {
        resultData = historyPrediction;
        isHistoryPrediction = true;
      }
    } else if (currentPrediction) {
      const parsedCurrent = JSON.parse(currentPrediction);
      if (!parsedCurrent.userId || parsedCurrent.userId === currentUser.id) {
        resultData = currentPrediction;
        isHistoryPrediction = false;
      }
    }

    if (!resultData) {
      window.location.href = "/log-new-entry";
      return;
    }

    const result = JSON.parse(resultData);
    this.displayResult(result, isHistoryPrediction);
  }

  displayLoginRequired() {
    this.resultContainer.innerHTML = `
    <div class="card border-0 shadow-lg">
      <div class="card-body text-center py-5">
        <div class="mb-4">
          <i class="bi-person-x fs-1 text-warning"></i>
        </div>
        <h3 class="text-warning fw-bold mb-3">Login Required</h3>
        <p class="text-muted mb-4 fs-5">
          You must be logged in to view diabetes prediction results.
        </p>
        <div class="d-flex gap-3 justify-content-center">
          <button 
            class="btn btn-primary px-4"
            data-bs-toggle="modal" 
            data-bs-target="#signInModal"
          >
            <i class="bi-box-arrow-in-right me-2"></i>Login
          </button>
          <button 
            class="btn btn-outline-secondary px-4"
            onclick="window.location.href='/'"
          >
            <i class="bi-house me-2"></i>Back to Home
          </button>
        </div>
      </div>
    </div>
  `;
  }

  displayResult(result, isHistoryPrediction = false) {
    const translatedPrediction = result.prediction?.includes("Tidak Rentan")
      ? "<strong>Low Diabetes Risk</strong>"
      : result.prediction?.includes("Rentan")
      ? "<strong>High Diabetes Risk</strong>"
      : result.prediction || "Risk Assessment";

    const probability = result.probability;
    const probabilityPercent = (probability * 100).toFixed(2);

    let riskColor, riskIcon, riskLevel, bgGradient, textColor, pulseClass;
    if (probability < 0.3) {
      riskColor = "success";
      riskIcon = "bi-shield-check";
      riskLevel = "Low";
      bgGradient = "linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)";
      textColor = "text-emerald-600";
      pulseClass = "pulse-success";
    } else if (probability < 0.7) {
      riskColor = "warning";
      riskIcon = "bi-exclamation-triangle";
      riskLevel = "Moderate";
      bgGradient = "linear-gradient(135deg, #facc15 0%, #fb923c 100%)";
      textColor = "text-amber-600";
      pulseClass = "pulse-warning";
    } else {
      riskColor = "danger";
      riskIcon = "bi-exclamation-circle";
      riskLevel = "High";
      bgGradient = "linear-gradient(135deg, #f87171 0%, #fb7185 100%)";
      textColor = "text-red-600";
      pulseClass = "pulse-danger";
    }

    const progressColor = this.getEnhancedProgressColor(probability);
    const customExplanation = this.getCustomExplanation(
      probability,
      probabilityPercent,
      pulseClass,
      textColor
    );

    const predictionDate = result.date ? new Date(result.date) : new Date();
    const formattedDate = this.formatPredictionDate(predictionDate);

    const headerTitle = isHistoryPrediction
      ? "Historical Diabetes Risk Assessment"
      : "Diabetes Risk Assessment";

    const headerSubtitle = isHistoryPrediction
      ? `Assessment from ${formattedDate}`
      : "Complete Health Analysis Results";

    this.resultContainer.innerHTML = `
      <div class="card border-0 prediction-result">
        <div class="enhanced-header" style="background: ${bgGradient}">
          <div class="header-content text-center text-white">
            <div class="d-flex flex-column align-items-center">
              ${
                isHistoryPrediction
                  ? '<i class="bi-clock-history fs-4 mb-2 opacity-75"></i>'
                  : ""
              }
              <i class="${riskIcon} fs-1 mb-3" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));"></i>
              <h2 class="fw-bold mb-2" style="text-shadow: 0 2px 4px rgba(0,0,0,0.3));">${headerTitle}</h2>
              <p class="mb-0 opacity-90 fs-5">${headerSubtitle}</p>
            </div>
          </div>
        </div>

        <div class="enhanced-card-body">
          <div class="row g-4 mb-5">
            <div class="col-md-6">
              <div class="p-4 rounded-4 border-0 shadow-sm h-100" style="background: #ffffff;">
                <div class="text-center">
                  <label class="form-label fw-bold text-slate-600 mb-3 text-uppercase tracking-wide">Prediction Status</label>
                  <div class="mb-3">
                    <span class="badge bg-${riskColor} fs-6 px-4 py-2 rounded-pill">${translatedPrediction}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-center mb-3">
                    <i class="bi-info-circle me-2 ${textColor}"></i>
                    <span class="text-slate-600">Risk Level: ${riskLevel}</span>
                  </div>
                  ${
                    isHistoryPrediction
                      ? `
                    <div class="d-flex align-items-center justify-content-center">
                      <i class="bi-calendar-event me-2 text-slate-400"></i>
                      <small class="text-slate-500">Assessed on ${formattedDate}</small>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-4 rounded-4 border-0 shadow-sm h-100" style="background: #ffffff;">
                <div class="text-center">
                  <label class="form-label fw-bold text-slate-600 mb-3 text-uppercase tracking-wide">Probability Score</label>
                  <div class="mb-3">
                    <span class="badge bg-${riskColor}-subtle text-${riskColor} fs-6 px-4 py-2 rounded-pill">${probabilityPercent}%</span>
                  </div>
                  <div class="enhanced-progress mt-4">
                    <div class="enhanced-progress-bar" style="width: ${probabilityPercent}%; background: ${progressColor}"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ${customExplanation}

          <div class="action-buttons mt-5 text-center">
            <button class="btn btn-outline-secondary me-3" onclick="window.location.href = '/dashboard'">
              <i class="bi-arrow-left me-2"></i>Back to Dashboard
            </button>
            <button class="btn btn-primary me-3" onclick="window.print()">
              <i class="bi-printer me-2"></i>Print Results
            </button>
            ${
              !isHistoryPrediction
                ? `
              <a href="/log-new-entry" class="btn btn-outline-primary">
                <i class="bi-plus-circle me-2"></i>New Assessment
              </a>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }

  formatPredictionDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }

  getCustomExplanation(probability, probabilityPercent, pulseClass, textColor) {
    if (probability < 0.3) {
      return this.getLowRiskTemplate(probabilityPercent, pulseClass, textColor);
    } else if (probability < 0.7) {
      return this.getModerateRiskTemplate(
        probabilityPercent,
        pulseClass,
        textColor
      );
    } else {
      return this.getHighRiskTemplate(
        probabilityPercent,
        pulseClass,
        textColor
      );
    }
  }

  getLowRiskTemplate(probabilityPercent, pulseClass, textColor) {
    return `
      <div class="health-tips-enhanced text-center">
        <div class="celebration-header mb-4">
          <div class="celebration-icon ${pulseClass}">
            <i class="bi-trophy-fill fs-1 text-emerald-500"></i>
          </div>
          <h3 class="text-emerald-600 fw-bold mt-3">🎉 Congratulations! 🎉</h3>
          <p class="lead text-slate-600">Your diabetes risk assessment shows excellent results!</p>
        </div>

        <div class="risk-details mb-4">
          <div class="risk-badge-large bg-emerald-500 text-white">
            <span class="risk-percentage">${probabilityPercent}%</span>
            <span class="risk-label">Low Risk</span>
          </div>
        </div>

        <div class="recommendations-grid">
          ${this.getRecommendationCard(
            "bi-egg-fried",
            "Maintain Balanced Diet",
            "Continue eating whole grains, vegetables, and lean proteins",
            "emerald"
          )}
          ${this.getRecommendationCard(
            "bi-activity",
            "Stay Active",
            "Keep up with 150+ minutes of physical activity per week",
            "emerald"
          )}
          ${this.getRecommendationCard(
            "bi-speedometer2",
            "Monitor Weight",
            "Regular BMI checks to maintain healthy weight",
            "emerald"
          )}
          ${this.getRecommendationCard(
            "bi-hospital",
            "Annual Check-ups",
            "Schedule regular health screenings",
            "emerald"
          )}
          ${this.getRecommendationCard(
            "bi-moon",
            "Quality Sleep",
            "Maintain 7-9 hours of quality sleep nightly",
            "emerald"
          )}
          ${this.getRecommendationCard(
            "bi-droplet",
            "Stay Hydrated",
            "Drink plenty of water throughout the day",
            "emerald"
          )}
        </div>
      </div>
    `;
  }

  getModerateRiskTemplate(probabilityPercent, pulseClass, textColor) {
    return `
      <div class="health-tips-enhanced text-center">
        <div class="warning-header mb-4">
          <div class="warning-icon ${pulseClass}">
            <i class="bi-exclamation-triangle-fill fs-1 text-amber-500"></i>
          </div>
          <h3 class="text-amber-600 fw-bold mt-3">⚠️ Moderate Risk Detected ⚠️</h3>
          <p class="lead text-slate-600">Time for preventive action - you can reduce this risk!</p>
        </div>

        <div class="risk-details mb-4">
          <div class="risk-badge-large bg-amber-500 text-white">
            <span class="risk-percentage">${probabilityPercent}%</span>
            <span class="risk-label">Moderate Risk</span>
          </div>
        </div>

        <div class="recommendations-grid">
          ${this.getRecommendationCard(
            "bi-clipboard2-pulse",
            "Consult Healthcare Provider",
            "Get a comprehensive health evaluation",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-apple",
            "Improve Diet",
            "Reduce sugar and refined carbohydrates",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-activity",
            "Increase Activity",
            "Aim for 30 minutes of daily exercise",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-graph-up",
            "Monitor Glucose",
            "Check blood glucose every 3-6 months",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-heart-pulse",
            "Stress Management",
            "Practice relaxation techniques and meditation",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-no-smoking",
            "Quit Smoking",
            "Stop smoking and limit alcohol consumption",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-calendar-check",
            "Regular Monitoring",
            "Track weight, BP, and blood sugar regularly",
            "amber"
          )}
          ${this.getRecommendationCard(
            "bi-people",
            "Family Support",
            "Involve family in healthy lifestyle changes",
            "amber"
          )}
        </div>
      </div>
    `;
  }

  getHighRiskTemplate(probabilityPercent, pulseClass, textColor) {
    return `
      <div class="health-tips-enhanced text-center">
        <div class="alert-header mb-4">
          <div class="alert-icon ${pulseClass}">
            <i class="bi-exclamation-octagon-fill fs-1 text-red-500"></i>
          </div>
          <h3 class="text-red-600 fw-bold mt-3">🚨 High Risk Alert 🚨</h3>
          <p class="lead text-slate-600">Immediate action required - don't wait!</p>
        </div>

        <div class="risk-details mb-4">
          <div class="risk-badge-large bg-red-500 text-white">
            <span class="risk-percentage">${probabilityPercent}%</span>
            <span class="risk-label">High Risk</span>
          </div>
        </div>

        <div class="recommendations-grid">
          ${this.getRecommendationCard(
            "bi-clipboard2-pulse-fill",
            "See Doctor ASAP",
            "Schedule immediate medical consultation",
            "red",
            true,
            true
          )}
          ${this.getRecommendationCard(
            "bi-heart-pulse-fill",
            "Medical Supervision",
            "Begin supervised diet and exercise program",
            "red",
            false,
            true
          )}
          ${this.getRecommendationCard(
            "bi-droplet-fill",
            "Regular Monitoring",
            "Check blood glucose levels frequently",
            "red",
            false,
            true
          )}
          ${this.getRecommendationCard(
            "bi-search-heart",
            "Diabetes Screening",
            "Test for prediabetes or diabetes",
            "red",
            false,
            true
          )}
          ${this.getRecommendationCard(
            "bi-capsule-pill",
            "Medication Review",
            "Discuss preventive medications with doctor",
            "red",
            false,
            true
          )}
          ${this.getRecommendationCard(
            "bi-slash-circle",
            "Eliminate Risk Factors",
            "Stop smoking and reduce alcohol immediately",
            "red",
            false,
            true
          )}
          ${this.getRecommendationCard(
            "bi-clipboard2-data",
            "Care Plan",
            "Develop comprehensive diabetes prevention plan",
            "red",
            false,
            true
          )}
          ${this.getRecommendationCard(
            "bi-telephone-plus",
            "Emergency Contact",
            "Have emergency contact ready for health issues",
            "red",
            false,
            true
          )}
        </div>
      </div>
    `;
  }

  getRecommendationCard(
    icon,
    title,
    description,
    color,
    isPriority = false,
    isUrgent = false
  ) {
    const priorityClass = isPriority ? "priority" : "";
    const urgentClass = isUrgent ? "urgent" : "";
    const colorClass = `bg-${color}-400`;

    return `
      <div class="recommendation-card ${priorityClass} ${urgentClass}">
        <div class="card-accent-line ${colorClass}"></div>
        <div class="rec-icon text-${color}-500"><i class="bi ${icon}"></i></div>
        <h6 class="text-slate-700">${title}</h6>
        <p class="small text-slate-500">${description}</p>
      </div>
    `;
  }

  getEnhancedProgressColor(probability) {
    if (probability < 0.3) {
      return "linear-gradient(90deg, #4ade80 0%, #22d3ee 100%)";
    } else if (probability < 0.7) {
      return "linear-gradient(90deg, #facc15 0%, #fb923c 100%)";
    } else {
      return "linear-gradient(90deg, #f87171 0%, #fb7185 100%)";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PredictionResult();

  if (sessionStorage.getItem("selectedHistoryPrediction")) {
    setTimeout(() => {
      sessionStorage.removeItem("selectedHistoryPrediction");
      sessionStorage.removeItem("selectedPredictionIndex");
    }, 1000);
  }
});
