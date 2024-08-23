<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <link href="/stylesheets/app.css" rel="stylesheet">
    <title>タイピングゲーム</title>
  </head>
  <body class="score-body">
    <header></header>
    <main>
      <div class="monitor">
        <div id="monitor-contents" class="monitor-contents">
          <div class="score-sheets">
            <div class="score-title">
              <p>Hello Word.</p>
            </div>
            <div class="score-rank">
              <p><span id="rank"></span></p>
            </div>
            <ul class="score-ul">
              <li>スコア：<span id="score"></span></li>
              <li>入力単語数：<span id="submitWord"></span>単語</li>
              <li>正確率：<span id="accuracyRate"></span>％</li>
              <li>タイプ速度：<span id="typAverage"></span> 回/秒</li>
            </ul>
          </div>
          <button id="again-btn" class="main-btn btn-shadow"> 
            <p>もう一度</p>
          </button>
        </div>
      </div>
      <script type="text/javascript" src="/javascripts/app.js"></script>
    </main>

    <footer>
      <copy id="copy">copyright 2021 Hiroki Kinjo & Mamoru Moriai.</copy>
    </footer>
  </body>
</html>
