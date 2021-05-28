<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="../stylesheets/app.css" rel="stylesheet">
    <title>タイピングゲーム</title>
  </head>
  <body>
    <header></header>
    <main>
      <div class="monitor">
        <div id="monitor-contents" class="monitor-contents">
          <div id="score-contents">
            <div id="score-title">
              <p>結果</p>
              <hr>
            </div>
            <div class="score-data">
              <div id="scoreAria">
                スコア：<span id="score"></span>
              </div>
              <div id="rankAria">
                ランク：<span id="rank"></span>
              </div>
              <div id="submitWordAria">
                入力単語数<br><span id="submitWord" class="typ-data"></span>単語
              </div>
              <div id="accuracyRateAria">
                正確率<br><span id="accuracyRate" class="typ-data"></span>％
              </div>
              <div id="typAverageAria">
                タイプ速度<br><span id="typAverage" class="typ-data"></span> 回/秒
              </div>
            </div>
          </div>
          <button id="again-btn" class="main-btn btn-shadow"> 
            <p>もう一度</p>
          </button>
        </div>
      </div>
      <script type="text/javascript" src="../javascripts/app.js"></script>
    </main>

    <footer>
      <copy id="copy">copyright 2021 Hiroki Kinjo & Mamoru Moriai.</copy>
    </footer>
  </body>
</html>
