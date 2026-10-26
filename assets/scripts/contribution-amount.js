const contributionAmountInput = document.querySelector("#contribution-amount");

if (contributionAmountInput instanceof HTMLInputElement) {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  let amountDigits = "";

  const renderAmount = () => {
    if (!amountDigits) {
      contributionAmountInput.value = "";
      return;
    }

    contributionAmountInput.value = currencyFormatter.format(
      Number(amountDigits) / 100,
    );
    contributionAmountInput.setSelectionRange(
      contributionAmountInput.value.length,
      contributionAmountInput.value.length,
    );
  };

  const appendDigits = (value) => {
    const digits = value.replace(/\D/g, "");
    amountDigits = `${amountDigits}${digits}`.slice(0, 12);
    renderAmount();
  };

  contributionAmountInput.addEventListener("beforeinput", (event) => {
    if (event.inputType === "insertText") {
      event.preventDefault();
      if (event.data && /^\d+$/.test(event.data)) {
        appendDigits(event.data);
      }
      return;
    }

    if (
      event.inputType === "deleteContentBackward" ||
      event.inputType === "deleteContentForward"
    ) {
      event.preventDefault();
      if (
        contributionAmountInput.selectionStart === 0 &&
        contributionAmountInput.selectionEnd ===
          contributionAmountInput.value.length
      ) {
        amountDigits = "";
      } else {
        amountDigits = amountDigits.slice(0, -1);
      }
      renderAmount();
    }
  });

  contributionAmountInput.addEventListener("paste", (event) => {
    event.preventDefault();
    appendDigits(event.clipboardData?.getData("text") ?? "");
  });

  contributionAmountInput.addEventListener("input", () => {
    amountDigits = contributionAmountInput.value
      .replace(/\D/g, "")
      .slice(0, 12);
    renderAmount();
  });
}
