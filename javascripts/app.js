// path取得
const path = location.href;
// urlを配列に変換
const pathinfo = path.split('/');
// 最後の要素（ファイル名）だけ抜き出し
const file_name = pathinfo.pop();
// ファイル名抜きで再度文字列に変換
const dir_name = pathinfo.join('/')


// top.php
if(file_name == 'top.php'){
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
  word =textLists[0].split("").map(function(value){
    var span = document.createElement('span');
    span.textContent = value;
    text.appendChild(span);
    return span;
  });
  
  word[0].className ="under-line";
  
  window.addEventListener("keydown", function(e){
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
    if (word.length == 0 ){
      location_main();
    }
  });
}



// main 画面に遷移メソッド
function location_main(){
  window.location.href = dir_name + '/main.php'; // 通常の遷移
}

// last 画面に遷移メソッド
function location_last(){
  var dir_name = pathinfo.join('/')
  window.location.href = dir_name + '/last.php'; // 通常の遷移
}