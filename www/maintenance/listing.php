<?php
$path = realpath(dirname(__DIR__));

// $objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
// foreach($objects as $name => $object){
//   echo "$name\n";
// }



// class IgnorantRecursiveDirectoryIterator extends RecursiveDirectoryIterator {
//     function getChildren() {
//         try {
//             return new IgnorantRecursiveDirectoryIterator($this->getPathname());
//         } catch(UnexpectedValueException $e) {
//             return new RecursiveArrayIterator(array());
//         }
//     }
// }
