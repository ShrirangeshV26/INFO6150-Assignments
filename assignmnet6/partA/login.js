/* Hardcoded users (email+password). Emails must end with @northeastern.edu */
const USERS = [
  { email: "student1@northeastern.edu", password: "password123" },
  { email: "student2@northeastern.edu", password: "hunter2pass" },
  { email: "demo@northeastern.edu", password: "demopass8" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nuSuffix = /@northeastern\.edu$/i;

$(function () {
  const $email = $("#email");
  const $pass = $("#password");
  const $remember = $("#rememberMe");
  const $btn = $("#loginBtn");

  const $emailErr = $("#emailError");
  const $passErr = $("#passwordError");
  const $credErr = $("#credentialsError");
  const $success = $("#successMsg");

  // helpers
  const isEmailValid = (v) => v && emailRegex.test(v) && nuSuffix.test(v);
  const isPassValid = (v) => v && v.length >= 8;

  const clearFieldError = ($err) => $err.text("");

  const validateEmail = () => {
    const v = $email.val().trim();
    if (!v || !emailRegex.test(v) || !nuSuffix.test(v)) {
      $emailErr.text("Please enter a valid Northeastern email");
      return false;
    }
    $emailErr.text("");
    return true;
  };

  const validatePass = () => {
    const v = $pass.val();
    if (!v) {
      $passErr.text("Password is required");
      return false;
    }
    if (v.length < 8) {
      $passErr.text("Password must be at least 8 characters");
      return false;
    }
    $passErr.text("");
    return true;
  };

  const updateButton = () => {
    const ok = validateEmail() & validatePass();
    // bitwise & returns number; convert to boolean
    $btn.prop("disabled", !Boolean(ok));
  };

  // Validation: keyup + blur; clear errors on focus
  $email
    .on("keyup blur", updateButton)
    .on("focus", () => clearFieldError($emailErr));
  $pass
    .on("keyup blur", updateButton)
    .on("focus", () => clearFieldError($passErr));

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();
    $credErr.text("");

    const email = $email.val().trim();
    const password = $pass.val();

    // final validation check
    if (!validateEmail() | !validatePass()) return;

    const found = USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      $credErr.text("Invalid email or password");
      return;
    }

    // Build session
    const username = email.split("@")[0];
    const session = {
      username,
      email,
      loginTimestamp: new Date().toISOString(),
      isLoggedIn: true,
    };

    // Store in chosen storage
    const storage = $remember.is(":checked") ? localStorage : sessionStorage;
    storage.setItem("calc_session", JSON.stringify(session));

    // Success animation + redirect
    $success
      .stop(true, true)
      .fadeIn(150)
      .delay(1200)
      .fadeOut(400, () => {
        window.location.href = "./calculator.html";
      });
  });
});
