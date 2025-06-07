export class DiabetesPrediction {
  // constructor() {
  //   this.apiUrl = "http://localhost:8000/predict";
  //   this.init();
  // }

  constructor() {
    const isLocalhost = window.location.hostname === "localhost";

    this.apiUrl = isLocalhost
      ? "http://localhost:8000/predict"
      : "https://talented-determination-production.up.railway.app/predict";

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

      sessionStorage.setItem(
        "diabetesPredictionResult",
        JSON.stringify(result)
      );
      window.location.href = "/prediction-result";
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

  showLoading(show) {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      if (show) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Predicting...';
      } else {
        submitButton.disabled = false;
        submitButton.innerHTML = "Predict Diabetes Risk";
      }
    }
  }

  showError(message) {
    this.hideError();

    const form = document.getElementById("diabetes-form");
    if (!form) return;

    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger mt-3";
    errorDiv.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fas fa-exclamation-triangle me-2"></i>
        <div>${message}</div>
      </div>
    `;

    form.appendChild(errorDiv);
    setTimeout(() => {
      errorDiv.classList.add("show");
    }, 10);
  }

  hideError() {
    const existingError = document.querySelector(
      "#diabetes-form .alert-danger"
    );
    if (existingError) {
      existingError.classList.remove("show");
      setTimeout(() => {
        existingError.remove();
      }, 300);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DiabetesPrediction();
});
