class DashboardPrediction {
  constructor() {
    this.predictionCard = document.getElementById("prediction-card");
    this.noPredictionCard = document.getElementById("no-prediction-card");
    this.userGreeting = document.getElementById("user-greeting");
    this.userStatus = document.getElementById("user-status");
    this.viewRecommendationBtn = document.getElementById(
      "view-recommendation-btn"
    );
    this.predictionHistorySection =
      document.getElementById("prediction-history");
    this.historyContainer = document.getElementById("history-container");
    this.toggleHistoryBtn = document.getElementById("toggle-history");

    this.init();
  }

  init() {
    this.checkUserAuth();
    this.loadLatestPrediction();
    this.setupEventListeners();
  }

  checkUserAuth() {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/";
      return;
    }

    this.userGreeting.textContent = `Hello, ${currentUser.name}!`;
    this.userStatus.textContent = "Welcome back to your health dashboard";
  }

  getCurrentUser() {
    try {
      const userData = localStorage.getItem("currentUser");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  loadLatestPrediction() {
    const recentPrediction = sessionStorage.getItem("diabetesPredictionResult");
    const savedPredictions = this.getSavedPredictions();

    if (recentPrediction) {
      try {
        const predictionData = JSON.parse(recentPrediction);
        const currentUser = this.getCurrentUser();

        if (
          currentUser &&
          (!predictionData.userId || predictionData.userId === currentUser.id)
        ) {
          if (!this.isPredictionAlreadySaved(predictionData)) {
            this.savePrediction(predictionData);
            const updatedPredictions = this.getSavedPredictions();
            this.displayPrediction(predictionData);
            this.displayPredictionHistory(updatedPredictions);
            sessionStorage.removeItem("diabetesPredictionResult");
            return;
          }
        }
      } catch (error) {
        console.error("Error parsing prediction data:", error);
      }
    }

    if (savedPredictions && savedPredictions.length > 0) {
      const latestPrediction = savedPredictions[savedPredictions.length - 1];
      this.displayPrediction(latestPrediction);
      this.displayPredictionHistory(savedPredictions);
    } else {
      this.showNoPrediction();
    }
  }

  getSavedPredictions() {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return [];

      const allPredictions = JSON.parse(
        localStorage.getItem("userPredictionsMap") || "{}"
      );
      return allPredictions[currentUser.id] || [];
    } catch (error) {
      console.error("Error getting saved predictions:", error);
      return [];
    }
  }

  isPredictionAlreadySaved(newPrediction) {
    const savedPredictions = this.getSavedPredictions();
    const currentUser = this.getCurrentUser();

    if (!currentUser) return false;

    return savedPredictions.some((saved) => {
      const timeDiff = Math.abs(
        new Date(saved.date) - new Date(newPrediction.date || new Date())
      );
      return (
        saved.userId === currentUser.id &&
        saved.probability === newPrediction.probability &&
        timeDiff < 60000
      );
    });
  }

  displayPrediction(predictionData) {
    const probability = predictionData.probability || 0;
    const probabilityPercent = Math.round(probability * 100);
    const riskLevel = this.getRiskLevel(probability);
    const riskClass = this.getRiskClass(probability);
    const riskColor = this.getRiskColor(probability);

    const riskCircle = document.getElementById("risk-circle");
    const riskPercentage = document.getElementById("risk-percentage");
    const riskLabel = document.getElementById("risk-label");
    const predictionStatus = document.getElementById("prediction-status");
    const predictionDescription = document.getElementById(
      "prediction-description"
    );
    const actionItem = document.getElementById("action-1");
    const predictionDate = document.getElementById("prediction-date");

    this.predictionCard.classList.add("loading");

    setTimeout(() => {
      riskCircle.className = `risk-circle ${riskClass}`;
      riskPercentage.textContent = `${probabilityPercent}%`;
      riskLabel.textContent = `${riskLevel} Risk`;

      predictionStatus.textContent = this.getStatusText(probability);
      predictionStatus.className = `prediction-status ${this.getStatusColor(
        probability
      )}`;

      predictionDescription.textContent = this.getDescription(probability);

      actionItem.innerHTML = `
        <i class="bi ${this.getActionIcon(probability)} ${this.getStatusColor(
        probability
      )}"></i>
        <span>${this.getActionText(probability)}</span>
      `;

      predictionDate.textContent = this.formatDate(
        predictionData.date || new Date()
      );

      this.predictionCard.style.display = "block";
      this.noPredictionCard.style.display = "none";
      this.viewRecommendationBtn.style.display = "block";

      this.predictionCard.classList.remove("loading");
    }, 800);
  }

  displayPredictionHistory(predictions) {
    if (!predictions || predictions.length === 0) {
      this.predictionHistorySection.style.display = "none";
      return;
    }

    this.historyContainer.innerHTML = "";
    this.historyContainer.className = "row g-3";
    this.historyContainer.style.display = "";
    this.historyContainer.style.visibility = "";
    this.historyContainer.style.opacity = "";

    const sortedPredictions = [...predictions].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    sortedPredictions.forEach((prediction, index) => {
      const probability = prediction.probability || 0;
      const probabilityPercent = Math.round(probability * 100);
      const riskLevel = this.getRiskLevel(probability);
      const riskClass = this.getRiskClass(probability);
      const riskColor = this.getRiskColor(probability);

      const historyCard = document.createElement("div");
      historyCard.className = "col-md-6 col-lg-4 mb-3";
      historyCard.innerHTML = `
        <div class="card history-card ${riskClass} h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="card-title mb-0">Assessment #${
                predictions.length - index
              }</h6>
              <span class="badge bg-light text-dark">${this.formatDate(
                prediction.date
              )}</span>
            </div>
            
            <div class="d-flex align-items-center gap-3 flex-grow-1">
              <div class="history-risk-indicator text-center">
                <div class="risk-circle ${riskClass}" style="border-color: ${riskColor}">
                  <div class="risk-percentage" style="color: ${riskColor}; font-weight: bold; font-size: 14px;">${probabilityPercent}%</div>
                </div>
                <div class="risk-label small">${riskLevel} Risk</div>
              </div>
              
              <div class="flex-grow-1">
                <p class="mb-2 small"><strong>${this.getStatusText(
                  probability
                )}</strong></p>
                <div class="d-flex align-items-center gap-2">
                  <i class="bi ${this.getActionIcon(
                    probability
                  )} ${this.getStatusColor(probability)}"></i>
                  <span class="small">${this.getActionText(probability)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      historyCard.addEventListener("click", () => {
        this.viewPredictionDetails(prediction, index);
      });

      this.historyContainer.appendChild(historyCard);
    });

    this.predictionHistorySection.style.display = "block";

    if (this.toggleHistoryBtn) {
      this.toggleHistoryBtn.innerHTML =
        '<i class="bi bi-chevron-up"></i> Hide History';
      this.toggleHistoryBtn.setAttribute("aria-expanded", "true");
    }
  }

  viewPredictionDetails(prediction, index) {
    sessionStorage.setItem(
      "selectedHistoryPrediction",
      JSON.stringify(prediction)
    );
    sessionStorage.setItem("selectedPredictionIndex", index.toString());

    sessionStorage.removeItem("diabetesPredictionResult");

    window.location.href = "/prediction-result";
  }

  showNoPrediction() {
    this.predictionCard.style.display = "none";
    this.noPredictionCard.style.display = "block";
    this.viewRecommendationBtn.style.display = "none";
    this.predictionHistorySection.style.display = "none";
  }

  getRiskLevel(probability) {
    if (probability < 0.3) return "Low";
    if (probability < 0.7) return "Moderate";
    return "High";
  }

  getRiskClass(probability) {
    if (probability < 0.3) return "low-risk";
    if (probability < 0.7) return "moderate-risk";
    return "high-risk";
  }

  getRiskColor(probability) {
    if (probability < 0.3) return "#10b981";
    if (probability < 0.7) return "#f59e0b";
    return "#ef4444";
  }

  getStatusText(probability) {
    if (probability < 0.3) return "Low Risk Assessment";
    if (probability < 0.7) return "Moderate Risk Assessment";
    return "High Risk Assessment";
  }

  getStatusColor(probability) {
    if (probability < 0.3) return "status-success";
    if (probability < 0.7) return "status-warning";
    return "status-danger";
  }

  getDescription(probability) {
    if (probability < 0.3) {
      return "Great news! Your assessment shows a low risk for diabetes. Keep maintaining your healthy lifestyle.";
    }
    if (probability < 0.7) {
      return "Your assessment indicates moderate risk. Consider lifestyle changes and consult with a healthcare provider.";
    }
    return "Your assessment shows high risk. We recommend immediate consultation with a healthcare provider.";
  }

  getActionIcon(probability) {
    if (probability < 0.3) return "bi-check-circle";
    if (probability < 0.7) return "bi-exclamation-triangle";
    return "bi-exclamation-octagon";
  }

  getActionText(probability) {
    if (probability < 0.3) return "Continue healthy habits";
    if (probability < 0.7) return "Consider lifestyle changes";
    return "Consult healthcare provider";
  }

  formatDate(date) {
    const dateObj = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - dateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        dateObj.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  }

  setupEventListeners() {
    this.viewRecommendationBtn?.addEventListener("click", () => {
      window.location.href = "/prediction-result";
    });

    this.toggleHistoryBtn?.addEventListener("click", () => {
      this.togglePredictionHistory();
    });

    window.addEventListener("predictionComplete", (event) => {
      this.savePrediction(event.detail);
      this.displayPrediction(event.detail);
      const updatedPredictions = this.getSavedPredictions();
      this.displayPredictionHistory(updatedPredictions);
    });

    window.addEventListener("authChange", () => {
      this.checkUserAuth();
    });
  }

  togglePredictionHistory() {
    if (!this.historyContainer || !this.toggleHistoryBtn) return;

    const isCurrentlyHidden =
      this.historyContainer.classList.contains("d-none") ||
      this.historyContainer.style.display === "none";

    if (isCurrentlyHidden) {
      // Show history
      this.historyContainer.classList.remove("d-none");
      this.historyContainer.style.display = "";
      this.historyContainer.style.visibility = "visible";
      this.historyContainer.style.opacity = "1";

      // Update button
      this.toggleHistoryBtn.innerHTML =
        '<i class="bi bi-chevron-up"></i> Hide History';
      this.toggleHistoryBtn.setAttribute("aria-expanded", "true");
    } else {
      // Hide history
      this.historyContainer.classList.add("d-none");
      this.historyContainer.style.display = "none";
      this.historyContainer.style.visibility = "hidden";
      this.historyContainer.style.opacity = "0";

      // Update button
      this.toggleHistoryBtn.innerHTML =
        '<i class="bi bi-chevron-down"></i> Show History';
      this.toggleHistoryBtn.setAttribute("aria-expanded", "false");
    }

    this.historyContainer.offsetHeight;

    if (!isCurrentlyHidden) {
      setTimeout(() => {
        const cards = this.historyContainer.querySelectorAll(".history-card");
        cards.forEach((card) => {
          card.style.width = "";
          card.style.height = "";
          card.style.flexBasis = "";
        });
      }, 100);
    }
  }

  savePrediction(predictionData) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return;

      // Get all predictions map
      const allPredictions = JSON.parse(
        localStorage.getItem("userPredictionsMap") || "{}"
      );

      // Get current user's predictions
      const userPredictions = allPredictions[currentUser.id] || [];

      // Create new prediction object
      const newPrediction = {
        ...predictionData,
        userId: currentUser.id,
        date: predictionData.date || new Date().toISOString(),
      };

      // Improved duplicate detection
      const isDuplicate = userPredictions.some((saved) => {
        const timeDiff = Math.abs(
          new Date(saved.date) - new Date(newPrediction.date)
        );
        return (
          saved.probability === newPrediction.probability &&
          timeDiff < 60000 &&
          JSON.stringify(saved.inputData) ===
            JSON.stringify(newPrediction.inputData)
        );
      });

      if (!isDuplicate) {
        userPredictions.push(newPrediction);

        if (userPredictions.length > 10) {
          userPredictions.shift();
        }

        allPredictions[currentUser.id] = userPredictions;
        localStorage.setItem(
          "userPredictionsMap",
          JSON.stringify(allPredictions)
        );
      }
    } catch (error) {
      console.error("Error saving prediction:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DashboardPrediction();
});

window.addEventListener("beforeunload", () => {
  console.log("Page unloading...");
});
