<?php

require_once __DIR__ .'/db.php';

//echo file_get_contents(__DIR__.'/config.json');exit;
$config = json_decode(file_get_contents(__DIR__.'/config.json'));
//print_r($config);exit;
$connStr = sprintf('mysql:dbname=%s;host=%s;port=%s', $config->mysql->database, $config->mysql->host, $config->mysql->port);
//echo $connStr;exit;
$db = new DB($connStr, $config->mysql->user, $config->mysql->password);

$res = array();
foreach($config->dataSources as $dsCfg) {
    $lastVal = $db->fetch('SELECT `date`, source_id, value FROM archive_numeric  WHERE source_id = '.$dsCfg->id.' ORDER BY `date` DESC LIMIT 1');
    $lastVal['name'] = $dsCfg->name;
    $res []= $lastVal;
}

echo json_encode($res);
//print_r($db->fetchAll('SELECT `date`, source_id, value FROM archive_numeric ORDER BY `date` DESC LIMIT 1'));

//echo $_GET['callback'].'({"A": 222})';

//self.db.query('SELECT `date`, source_id, value FROM archive_numeric WHERE source_id = ? ORDER BY `date` DESC LIMIT 1', [ds.id], function (rows, fields) {