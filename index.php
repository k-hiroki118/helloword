<?php
$host = "mysql57.hirokilab.sakura.ne.jp";
$dbName = "hirokilab_typing";
$user = "hirokilab";
$password = "hirokilab_db";
$dsn = "mysql:host={$host};dbname={$dbName};charser=utf8";


try {
    echo "接続開始";
  $pdo = new PDO($dsn, $user, $password);
  echo "接続成功";
} catch (PDOException $e) {
  echo "接続失敗: " . $e->getMessage() . "\n";
  exit();
}
echo '<h1>Hello World</h1>';
