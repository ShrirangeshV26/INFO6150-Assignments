const pad = (n) => String(n).padStart(2, "0");
const formatHMS = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const nameRegex = /^[A-Za-z0-9 '\-]{3,100}$/;

$(function(){
  const $display = $("#timerDisplay");
  const $notif   = $("#notif");

  const $date  = $("#eventDate");
  const $name  = $("#eventName");
  const $dErr  = $("#dateError");
  const $nErr  = $("#nameError");

  const $start = $("#startBtn");
  const $pause = $("#pauseBtn");
  const $stop  = $("#stopBtn");
  const $reset = $("#resetBtn");

  const $history = $("#history");
  const $stats   = $("#stats");
  const $filter  = $("#filterDate");

  $date.val(new Date().toISOString().slice(0,10));

  
  const clearErr = ($e)=>$e.text("");
  const validateDate = () => {
    if (!$date.val()) { $dErr.text("Please select a date"); return false; }
    $dErr.text(""); return true;
  };
  const validateName = () => {
    const v = $name.val().trim();
    if (!v) { $nErr.text("Event name is required"); return false; }
    if (v.length < 3) { $nErr.text("Event name must be at least 3 characters"); return false; }
    if (v.length > 100) { $nErr.text("Event name too long (max 100 characters)"); return false; }
    if (!nameRegex.test(v)) { $nErr.text("Event name contains invalid characters"); return false; }
    $nErr.text(""); return true;
  };
  $date.on("focus", ()=>clearErr($dErr));
  $name.on("focus", ()=>clearErr($nErr));
  $date.on("blur keyup change", validateDate);
  $name.on("blur keyup", validateName);

  const toast = (msg, type="info") =>
    $notif.stop(true,true)
      .removeClass("notice--success notice--error")
      .addClass(type==="success"?"notice--success":(type==="error"?"notice--error":""))
      .text(msg).fadeIn(100).delay(1000).fadeOut(250);
