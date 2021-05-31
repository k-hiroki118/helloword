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

// sound
// main.php BGM
const mainBGM = new Audio ('../sound/main_bgm.mp3');
// スタート時の効果音
const startSound = new Audio('../sound/start.mp3');
// タイピング時の効果音
const typingSound = new Audio('../sound/typsound.mp3');
// タイピング時の効果音
const submitSound = new Audio('../sound/submit2.mp3');


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
 * タイピングの変数
 * 
 * 欲しい結果　（スコア、ランク、単語数、正解数、平均タイピング速度）
 * 
 * 必要な変数
 * 
 ***入力系***
 * 　入力文字数 (入力するたびにカウント)
 * 　正解文字数 (正解するたびにカウント)
 * 　正解単語数 (単語が入力完了するたびにカウント)
 * 
 ***スコア系***
 * 　 スコア (入力する度に10p)
 * 
 */

 // 入力文字数
 var input_key = 0;
 // 正解文字合計数
 var submit_key_total = 0;
 // 正解文字数
 var submit_key = 0;
 // ミスタイプ数
 var miss_key = 0;
 // 正解単語数
 var submit_word = 0;
 // スコア
 var score = 0;


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

    // タイピング効果音
    typingSound.play();
    typingSound.currentTime = 0;

    // 入力数を取得 input_key
    input_key++;
    console.log('input_key='+input_key);

    // 入力した値をkeycdへ代入
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
      // 正解数を取得
      submit_key++;
      // 正解合計数を取得
      submit_key_total++;

      // 入力済文字は赤色に
      word[0].className = "red";
      if (word[1] != undefined) {
        word[1].className ="under-line";
      }
      // wordから入力済文字を削除
      word.shift();
    } else {
      // ミスタイプ数を取得
      miss_key++;
    }

    // 全て入力したら
    if (word.length == 0 ) {
      // 「top.php」の場合、main画面へ遷移
      if (file_name == 'top.php') {
        location_main();
      } else {

        // 正解効果音
        submitSound.play();
        submitSound.currentTime = 0;
        

        // splice で入力済の単語を配列から削除
        translationLists.splice(rnd,1);
        textLists.splice(rnd,1);
        
        // 成功単語数
        submit_word++;
        // スコアをセット
        score += scoreSet(calculation());

        //次の単語に切り替え
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
 * score 画面に遷移メソッド
 */
function location_score() {
  window.location.href = dir_name + '/score.php'; // 通常の遷移
}

/**
 * main.php
 */
if (file_name == 'main.php') {

  //game_status をfalseに変更
  game_status = false;

  // header 取得 
  var header = document.getElementById("header");
  
  // class="monitor" 取得 
  var monitor = document.getElementsByClassName('monitor');

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
  
  // <div id="game_score"> を作成
  var game_score = document.createElement('div');
  game_score.setAttribute('id', 'game_score');

  // スタートボタン押下後のイベント
  document.querySelector('#start-btn').addEventListener('click',function(e) {
    if(game_status) return;
    game_status = true;

    // スタート効果音
    startSound.play();
    startSound.currentTime = 0;

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
    
    // #header に<div id="game_score">を追加
    header.appendChild(game_score);

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
    monitor[0].appendChild(div_endmonitor);
    div_endmonitor.appendChild(div_endtext);

    // スコアセット
    scoreSet(0);
    // タイマーセット
    timer();
    // タイピング開始
    typing(div_text,data['english_words'],data['japanese']);
  }
  
  /**
   * スコア計算
   */
  function calculation() {
    var add_score = 0;
    // 文字数×10pt
    add_score = submit_key * 10;
    
    // パーフェクトだった場合
    // 6文字以上で +5pt
    // 11文字以上で +15pt
    // 16文字以上で +25pt
    if (miss_key == 0) {
      if (submit_key > 5 && submit_key <= 10) {
        add_score += 5;
      }else if(submit_key > 10 && submit_key <= 15) {
        add_score += 15;
      } else if (submit_key > 15) {
        add_score += 25;
      }
    }

    // 正解数とミスタイプ数を初期化
    submit_key = 0;
    miss_key = 0;

    console.log('add_score='+add_score);
    return add_score;
  }

  var i = 0;
  /**
   * ゲームスコア設定
   */
  function scoreSet(add_score) {

    i = score;
    var max_score = add_score + score;
    document.querySelector('#game_score').textContent = 'score:' + i;

    var id = setInterval(function() {
      // add_score + scoreになったら
      if (i == max_score) {
        clearInterval(id);
      } else {
        i++;
        document.querySelector('#game_score').textContent = 'score:' + i;
      };
    },15);

    return add_score;
  }

  /**
   * ゲーム中のカウントダウン
   */
  function timer() {
    count = 5;
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
    monitor_contents.remove();
    game_timer.remove();
    game_score.remove();

    //セッションにデータを保存
    //セッション有無
    sessionStorage.setItem('session_existence',true);
    // 入力文字数
    sessionStorage.setItem('input_key', input_key);
    // 正解文字合計数
    sessionStorage.setItem('submit_key_total', submit_key_total);
    // ミスタイプ数
    sessionStorage.setItem('miss_key',miss_key);
    // 正解単語数
    sessionStorage.setItem('submit_word', submit_word);
    // スコア
    sessionStorage.setItem('score', score);
    
    setTimeout(function (){
      div_endmonitor.classList.toggle("hidden");
      setTimeout(location_score,3000);
    },1000);
  }
}

/**
 * score.php
 */
 if (file_name == 'score.php') {
  //セッション取得
  var existence = sessionStorage.getItem('session_existence');

  // セッションが存在しなかったらmain.phpへ遷移
  if(existence == null) {
    location_main();
  };

  // スコア取得
  score = sessionStorage.getItem('score'); 
  // 入力文字数取得
  input_key = sessionStorage.getItem('input_key');
  // タイプミス数取得
  miss_key = sessionStorage.getItem('miss_key');
  // 正解文字合計数取得
  submit_key_total = sessionStorage.getItem('submit_key_total');
  // 成功単語数取得
  submit_word = sessionStorage.getItem('submit_word');

  
  // id="score" 取得
  var score_set = document.getElementById('score');
  // id="score" にスコアを設定
  // score_set.textContent = score;
  scoreLag(score_set, score, 8000);

  // id="rank" 取得
  var rank_set = document.getElementById('rank');
  // id="rank" にランクを設定
  // rank_set.textContent = rankSet(score);
  scoreLag(rank_set, rankSet(score), 10000);

  // id="submitWord" 取得 
  var submit_word_set = document.getElementById('submitWord');
  // id="submitWord" に成功単語数を設定
  // submit_word_set.textContent = submit_word;
  scoreLag(submit_word_set, submit_word, 6000);

  // id="accuracyRate" 取得
  var accuracy_rate_set = document.getElementById('accuracyRate');
  // id="accuracyRate" に正解率を設定
  // accuracy_rate_set.textContent = accuracyRateSet(input_key,submit_key_total);
  scoreLag(accuracy_rate_set, accuracyRateSet(input_key, submit_key_total), 4000);

  // id="typAverage" 取得 
  var typ_average_set = document.getElementById('typAverage');
  // id="typAverage" に平均タイピング速度を設定
  // typ_average_set.textContent = typAverageSet(input_key);
  scoreLag(typ_average_set, typAverageSet(input_key), 2000);

  
  // スコア表示に時間差を持たせる関数
  function scoreLag(tag, itm, sec) {
    var stopwatch = setInterval(function(){
      tag.textContent = Math.round( Math.random()*1000 );
    }, 50)
    setTimeout(function(){
      clearInterval(stopwatch);
      tag.textContent = itm;
    }, sec)
  }


  console.log(score);

  /**
   * ランク設定
   * 
   * S〜SSSは非公開で設定
   * 
   * 　SSSランク＝5000以上
   * 　SSランク＝3000以上
   * 　Sランク＝2000以上
   * 　Aランク＝1500以上
   * 　Bランク＝1000以上
   * 　Cランク＝500以上
   * 　Dランク＝499以下
   * 　Eランク＝100以下
   */
  function rankSet(total_score) {
    var rank = '';

    if (total_score >= 5000) {
      rank = 'SSS';
    } else if (total_score <= 4999 && total_score >= 3000) {
      rank = 'SS';
    } else if (total_score <= 2999 && total_score >= 2000) {
      rank = 'S';
    } else if (total_score <= 1999 && total_score >= 1500) {
      rank = 'A';
    } else if (total_score <= 1499 && total_score >= 1000) {
      rank = 'B';
    } else if (total_score <= 999 && total_score >= 500) {
      rank = 'C';
    } else if (total_score <= 499 && total_score >= 100) {
      rank = 'D';
    } else if (total_score <= 99) {
      rank = 'E'
    }
    return rank;
  }

  /**
   * 一秒間の平均タイピング速度を設定
   */
  function typAverageSet(input_key) {
    var accuracyAve = 0;
    accuracyAve = input_key / 60 ;
    // 小数点第1位で返す
    return accuracyAve.toFixed(1);
  }

  /**
   * タイピング成功率を設定
   */
  function accuracyRateSet(input_key,submit_key_total) {
    var accuracyRate = 0;
    accuracyRate = submit_key_total / input_key * 100;
    // 小数点第1位で返す
    console.log(input_key,submit_key_total,accuracyRate);
    return accuracyRate.toFixed(1);
  }

  // スタートボタン押下後のイベント
  document.querySelector('#again-btn').addEventListener('click',function(e) {
    location_main()
  });
}