// path取得
const path = location.href;
// urlを配列に変換
const pathinfo = path.split('/');
// 最後の要素（ファイル名）だけ抜き出し
const file_name = pathinfo.pop();
// ファイル名抜きで再度文字列に変換
const dir_name = pathinfo.join('/');
// http://〇〇/helloword/ を作成
pathinfo.pop();
const home_dir = pathinfo.join('/');

/**
 * top.php
 */ 
if (file_name == 'top.php') {
  var text = document.getElementById('text');
  var textLists = [
    "helloword."
  ];
  typing(text,textLists);
}


/**
 * タイピング動作設定
 * @param {文字列} text 
 * @param {配列} textLists 
 */
function typing(text,textLists) {
  var word = [];
  word = textLists[0].split("").map(function(value) {
    var span = document.createElement('span');
    span.textContent = value;
    text.appendChild(span);
    return span;
  });
  
  word[0].className ="under-line";
  
  window.addEventListener("keydown", function(e) {
    var keycd = e.key;
    if (word[0].innerHTML == keycd) {
      word[0].className = "red";
      text.insertBefore(word[0], word[1]);    
      if (word[1] != undefined) {
        word[1].className ="under-line";
      }
      console.log(text);
      word.shift();
    }
    // 「helloword.」が入力されたらmain画面へ遷移
    if (word.length == 0 ) {
      location_main();
    }
  });
}

/**
 * main 画面に遷移メソッド
 */
function location_main() {
  window.location.href = dir_name + '/main.php'; // 通常の遷移
}
/**
 * last 画面に遷移メソッド
 */
function location_last() {
  var dir_name = pathinfo.join('/')
  window.location.href = dir_name + '/last.php'; // 通常の遷移
}


var data = [];
/**
 * main.php
 */
if (file_name == 'main.php') {

  var monitor_contents = document.getElementById("monitor-contents");
  var contents = document.getElementById('contents');

  // <div id="timer"> を作成
  var div_timer = document.createElement('div');
  div_timer.setAttribute('id', 'timer');

  // <div id="timer"> を作成
  var div_text = document.createElement('div');
  div_text.setAttribute('id', 'text');

  // スタートボタン押下後のイベント
  document.querySelector('#start-btn').addEventListener('click',function(e) {

    // データ取得
    getdata();

    // ボタンイベントは動作しない。
    e.preventDefault();
    // #contentsにクラス「hidden」を追加
    contents.classList.add("hidden");
    // #monitor-contents に<div id="timer">を追加
    monitor_contents.appendChild(div_timer);

    // カウントダウン開始
    countDown();
  });
}



/**
 * Ajax接続
 */
function getdata() {
  // Ajax XMLHttpRequest() API取得
  var xhr = new XMLHttpRequest();
  xhr.open('GET', home_dir + '/main.php');
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) { // 通信の完了時
      if (xhr.status == 200) { // 通信の成功時
        data = JSON.parse(xhr.responseText);
      }
    }else{
    }
  }
}

/**
 * カウントダウン処理
 */
function countDown() {
  setTimeout(function() {
    var count = 5;
    var id = setInterval(function() {
      document.querySelector('#timer').textContent=count;
      if (count <= 0) {
        clearInterval(id)
        document.querySelector('#timer').textContent="START!";
        document.querySelector('#timer').classList.add("hidden");
        console.log(data);
      };
      count--;
    },1000);
  },500);
}