<?php
  session_start();
?>
<H1>Virtually sent emails</H1>
<?php
  define('ROOT', '/tmp/emails/');

  if (array_key_exists('list', $_SESSION)) {
    $list = $_SESSION['list'];
    if (array_key_exists('email', $_REQUEST)) {
      ?>
        <a href='?'>Close</a><br>
        <pre>
        <?php
          readfile($list[$_REQUEST['email']]);
        ?>
        </pre>
      <?php
    }
  }
?>
  <h2>List of emails</h2>
<?php
  $list = glob(constant('ROOT') . '/*.email');
  $_SESSION['list'] = $list;

  foreach($list as $i => $f) {
    echo "<a href='?email=$i'>$i: " . basename($f) . "</a><br>";
  }
