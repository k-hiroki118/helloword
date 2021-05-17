<?php
header("Content-type: application/json; charset=UTF-8");
// データベース種類 $dsn
$dsn = 'mysql:dbhost=localhost;dbname=hirokilab_typing';

// ユーザー名 $username
$user = 'root';
// パスワード $password
$password = '';

$sql_data;

/** 
 * DB接続
 * $db = new PDO('データベースの種類:host=接続先アドレス;dbname=データベース名', 'ユーザー名', 'パスワード');
*/ 
try {
// MySQLへの接続
$db = new PDO($dsn, $user, $password);

// 接続を使用する
$sth = $db->prepare('SELECT id,english_words,japanese FROM words ORDER BY RAND() LIMIT 10');
$sth->execute();
$sql_data = $sth->fetchAll(PDO::FETCH_ASSOC);

// 接続を閉じる
$db = null;

} catch(PDOException $e) {
  print "エラー!: " . $e->getMessage() . "<br/gt;";
  die();
}
/**
 * DB接続終了
 */

$data=[];
// 結果を出力
foreach ($sql_data as $keys => $values){
  foreach($values as $key => $val){
    $data[$key][] = $val;
  }
}
echo json_encode($data);