<?php

$conn = new PDO(
    "mysql:host=localhost;port=3306;dbname=luna",
    "root",
    "tiger"
);

$conn->setAttribute(
    PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION
);

?>