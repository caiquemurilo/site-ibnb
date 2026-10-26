const worshipDialog = document.querySelector("#worship-schedule");
const worshipDialogOpenButton = document.querySelector(
  '[aria-controls="worship-schedule"]',
);
const worshipDialogCloseButton = worshipDialog?.querySelector(
  ".worship-dialog__close",
);

if (
  worshipDialog instanceof HTMLDialogElement &&
  worshipDialogOpenButton instanceof HTMLButtonElement &&
  worshipDialogCloseButton instanceof HTMLButtonElement
) {
  worshipDialogOpenButton.addEventListener("click", () => {
    worshipDialog.showModal();
  });

  worshipDialogCloseButton.addEventListener("click", () => {
    worshipDialog.close();
  });

  worshipDialog.addEventListener("click", (event) => {
    if (event.target === worshipDialog) {
      worshipDialog.close();
    }
  });

  worshipDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      worshipDialog.close();
    }
  });
}
