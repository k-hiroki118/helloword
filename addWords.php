<?php
require_once('db.php');
$sql = null;
$res = null;
$db = null;
// 変数の初期化 & 日時の取得
date_default_timezone_set('Asia/Tokyo');
$japanese = $_GET['japanese'];
$english = $_GET['english'];
$level = (int) $_GET['level'];
$now = date('Y-m-d H:i:s');
try {
     // MySQLへの接続
    $pdo = new PDO($dsn, $user, $password);
    // SQL作成
    $sql = "INSERT INTO word ( level, japanese, english, created_at , updated_at , status )
             VALUES (:level , :japanese , :english , :now , :now , :status )";
    // 挿入する値は空のまま、SQL実行の準備をする
    $sth = $pdo -> prepare($sql);
    //クエリのパラメータに合わせて値を組み込む
    $sth -> bindValue(':level', $level);
    $sth -> bindValue(':japanese', $japanese);
    $sth -> bindValue(':english', $english);
    $sth -> bindValue(':now', $now);
    $sth -> bindValue(':status', 0);
    // 組み込み後のSQL文を実行
    $sth -> execute();
    // 接続を閉じる
    $pdo = null;
  } catch(PDOException $e) {
    print "エラー!: " . $e->getMessage() . "<br/gt;";
    die();
    exit;
  }
  /**
   * DB接続終了
   */
$redirect = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . "/add.php";
header("Location:$redirect". '?japanese='.$japanese . '&english='.$english . '&level='.$level);

