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


// main.phpで扱うグローバル変数

// Ajaxで取得したデータを格納 
var data = [];
// ゲームのステータス 実行:true 停止:false
var game_status = false;

/**
 * top.php
 */ 
if (file_name == 'top.php') {
  game_status = true;
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
function typing(text,textLists,translationLists = null) {

  // <div id="translation"> を取得
  var translation = document.getElementById('translation');
  var word = [];
  // 乱数格納変数
  var rnd;

  // createTextメソッド呼び出し
  createText();

  /**
  * word[]に文字を作る
  */ 
  function createText() {
    // text を初期化
    text.textContent='';
    
    // 乱数取得
    rnd = Math.floor( Math.random() * textLists.length );
    
    // 翻訳設定
    if (translationLists) {
      translation.textContent = '';
      var span1 = document.createElement('span');
      span1.textContent = translationLists[rnd];
      translation.appendChild(span1);
    }
    
    // textListsの一文字を<span>で囲う
    word = textLists[rnd].split("").map(function(value) {
      var span2 = document.createElement('span');
      span2.textContent = value;
      text.appendChild(span2);
      return span2;
    });
    // 最初の文字に下線を引く
    word[0].className ="under-line";
  }

  // キーボード押下時に発生
  window.addEventListener("keydown", function(e) {
    // timer() が0になったら機能を停止する。
    if(!game_status){
      return;  
    }
    var keycd = e.key;

    // escapeを押下したらゲーム終了
    // 一度「esc」を押しても作用しないことがあるから3秒長押しする。
    if (file_name == 'main.php') {
      if(keycd == 'Escape') {
        // スタート画面に遷移 
        location_main();
      }
    }

    // 入力した文字が正しかったら
    if (word[0].textContent == keycd) {
      word[0].className = "red";
      if (word[1] != undefined) {
        word[1].className ="under-line";
      }
      word.shift();
    }

    // 全て入力したら
    if (word.length == 0 ) {
      // 「top.php」の場合、main画面へ遷移
      if (file_name == 'top.php') {
        location_main();
      } else {
        // splice で入力済の単語を配列から削除
        translationLists.splice(rnd,1);
        textLists.splice(rnd,1);
        createText();
      }
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
  window.location.href = dir_name + '/top.php'; // 通常の遷移
}

/**
 * main.php
 */
if (file_name == 'main.php') {

  //game_status をfalseに変更
  game_status = false;

  // header 取得 
  var header = document.getElementById("header");

  // moniter_contents 取得
  var monitor_contents = document.getElementById("monitor-contents");
  // contents を取得
  var contents = document.getElementById('contents');

  // <div id="count_timer"> を作成
  var count_timer = document.createElement('div');
  count_timer.setAttribute('id', 'count_timer');

  // <div id="game_timer"> を作成
  var game_timer = document.createElement('div');
  game_timer.setAttribute('id', 'game_timer');

  // スタートボタン押下後のイベント
  document.querySelector('#start-btn').addEventListener('click',function(e) {
    if(game_status) return;
    game_status = true;

    // データ取得
    getdata();

    // ボタンイベントは動作しない。
    e.preventDefault();
    // #contentsにクラス「hidden」を追加
    contents.classList.add("hidden");
    // #monitor-contents に<div id="count_timer">を追加
    monitor_contents.appendChild(count_timer);

    // #header に<div id="game_timer">を追加
    header.appendChild(game_timer);

    // カウントダウン開始
    countDown();

    // ゲーム開始関数呼び出し
    function gamestart(){
      console.log('game_start');
      game();
    }
    setTimeout(gamestart,7500);

  });
  
  
  
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
        // 通信エラーの場合を考える。
      }
    }
  }
  
  /**
   * ゲーム開始カウントダウン処理
   */
  function countDown() {
    setTimeout(function() {
      var count = 5;
      var id = setInterval(function() {
        document.querySelector('#count_timer').textContent = count;
        if (count <= 0) {
          clearInterval(id)
          document.querySelector('#count_timer').textContent="START!";
          document.querySelector('#count_timer').classList.add("hidden");
        };
        count--;
      },1000);
    },500);
  }
  
  /**
   * タイピングゲームスタート
   */
  function game() {
    // <div id="text"> を作成
    var div_text = document.createElement('div');
    div_text.setAttribute('id', 'text');

    // <div id="translation">を作成
    var div_translation = document.createElement('div');
    div_translation.setAttribute('id', 'translation');

    // <div id="end-monitor">を作成
    var div_endmonitor = document.createElement('div');
    div_endmonitor.setAttribute('id','end-monitor');

    // <div id="end-text">を作成
    var div_endtext = document.createElement('div');
    div_endtext.setAttribute('id','end-text');
    div_endtext.textContent = '終了！！';
    


    // #monitor-contents に作成した要素を追加
    monitor_contents.appendChild(div_text);
    monitor_contents.appendChild(div_translation);
    monitor_contents.appendChild(div_endmonitor);
    div_endmonitor.appendChild(div_endtext);



    timer();
    typing(div_text,data['english_words'],data['japanese']);
  }

  /**
   * ゲーム中のカウントダウン
   */
  function timer() {
    count = 59;
    document.querySelector('#game_timer').textContent = '01:00';
    var id = setInterval(function() {
      if (count < 10) {
        document.querySelector('#game_timer').textContent = '00:0'+count;
      } else {
        document.querySelector('#game_timer').textContent = '00:'+count;
      }

      // カウントダウンが0になったら
      if (count <= 0) {
        clearInterval(id);
        //game_status をfalseに変更
        game_status = false;
        game_end();
      };
      count--;
    },1000);
  }

  /**
   * ゲーム終了
   */
  function game_end() {
    var div_endmonitor = document.getElementById('end-monitor');
    div_endmonitor.className ="active";
  }
  
  
}