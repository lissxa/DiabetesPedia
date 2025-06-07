const logNewEntryBtn = document.getElementById("logNewEntryBtn");
if (logNewEntryBtn) {
  logNewEntryBtn.addEventListener("click", () => {
    window.location.href = "/log-new-entry";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculateBtn");

  if (!calculateBtn) {
    console.error("Calculate button not found!");
    return;
  }

  const heightInput = document.getElementById("bmi-height-input");
  const weightInput = document.getElementById("bmi-weight-input");
  const bmiResult = document.getElementById("bmi-result");
  const bmiCategory = document.getElementById("bmi-category");
  const heightError = document.getElementById("height-error");
  const weightError = document.getElementById("weight-error");

  function checkFormValidity() {
    const heightValid =
      !heightInput.classList.contains("is-invalid") &&
      heightInput.value.trim() !== "";
    const weightValid =
      !weightInput.classList.contains("is-invalid") &&
      weightInput.value.trim() !== "";
    calculateBtn.disabled = !(heightValid && weightValid);
  }

  heightInput.addEventListener("input", () => {
    const value = heightInput.value;

    if (/^0/.test(value)) {
      heightError.textContent = "Height cannot begin with 0!";
      heightInput.classList.add("is-invalid");
    } else if (value.length > 0 && value.length < 3) {
      heightError.textContent =
        "Please fill in your height with a minimum of 3 digits!";
      heightInput.classList.add("is-invalid");
    } else {
      heightError.textContent = "";
      heightInput.classList.remove("is-invalid");
    }

    checkFormValidity();
  });

  weightInput.addEventListener("input", () => {
    const value = weightInput.value;

    if (/^0/.test(value)) {
      weightError.textContent = "Weight cannot start with 0!";
      weightInput.classList.add("is-invalid");
    } else if (value.length > 0 && value.length < 2) {
      weightError.textContent =
        "Please fill in your weight with at least 2 digits!";
      weightInput.classList.add("is-invalid");
    } else {
      weightError.textContent = "";
      weightInput.classList.remove("is-invalid");
    }

    checkFormValidity();
  });

  calculateBtn.addEventListener("click", calculateBMI);

  function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    bmiCategory.className = "";

    if (isNaN(height) || height <= 0) {
      bmiResult.value = "";
      bmiCategory.textContent = "Input a valid height!";
      bmiCategory.classList.add("text-danger");
      return;
    }

    if (isNaN(weight) || weight <= 0) {
      bmiResult.value = "";
      bmiCategory.textContent = "Input a valid weight!";
      bmiCategory.classList.add("text-danger");
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;

    bmiResult.value = roundedBMI;

    let category = "";
    let categoryClass = "";

    if (roundedBMI < 18.5) {
      category = "Low Weight";
      categoryClass = "text-warning";
    } else if (roundedBMI <= 22.9) {
      category = "Ideal Weight";
      categoryClass = "text-success";
    } else if (roundedBMI <= 24.9) {
      category = "Over weight";
      categoryClass = "text-warning";
    } else {
      category = "Obese";
      categoryClass = "text-danger";
    }

    bmiCategory.innerHTML = `<span class="${categoryClass}">${category}</span>`;
  }

  bmiResult.value = "";
  bmiCategory.textContent = "";
  calculateBtn.disabled = true;
});
