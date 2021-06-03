<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="../stylesheets/app.css" rel="stylesheet">
    <title>単語追加</title>
  </head>
  <body>
    <?php
    if(isset($_GET['japanese'])) { $japanese = $_GET['japanese']; }
    if(isset($_GET['english'])) { $english = $_GET['english']; }
    if(isset($_GET['level'])) { $level = $_GET['level']; }
    ?>
    <header>
      <?php if (isset($japanese)) { ?>
        <div class="registration">
          <p>登録が成功しました。</p>
          <p>英語：<?php echo $english ?></p>
          <p>日本語：<?php echo $japanese ?></p>
          <p>レベル：<?php echo $level ?></p>
        </div>
      <?php } ?>
    </header>


    <main>
    <div class="monitor">
      <div id="monitor-contents" class="monitor-contents">
        <div id="contents">
          <div class="content-text">
            <form action="../add.php" method="get">
              英語：<input type="text" name="english"><br>
              日本語：<input type="text" name="japanese"><br>
              <lavel for="lavel-select">レベル選択：</lavel>
              <select name="level" id="level-select">
                <option value="">-- level --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <br>
              <p><hr></p>
              <input type="submit" value="送信">
            </form>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="../javascripts/app.js"></script>
    </main>

    <footer>
      <copy id="copy">copyright 2021 Hiroki Kinjo & Mamoru Moriai.</copy>
    </footer>
  </body>
</html>