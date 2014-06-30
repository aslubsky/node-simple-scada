<?php

class DB {
    private $conn;

    public function __construct($connStr, $user, $pass)
    {
        $this->conn = new PDO($connStr, $user, $pass);
        $init = array(
            'SET CHARACTER SET UTF8',
            'SET character_set_client = "utf8"',
            'SET character_set_results = "utf8"',
            'SET collation_connection = "utf8_unicode_ci"'
        );
        foreach($init as $q) {
            $this->exec($q);
        }
    }

    public function exec($q)
    {
//        echo $q."\n";
        return $this->conn->exec($q);
    }

    public function fetchAll($q)
    {
//        echo $q."\n";
        $sth = $this->conn->prepare($q);
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute();

        return $sth->fetchAll();
    }

    public function fetch($q)
    {
//        echo $q."\n";
        $sth = $this->conn->prepare($q);
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $sth->execute();

        return $sth->fetch();
    }
}
