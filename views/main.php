<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="../stylesheets/app.css" rel="stylesheet">
    <title>タイピングゲーム</title>
  </head>
  <body>
    <header id="header"></header>
    <main>
      <div class="monitor">
        <div id="monitor-contents" class="monitor-contents">
          <div id="contents">
            <div class="content-text">
              <p> こんにちは！<br>
                <span class="red">helloword.</span>へようこそ！<br>
                このサイトは、タイピングゲームサイトです。<br>
                あなたはどこまでレベルをあげられますか？
                <br>
                それでは、タイピングの世界へいってらっしゃい！
              </p>
            </div>
            <button id="start-btn" class="main-btn  btn-shadow"> 
              <p>スタート</p>
            </button>
            <button id="role-btn" class="main-btn btn-shadow js-modal-open" data-target="modal01">
              <p>ルール</p>
            </button>

            <!-- modal -->
            <div id="modal01" class="c-modal js-modal">
              <div class="c-modal_bg js-modal-close"></div>
                <div class="c-modal_content _lg">
                  <div class="c-modal_content_inner">
                    <p class="rule">表示された英単語をタイピングしてください。</p>
                    <p class="rule">最後まで正しく入力すると制限時間が追加され、次の英単語が表示されます。</p>
                    <p class="rule">制限時間内に入力した文字数がスコアとなります。</p>
                    <p class="rule"></p>
                    <p class="rule"></p>
                    <a class="js-modal-close c-modal_close" href=""><span class="modal-close">×</span></a>
                  </div>
                </div>
            </div>
            <!-- ./modal -->
          </div>
        </div>
      </div>
    </main>
    <script type="text/javascript" src="../javascripts/app.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- ウィンドウを開く -->
    <script>
    $( '.js-modal-open' ).each( function() {
      $( this ).on( 'click', function() {
        var target = $( this ).data( 'target' );
        var modal = document.getElementById( target );
        $( modal ).fadeIn( 300 );
        return false;
      });
    });
    </script>
    <!-- ウィンドウを閉じる -->
    <script>
    $( '.js-modal-close' ).on( 'click', function() {
      $( '.js-modal' ).fadeOut( 300 );
        return false;
    });
    </script>

    <footer>
      <copy id="copy">copyright 2021 Hiroki Kinjo & Mamoru Moriai.</copy>
    </footer>
  </body>
</html>
