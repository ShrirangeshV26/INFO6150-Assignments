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