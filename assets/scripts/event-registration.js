const eventRegistrationDialog = document.querySelector("#event-registration");
const eventRegistrationOpenButtons = document.querySelectorAll(
  ".event-registration-trigger",
);
const eventRegistrationCloseButton = eventRegistrationDialog?.querySelector(
  ".worship-dialog__close",
);
const eventRegistrationForm = eventRegistrationDialog?.querySelector("form");
const eventRegistrationStatus = eventRegistrationDialog?.querySelector(
  ".event-registration__status",
);

if (
  eventRegistrationDialog instanceof HTMLDialogElement &&
  eventRegistrationCloseButton instanceof HTMLButtonElement &&
  eventRegistrationForm instanceof HTMLFormElement &&
  eventRegistrationStatus instanceof HTMLElement
) {
  eventRegistrationOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      eventRegistrationStatus.textContent = "";
      eventRegistrationDialog.showModal();
    });
  });

  eventRegistrationCloseButton.addEventListener("click", () => {
    eventRegistrationDialog.close();
  });

  eventRegistrationDialog.addEventListener("click", (event) => {
    if (event.target === eventRegistrationDialog) {
      eventRegistrationDialog.close();
    }
  });

  eventRegistrationDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      eventRegistrationDialog.close();
    }
  });

  eventRegistrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    eventRegistrationStatus.textContent =
      "Demonstração: a inscrição não foi enviada nem armazenada.";
  });
}
