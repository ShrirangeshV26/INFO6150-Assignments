const calculate = (num1, num2, operation) => {
  switch (operation) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      if (num2 === 0) throw new Error("Cannot divide by zero");
      return num1 / num2;
    default:
      throw new Error("Unknown operation");
  }
};

const numberRegex = /^-?\d+(\.\d+)?$/;
$(function () {
  const $toast = $("#toast");

  const showToast = (msg, type = "info") =>
    $toast
      .stop(true, true)
      .removeClass("notice--success notice--error")
      .addClass(
        type === "success"
          ? "notice--success"
          : type === "error"
          ? "notice--error"
          : ""
      )
      .text(msg)
      .fadeIn(120)
      .delay(1400)
      .fadeOut(300);

  // Auth check: sessionStorage first, then localStorage
  const raw =
    sessionStorage.getItem("calc_session") ||
    localStorage.getItem("calc_session");
  if (!raw) {
    window.location.replace("./index.html");
    return;
  }
  const session = JSON.parse(raw);
  if (!session?.isLoggedIn) {
    window.location.replace("./index.html");
    return;
  }
  $("#welcome").text(`Welcome, ${session.username}!`);

  const $n1 = $("#num1"),
    $n2 = $("#num2"),
    $r = $("#result");
  const $err1 = $("#num1Error"),
    $err2 = $("#num2Error");

  const clearErrors = () => {
    $err1.text("");
    $err2.text("");
  };

  const validateInput = ($input, $err) => {
    const v = $input.val().trim();
    if (!v || !numberRegex.test(v)) {
      $err.text("Please enter a valid number");
      return false;
    }
    $err.text("");
    return true;
  };

  $(".op").on("click", function () {
    clearErrors();
    const ok1 = validateInput($n1, $err1);
    const ok2 = validateInput($n2, $err2);
    if (!ok1 | !ok2) return;

    const num1 = parseFloat($n1.val().trim());
    const num2 = parseFloat($n2.val().trim());
    const op = $(this).data("op");

    try {
      const out = calculate(num1, num2, op);
      // jQuery chaining for UI update
      $r.val(out).fadeOut(0).fadeIn(120);
    } catch (e) {
      showToast(e.message, "error");
      $r.val("");
    }
  });

  $("#logoutBtn").on("click", () => {
    // Clear both storages to be safe
    sessionStorage.removeItem("calc_session");
    localStorage.removeItem("calc_session");
    $("body").fadeOut(250, () => window.location.replace("./index.html"));
  });

  // Accessibility: clear errors on focus
  $n1.on("focus", () => $err1.text(""));
  $n2.on("focus", () => $err2.text(""));
});
