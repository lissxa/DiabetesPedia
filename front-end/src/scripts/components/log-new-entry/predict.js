export class DiabetesPrediction {
  constructor() {
    this.apiUrl = "http://localhost:8000/predict";
    this.init();
  }

  init() {
    const form = document.getElementById("diabetes-form");
    const submitButton = document.querySelector('button[type="submit"]');

    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    if (submitButton) {
      submitButton.addEventListener("click", (e) => {
        if (e.target.form) {
          this.handleSubmit(e);
        }
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      this.showLoading(true);
      this.hideError();

      const formData = this.collectFormData();

      if (!this.validateFormData(formData)) {
        return;
      }

      const result = await this.sendPredictionRequest(formData);

      this.displayResult(result);
    } catch (error) {
      console.error("Prediction error:", error);
      this.showError(
        "Failed to get prediction. Please check if the API server is running and try again."
      );
    } finally {
      this.showLoading(false);
    }
  }

  collectFormData() {
    const formData = {};

    // Get age
    const age = document.getElementById("age-input");
    formData.age = age ? parseInt(age.value) : 0;

    // Get gender
    const genderMale = document.getElementById("gender-male");
    const genderFemale = document.getElementById("gender-female");
    if (genderMale && genderMale.checked) {
      formData.gender = "Male";
    } else if (genderFemale && genderFemale.checked) {
      formData.gender = "Female";
    }

    // Get BMI from BMI result field
    const bmiResult = document.getElementById("bmi-result");
    formData.bmi = bmiResult ? parseFloat(bmiResult.value) || 0 : 0;

    // Get hypertension
    const hypertensionYes = document.getElementById("hypertension-yes");
    const hypertensionNo = document.getElementById("hypertension-no");
    if (hypertensionYes && hypertensionYes.checked) {
      formData.hypertension = 1;
    } else if (hypertensionNo && hypertensionNo.checked) {
      formData.hypertension = 0;
    }

    // Get heart disease
    const heartDiseaseYes = document.getElementById("heart-disease-yes");
    const heartDiseaseNo = document.getElementById("heart-disease-no");
    if (heartDiseaseYes && heartDiseaseYes.checked) {
      formData.heart_disease = 1;
    } else if (heartDiseaseNo && heartDiseaseNo.checked) {
      formData.heart_disease = 0;
    }

    // Get smoking history
    const smokingHistory = document.getElementById("smoking-history");
    formData.smoking_history = smokingHistory ? smokingHistory.value : "";

    // Get HbA1c level
    const hba1cLevel = document.getElementById("hba1c-level");
    formData.HbA1c_level = hba1cLevel ? parseFloat(hba1cLevel.value) || 0 : 0;

    // Get blood glucose level
    const glucoseLevel = document.getElementById("glucose-level");
    formData.blood_glucose_level = glucoseLevel
      ? parseFloat(glucoseLevel.value) || 0
      : 0;

    return formData;
  }

  validateFormData(data) {
    const requiredFields = [
      "age",
      "gender",
      "bmi",
      "hypertension",
      "heart_disease",
      "smoking_history",
      "HbA1c_level",
      "blood_glucose_level",
    ];

    for (const field of requiredFields) {
      if (
        data[field] === undefined ||
        data[field] === null ||
        data[field] === ""
      ) {
        this.showError(`Missing required field: ${field.replace("_", " ")}`);
        return false;
      }
    }

    if (data.age <= 0 || data.age > 120) {
      this.showError("Please enter a valid age (1-120 years)");
      return false;
    }

    if (data.bmi <= 0) {
      this.showError("Please calculate BMI first in the BMI section");
      return false;
    }

    if (data.HbA1c_level < 0 || data.HbA1c_level > 20) {
      this.showError("Please enter a valid HbA1c level (0-20%)");
      return false;
    }

    if (data.blood_glucose_level <= 0) {
      this.showError("Please enter a valid blood glucose level");
      return false;
    }

    return true;
  }

  async sendPredictionRequest(data) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += `: ${errorData.detail || response.statusText}`;
      } catch {
        errorMessage += `: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  }

  displayResult(result) {
    let resultContainer = document.getElementById("prediction-result");
    if (!resultContainer) {
      resultContainer = this.createResultContainer();
    }

    const isRisky =
      result.prediction.toLowerCase().includes("rentan") ||
      result.prediction.toLowerCase().includes("risk") ||
      result.prediction.toLowerCase().includes("diabetes");
    const probabilityPercent = (result.probability * 100).toFixed(2);

    resultContainer.innerHTML = `
                    <div class="card border-0 shadow-sm prediction-result">
                        <div class="card-header bg-${
                          isRisky ? "danger" : "success"
                        } text-white">
                            <h3 class="card-title mb-0 fs-4">
                                <i class="fas fa-${
                                  isRisky
                                    ? "exclamation-triangle"
                                    : "check-circle"
                                } me-2"></i>
                                Diabetes Risk Prediction Result
                            </h3>
                        </div>
                        <div class="card-body p-4">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="p-3 rounded border bg-light">
                                        <label class="form-label fw-bold text-secondary small">PREDICTION STATUS</label>
                                        <div class="mt-2">
                                            <span class="badge bg-${
                                              isRisky ? "danger" : "success"
                                            } fs-6 px-3 py-2">
                                                ${result.prediction}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="p-3 rounded border bg-light">
                                        <label class="form-label fw-bold text-secondary small">RISK PROBABILITY</label>
                                        <div class="mt-2">
                                            <div class="d-flex align-items-center">
                                                <div class="progress flex-grow-1 me-3" style="height: 24px;">
                                                    <div class="progress-bar bg-${
                                                      isRisky
                                                        ? "danger"
                                                        : "success"
                                                    }" 
                                                         role="progressbar" 
                                                         style="width: ${Math.min(
                                                           parseFloat(
                                                             probabilityPercent
                                                           ),
                                                           100
                                                         )}%"
                                                         aria-valuenow="${probabilityPercent}" 
                                                         aria-valuemin="0" 
                                                         aria-valuemax="100">
                                                    </div>
                                                </div>
                                                <span class="fw-bold fs-5">${probabilityPercent}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <label class="form-label fw-bold text-secondary small">DETAILED EXPLANATION</label>
                                <div class="p-3 rounded border bg-light mt-2">
                                    <p class="mb-0 lh-base">${
                                      result.explanation
                                    }</p>
                                </div>
                            </div>
                            
                            <div class="alert alert-${
                              isRisky ? "warning" : "info"
                            } mt-4 mb-0">
                                <div class="d-flex align-items-start">
                                    <i class="fas fa-${
                                      isRisky
                                        ? "exclamation-triangle"
                                        : "info-circle"
                                    } me-2 mt-1"></i>
                                    <div>
                                        <strong>Important Note:</strong><br>
                                        ${
                                          isRisky
                                            ? "This prediction indicates potential diabetes risk. Please consult with a healthcare professional immediately for proper medical evaluation and advice."
                                            : "This prediction suggests lower diabetes risk based on the provided information. However, regular health monitoring and check-ups are still recommended for maintaining good health."
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <div class="text-center mt-4">
                                <button type="button" class="btn btn-outline-primary" onclick="window.print()">
                                    <i class="fas fa-print me-2"></i>Print Results
                                </button>
                                <button type="button" class="btn btn-outline-secondary ms-2" onclick="location.reload()">
                                    <i class="fas fa-redo me-2"></i>New Assessment
                                </button>
                            </div>
                        </div>
                    </div>
                `;

    resultContainer.style.display = "block";

    setTimeout(() => {
      resultContainer.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  createResultContainer() {
    const container = document.createElement("div");
    container.id = "prediction-result";
    container.className = "mt-5";
    container.style.display = "none";

    const mainCard = document.querySelector(".container .card");
    mainCard.parentNode.appendChild(container);

    return container;
  }

  showLoading(show) {
    const submitButton = document.querySelector('button[type="submit"]');
    if (!submitButton) return;

    if (show) {
      submitButton.disabled = true;
      submitButton.innerHTML = `
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing Prediction...
                    `;
    } else {
      submitButton.disabled = false;
      submitButton.innerHTML = `
                        <i class="fas fa-chart-line me-2"></i>Get Prediction
                    `;
    }
  }

  showError(message) {
    let errorContainer = document.getElementById("error-message");
    if (!errorContainer) {
      errorContainer = document.createElement("div");
      errorContainer.id = "error-message";
      errorContainer.className = "alert alert-danger alert-dismissible mt-3";

      const submitArea = document.querySelector(
        'button[type="submit"]'
      ).parentElement;
      submitArea.parentNode.insertBefore(errorContainer, submitArea);
    }

    errorContainer.innerHTML = `
                    <div class="d-flex align-items-start">
                        <i class="fas fa-exclamation-triangle me-2 mt-1"></i>
                        <div class="flex-grow-1">
                            <strong>Error:</strong> ${message}
                        </div>
                        <button type="button" class="btn-close" onclick="this.parentElement.parentElement.style.display='none'"></button>
                    </div>
                `;
    errorContainer.style.display = "block";

    setTimeout(() => {
      if (errorContainer && errorContainer.style.display !== "none") {
        errorContainer.style.display = "none";
      }
    }, 8000);

    errorContainer.scrollIntoView({ behavior: "smooth" });
  }

  hideError() {
    const errorContainer = document.getElementById("error-message");
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DiabetesPrediction();
});
