const cellHelpDialog = document.querySelector("#cell-help-dialog");
const cellHelpOpenButton = document.querySelector(".cell-help-trigger");
const cellHelpCloseButton = cellHelpDialog?.querySelector(
  ".worship-dialog__close",
);
const cellHelpForm = cellHelpDialog?.querySelector("form");
const cellHelpStatus = cellHelpDialog?.querySelector(".cell-help__status");
const cellHelpSuccess = cellHelpDialog?.querySelector(".cell-help__success");
const cellHelpPreferenceInputs = cellHelpDialog?.querySelectorAll(
  'input[name="preferencia"]',
);
const cellHelpConditionalFields = cellHelpDialog?.querySelectorAll(
  ".cell-help__conditional",
);

if (
  cellHelpDialog instanceof HTMLDialogElement &&
  cellHelpOpenButton instanceof HTMLButtonElement &&
  cellHelpCloseButton instanceof HTMLButtonElement &&
  cellHelpForm instanceof HTMLFormElement &&
  cellHelpStatus instanceof HTMLElement &&
  cellHelpSuccess instanceof HTMLElement &&
  cellHelpPreferenceInputs instanceof NodeList &&
  cellHelpConditionalFields instanceof NodeList
) {
  // Connect this success view only after a real submission service confirms success.
  const showCellHelpSuccess = () => {
    cellHelpForm.hidden = true;
    cellHelpSuccess.hidden = false;
  };
  cellHelpForm.addEventListener("cell-help:success", showCellHelpSuccess);

  const updatePreferenceFields = () => {
    const selectedPreference = cellHelpDialog.querySelector(
      'input[name="preferencia"]:checked',
    )?.value;

    cellHelpConditionalFields.forEach((field) => {
      const isSelected = field.dataset.preference === selectedPreference;
      const input = field.querySelector("input, select");

      field.hidden = !isSelected;

      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLSelectElement
      ) {
        input.disabled = !isSelected;
        input.required = isSelected;
      }
    });
  };

  cellHelpOpenButton.addEventListener("click", () => {
    cellHelpStatus.textContent = "";
    cellHelpSuccess.hidden = true;
    cellHelpForm.hidden = false;
    cellHelpForm.reset();
    updatePreferenceFields();
    cellHelpDialog.showModal();
  });

  cellHelpCloseButton.addEventListener("click", () => {
    cellHelpDialog.close();
  });

  cellHelpDialog.addEventListener("click", (event) => {
    if (event.target === cellHelpDialog) {
      cellHelpDialog.close();
    }
  });

  cellHelpDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cellHelpDialog.close();
    }
  });

  cellHelpPreferenceInputs.forEach((input) => {
    input.addEventListener("change", updatePreferenceFields);
  });

  cellHelpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    cellHelpStatus.textContent = "";
    cellHelpStatus.textContent =
      "O envio não está disponível no momento. Seus dados não foram enviados.";
  });
}
