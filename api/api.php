<?php

require_once __DIR__ . '/db.php';

$config = json_decode(file_get_contents(__DIR__ . '/config.json'));

/*$connStr = sprintf('mysql:dbname=%s;host=%s;port=%s', $config->mysql->database, $config->mysql->host, $config->mysql->port);
$db = new DB($connStr, $config->mysql->user, $config->mysql->password);

$res = array();
foreach ($config->dataSources as $dsCfg) {
    $lastVal = $db->fetch('SELECT `date`, source_id, value FROM archive_numeric  WHERE source_id = ' . $dsCfg->id . ' ORDER BY `date` DESC LIMIT 1');
    if(!$lastVal) {
        $lastVal = array(
            'date' => date('Y-m-d H:i:s'),
            'source_id' => $dsCfg->id,
            'value' => (mt_rand(1200, 1300)/10).""
        );
    }
    $lastVal['name'] = $dsCfg->name;
    $lastVal['color'] = '#D9D4D3';
    $res [] = $lastVal;
}

//function getColor($dsCfg, $value)

echo $_GET['callback'] . '(' . json_encode($res) . ')';*/


$memcache = new Memcached();

if ($memcache->addServer('localhost', 11211) === false || @$memcache->getStats() === false) {
    throw new Exception('Could not connect to Memcache server ');
}

$res = array();
foreach ($config->dataSources as $dsCfg) {
    $lastVal = array(
        'date' => date('Y-m-d H:i:s'),
        'source_id' => $dsCfg->id,
        'name' => $dsCfg->name,
//        'value' => (mt_rand(1200, 1300)/10).""
        'value' => '0'
    );

    $date = $memcache->get('ds_d_'.$dsCfg->id);
    $value = $memcache->get('ds_v_'.$dsCfg->id);
    if($value !== false) {
        $lastVal['date'] = $date;
        $lastVal['value'] = $value;
    }

    $lastVal['color'] = '#D9D4D3';
    $res [] = $lastVal;
}


echo $_GET['callback'] . '(' . json_encode($res) . ')';