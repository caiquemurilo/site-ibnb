const formatInputWithMask = (input, maxDigits, formatDigits) => {
  input.addEventListener("input", () => {
    const caretPosition = input.selectionStart ?? input.value.length;
    const digitsBeforeCaret = input.value
      .slice(0, caretPosition)
      .replace(/\D/g, "").length;
    const digits = input.value.replace(/\D/g, "").slice(0, maxDigits);
    const formattedValue = formatDigits(digits);

    input.value = formattedValue;

    if (digitsBeforeCaret === 0) {
      input.setSelectionRange(0, 0);
      return;
    }

    let formattedCaretPosition = 0;
    let digitsCount = 0;
    while (
      formattedCaretPosition < formattedValue.length &&
      digitsCount < digitsBeforeCaret
    ) {
      if (/\d/.test(formattedValue[formattedCaretPosition])) {
        digitsCount += 1;
      }
      formattedCaretPosition += 1;
    }

    input.setSelectionRange(
      formattedCaretPosition,
      formattedCaretPosition,
    );
  });
};

document.querySelectorAll("[data-phone-mask]").forEach((input) => {
  if (input instanceof HTMLInputElement) {
    formatInputWithMask(input, 11, (digits) => {
      const areaCode = digits.slice(0, 2);
      const subscriber = digits.slice(2);
      let formattedPhone = areaCode ? `(${areaCode}` : "";

      if (areaCode.length === 2) {
        formattedPhone += `) ${subscriber.slice(0, 5)}`;
        if (subscriber.length > 5) {
          formattedPhone += `-${subscriber.slice(5)}`;
        }
      }

      return formattedPhone;
    });
  }
});

document.querySelectorAll("[data-cpf-mask]").forEach((input) => {
  if (input instanceof HTMLInputElement) {
    formatInputWithMask(input, 11, (digits) => {
      let formattedCpf = digits.slice(0, 3);
      if (digits.length > 3) {
        formattedCpf += `.${digits.slice(3, 6)}`;
      }
      if (digits.length > 6) {
        formattedCpf += `.${digits.slice(6, 9)}`;
      }
      if (digits.length > 9) {
        formattedCpf += `-${digits.slice(9, 11)}`;
      }
      return formattedCpf;
    });
  }
});
