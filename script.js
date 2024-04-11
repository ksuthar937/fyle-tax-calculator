// Tooltip

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Form

let form = document.querySelector("form");

const taxModal = new bootstrap.Modal(document.getElementById("taxModal"));

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  e.preventDefault();

  const { annualIncome, extraIncome, ageGroup, totalDeduct } = form.elements;

  const formData = {
    annualIncome: Number(annualIncome.value),
    extraIncome: Number(extraIncome.value),
    ageGroup: ageGroup.value,
    totalDeduction: Number(totalDeduct.value),
  };

  console.log(formData);

  let overallIncome =
    formData.annualIncome + formData.extraIncome - formData.totalDeduction;

  if (overallIncome > 800000) {
    const taxableAmount = overallIncome - 800000;
    let tax = 0;

    if (formData.ageGroup === "lesser") {
      tax = 0.3 * taxableAmount;
    } else if (formData.ageGroup === "between") {
      tax = 0.4 * taxableAmount;
    } else if (formData.ageGroup === "higher") {
      tax = 0.1 * taxableAmount;
    }

    overallIncome = overallIncome - tax;
  }

  document.getElementById("overallIncome").innerText =
    overallIncome.toLocaleString();

  taxModal.show();
});
