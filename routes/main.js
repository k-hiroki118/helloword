var express = require('express');
var router = express.Router();

var mysql = require('mysql');

/**
 * mysqlの設定情報
 *  
 * ホスト：mysql727.db.sakura.ne.jp || 163.43.102.88
 * ユーザ名：hirokilab
 * パスワード：aaaaaaa1
 * DB名：hirokilab_typing
 */
var mysql_setting = {
  host : 'mysql727.db.sakura.ne.jp',
  user : 'hirokilab',
  port : '3306',
  password : 'aaaaaaa1',
  database : 'hirokilab_typing'
}

/* GETアクセス処理 */
router.get('/', function(req, res, next) {

  // コネクションの用意
  var connection = mysql.createConnection(mysql_setting);

  // データベースに接続
  connection.connect();

  // データを取り出す
  connection.query('SELECT * FROM categories',
    function(error , results , fields ) {
      if (error) throw error;
        console.log('Connected');
        res.render('main');
    });
  
  // 接続を解除
  connection.end();
});

module.exports = router;
