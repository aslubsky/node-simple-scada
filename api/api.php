<?php

require_once __DIR__ . '/db.php';

//echo file_get_contents(__DIR__.'/config.json');exit;
$config = json_decode(file_get_contents(__DIR__ . '/config.json'));
//print_r($config);exit;
$connStr = sprintf('mysql:dbname=%s;host=%s;port=%s', $config->mysql->database, $config->mysql->host, $config->mysql->port);
//echo $connStr;exit;
$db = new DB($connStr, $config->mysql->user, $config->mysql->password);

$res = array();
foreach ($config->dataSources as $dsCfg) {
    $lastVal = $db->fetch('SELECT `date`, source_id, value FROM archive_numeric  WHERE source_id = ' . $dsCfg->id . ' ORDER BY `date` DESC LIMIT 1');
    if(!$lastVal) {
        $lastVal = array(
            'date' => date('Y-m-d H:i:s'),
            'source_id' => $dsCfg->id,
            'value' => mt_rand(1200, 1300)/10
        );
    }
    $lastVal['name'] = $dsCfg->name;
    $lastVal['color'] = '#D9D4D3';
    $res [] = $lastVal;
}

//function getColor($dsCfg, $value)

echo $_GET['callback'] . '(' . json_encode($res) . ')';
//print_r($db->fetchAll('SELECT `date`, source_id, value FROM archive_numeric ORDER BY `date` DESC LIMIT 1'));

//echo $_GET['callback'].'({"A": 222})';

//self.db.query('SELECT `date`, source_id, value FROM archive_numeric WHERE source_id = ? ORDER BY `date` DESC LIMIT 1', [ds.id], function (rows, fields) {