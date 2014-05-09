<?php
file_put_contents('./build/ip.js', sprintf('sockeIOConfig = {"IP": "%s"};', $_SERVER['HTTP_X_REAL_IP']));