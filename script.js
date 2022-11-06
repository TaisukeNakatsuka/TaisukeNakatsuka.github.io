let startButton; // startボタン
let stopButton; // stopボタン
let resetButton; // resetボタン
let showTime; // 表示時間
let resultComment; //結果表示
let result; //

let timer; // setinterval, clearTimeoutで使用
let startTime; // 開始時間
let elapsedTime = 0; // 経過時間
let holdTime = 0; // 一時停止用に時間を保持
let expected = 0; //expected入力値

window.onload = function () {
  startButton = document.getElementById("start");
  stopButton = document.getElementById("stop");
  resetButton = document.getElementById("reset");
  showTime = document.getElementById("time");
  resultComment = document.getElementById("resultComment");
  document.getElementById("expected").value = 3;
  resultComment.textContent = "";
};

// スタートボタン押下時
function start() {
  showTime.style.visibility = "hidden";
  // 開始時間を現在の時刻に設定
  startTime = Date.now();

  // 時間計測
  measureTime();
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
}

// ストップボタン押下時
function stop() {
  showTime.style.visibility = "visible";
  expected = document.getElementById("expected").value;
  test();
  resultComment.textContent = result;
  // タイマー停止
  clearInterval(timer);

  // 停止時間を保持
  holdTime += Date.now() - startTime;

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
}

// リセットボタン押下時
function reset() {
  document.getElementById("time").style.visibility = "visible";
  document.getElementById("expected").value = 3;
  resultComment.textContent = "";
  // タイマー停止
  clearInterval(timer);

  // 変数、表示を初期化
  elapsedTime = 0;
  holdTime = 0;
  showTime.textContent = "00:00.000";

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
}

// 時間を計測（再帰関数）
function measureTime() {
  // タイマーを設定
  timer = setTimeout(function () {
    // 経過時間を設定し、画面へ表示
    elapsedTime = Date.now() - startTime + holdTime;
    showTime.textContent = new Date(elapsedTime).toISOString().slice(14, 23);

    // 関数を呼び出し、時間計測を継続する
    measureTime();
  }, 10);
}

function test() {
  if (expected == 0) {
    result = "1-20(sec)を入力してくださいね";
  } else if (expected > 20) {
    result = "1-20(sec)を入力してくださいね";
  } else if (
    expected * 1000 + 500 > elapsedTime &&
    elapsedTime > expected * 1000 - 500
  ) {
    result = "Yay! Test PASSED.";
  } else result = "Test FAILED. Keep trying!";
}
