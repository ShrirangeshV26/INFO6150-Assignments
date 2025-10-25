const pad = (n) => String(n).padStart(2, "0");
const formatHMS = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const nameRegex = /^[A-Za-z0-9 '\-]{3,100}$/;

$(function () {
  const $display = $("#timerDisplay");
  const $notif = $("#notif");

  const $date = $("#eventDate");
  const $name = $("#eventName");
  const $dErr = $("#dateError");
  const $nErr = $("#nameError");

  const $start = $("#startBtn");
  const $pause = $("#pauseBtn");
  const $stop = $("#stopBtn");
  const $reset = $("#resetBtn");

  const $history = $("#history");
  const $stats = $("#stats");
  const $filter = $("#filterDate");

  // default date = today
  $date.val(new Date().toISOString().slice(0, 10));

  // Validation helpers
  const clearErr = ($e) => $e.text("");
  const validateDate = () => {
    if (!$date.val()) {
      $dErr.text("Please select a date");
      return false;
    }
    $dErr.text("");
    return true;
  };
  const validateName = () => {
    const v = $name.val().trim();
    if (!v) {
      $nErr.text("Event name is required");
      return false;
    }
    if (v.length < 3) {
      $nErr.text("Event name must be at least 3 characters");
      return false;
    }
    if (v.length > 100) {
      $nErr.text("Event name too long (max 100 characters)");
      return false;
    }
    if (!nameRegex.test(v)) {
      $nErr.text("Event name contains invalid characters");
      return false;
    }
    $nErr.text("");
    return true;
  };
  $date.on("focus", () => clearErr($dErr));
  $name.on("focus", () => clearErr($nErr));
  $date.on("blur keyup change", validateDate);
  $name.on("blur keyup", validateName);

  const toast = (msg, type = "info") =>
    $notif
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
      .fadeIn(100)
      .delay(1000)
      .fadeOut(250);

  // Stopwatch state
  let intervalId = null;
  let seconds = 0;
  let paused = false;

  const setRunningUI = (running) => {
    // disable inputs while running
    $date.prop("disabled", running);
    $name.prop("disabled", running);
    $start.prop("disabled", running);
    $pause.prop("disabled", !running);
    $stop.prop("disabled", !running);
    $reset.prop("disabled", false);
  };

  // Promise-based tick
  const startTimer = () =>
    new Promise((resolve) => {
      intervalId = setInterval(() => {
        if (!paused) {
          seconds += 1;
          $display.text(formatHMS(seconds));
        }
      }, 1000);
      resolve(true);
    });

  const stopTimer = async () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const saveSession = (dateStr, nameStr, durationSecs) => {
    const key = "stopwatch_sessions";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.unshift({
      date: dateStr,
      name: nameStr,
      duration: durationSecs,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(existing));
  };

  const loadSessions = () =>
    JSON.parse(localStorage.getItem("stopwatch_sessions") || "[]");

  const renderHistory = () => {
    const all = loadSessions();
    const filter = $filter.val();
    const list = filter ? all.filter((s) => s.date === filter) : all;

    if (!list.length) {
      $history.html(`<div class="empty">No sessions recorded yet</div>`);
    } else {
      $history.html(
        list
          .map(
            (s) => `
        <div class="history__item">
          <div><strong>${s.name}</strong></div>
          <div class="muted">${s.date}</div>
          <div class="pill">${formatHMS(s.duration)}</div>
        </div>
      `
          )
          .join("")
      );
    }

    // Stats
    const totalCount = list.length;
    const totalTime = list.reduce((acc, s) => acc + s.duration, 0);
    $stats.html(`
      <div class="stats__row">
        <div><strong>Total sessions:</strong> ${totalCount}</div>
        <div><strong>Total time:</strong> ${formatHMS(totalTime)}</div>
      </div>
    `);
  };

  renderHistory();

  $filter.on("change", renderHistory);

  // Controls
  $start.on("click", async () => {
    if (!validateDate() | !validateName()) return;

    if (intervalId) return; // already running
    seconds = 0;
    paused = false;
    $display.text("00:00:00");
    setRunningUI(true);
    await startTimer(); // async/await usage
    toast("Timer started", "success");
    $pause.text("Pause");
  });

  $pause.on("click", async () => {
    if (!intervalId) return;
    paused = !paused;
    $pause.text(paused ? "Resume" : "Pause");
    toast(paused ? "Paused" : "Resumed");
  });

  $stop.on("click", async () => {
    if (!intervalId) return;
    await stopTimer();
    setRunningUI(false);
    const dateStr = $date.val();
    const nameStr = $name.val().trim();
    saveSession(dateStr, nameStr, seconds);
    renderHistory();
    toast("Session saved", "success");
  });

  $reset.on("click", async () => {
    await stopTimer();
    seconds = 0;
    paused = false;
    $display.text("00:00:00");
    $pause.text("Pause");
    $pause.prop("disabled", true);
    $stop.prop("disabled", true);
    // inputs become enabled only when not running
    $date.prop("disabled", false);
    $name.prop("disabled", false);
    $start.prop("disabled", false);
    toast("Reset");
  });
});
