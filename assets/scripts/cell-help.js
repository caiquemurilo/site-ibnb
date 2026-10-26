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

  const phoneInput = cellHelpForm.querySelector('input[name="celular"]');
  if (phoneInput instanceof HTMLInputElement) {
    phoneInput.addEventListener("input", () => {
      const caretPosition = phoneInput.selectionStart ?? phoneInput.value.length;
      const digitsBeforeCaret = phoneInput.value
        .slice(0, caretPosition)
        .replace(/\D/g, "").length;
      const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
      const areaCode = digits.slice(0, 2);
      const subscriber = digits.slice(2);
      let formattedPhone = "";

      if (areaCode.length > 0) {
        formattedPhone = `(${areaCode}`;
      }

      if (areaCode.length === 2) {
        formattedPhone += `) ${subscriber.slice(0, 5)}`;
        if (subscriber.length > 5) {
          formattedPhone += `-${subscriber.slice(5)}`;
        }
      }

      phoneInput.value = formattedPhone;

      if (digitsBeforeCaret === 0 && formattedPhone.startsWith("(")) {
        phoneInput.setSelectionRange(1, 1);
        return;
      }

      let formattedCaretPosition = 0;
      let digitsCount = 0;
      while (
        formattedCaretPosition < formattedPhone.length &&
        digitsCount < digitsBeforeCaret
      ) {
        if (/\d/.test(formattedPhone[formattedCaretPosition])) {
          digitsCount += 1;
        }
        formattedCaretPosition += 1;
      }

      phoneInput.setSelectionRange(formattedCaretPosition, formattedCaretPosition);
    });
  }

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
