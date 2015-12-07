<?php
namespace Jehon\Maintenance;

require_once(__DIR__ . "/lib/extended_session.php");
require_once(__DIR__ . "/lib/getParameter.php");

use Jehon\Maintenance\Lib;

class BugReporting {
	protected $db;

	static public function run($db) {
		?>
			<style>
				table {
					width: 100%
				}
				table, td {
					border: 1px gray solid;
					border-collapse: collapse;
				}
				td {
					padding-left: 10px;
					padding-right: 10px;
					vertical-align: top;
				}
			</style>
		<?php
		$bg = new BugReporting($db);
		$bg->route();
	}

	public function __construct(Database $db) {
		$this->db = $db;
	}

	static public function record(Database $db, $urlBugView) {
		$res = $db->runPrepareSqlStatement("INSERT INTO bug_reporting"
				. "(url, session, username, email, description, browser_useragent, browser_state, browser_console, screenshot) "
				. "VALUE(:url, :session, :username, :email, :description, :browser_useragent, :browser_state, :browser_console, :screenshot)",
				array(
						'url' => \Jehon\Maintenance\Lib\getParameter("url"),
						'session' => session_id(),
						'username' => \Jehon\Maintenance\Lib\getParameter("username"),
						'email' => \Jehon\Maintenance\Lib\getParameter("email"),
						'description' => \Jehon\Maintenance\Lib\getParameter("description"),
						'browser_useragent' => \Jehon\Maintenance\Lib\getParameter("browser_useragent"),
						'browser_state' => \Jehon\Maintenance\Lib\getParameter("browser_state"),
						'browser_console' => \Jehon\Maintenance\Lib\getParameter("browser_console"),
						'screenshot' => \Jehon\Maintenance\Lib\getParameter("screenshot")
				)
		);

		$id = $db->pdo->lastInsertId();
		$url_path = $urlBugView . "?id=$id";

		if ($res) {
			mail("marielineetjean+cryptomedic@gmail.com", "Bug report $id", <<<EMAIL
		Hello
				A new bug report has been entered. Please go and see it...

				Bug id = $id

				<a href='{$url_path}'>View it</a><br>
EMAIL
		. var_export($_REQUEST, true)
			);
			echo "<br>";
			echo "Your bug report has been recorded. You should receive a reply shortly<br>";
			echo "View it here: <a href='{$url_path}'>your bug report</a>";
		}

	}

	public function viewList() {
		// Show listing
		$list = $this->db->runPrepareSqlStatement("SELECT * FROM bug_reporting WHERE fixed IS NULL");
		?>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>username</th>
						<th>description</th>
					</tr>
				</thead>
				<tbody>
					<?php
						foreach($list as $bug) {
							echo "<tr>";
							echo "<td><a href='?id=${bug['id']}'>${bug['id']}</a></td>";
							echo "<td>${bug['username']}</td>";
							echo "<td>${bug['description']}</td>";
							echo "</tr>";
						}
					?>
				</tbody>
			</table>
		<?php
	}

	public function viewOne($id) {
		try {
			$list = $this->db->runPrepareSqlStatement("SELECT * FROM bug_reporting WHERE id = :id", array('id' => \Jehon\Maintenance\Lib\getParameter("id")));
			$bug = array_pop($list);
		} catch (PDOException $e) {
			var_dump($e);
			return "";
		}
		?>
			<a href='?'>View index</a>
			<a href='?fix=1&id=<?php echo \Jehon\Maintenance\Lib\getParameter("id") ?>'>Fix it</a>
			<table>
				<cols>
					<col width='200px'/>
					<col/>
				</cols>
				<tr>
					<td>Id</td>
					<td><?php echo $bug['id']; ?></td>
				</tr>
				<tr>
					<td>Created</td>
					<td><?php echo $bug['created_at']; ?></td>
				</tr>
				<tr>
					<td>URL</td>
					<td><?php echo $bug['url']; ?></td>
				</tr>
				<tr>
					<td>Session</td>
					<td><?php echo $bug['session']; ?></td>
				</tr>
				<tr>
					<td>Username</td>
					<td><?php echo $bug['username']; ?></td>
				</tr>
				<tr>
					<td>Email</td>
					<td><?php echo $bug['email']; ?></td>
				</tr>
				<tr>
					<td>Description</td>
					<td><pre><?php echo $bug['description']; ?></pre></td>
				</tr>
				<tr>
					<td>Browser User-Agent</td>
					<td><?php
						echo $bug['browser_useragent'];
						echo '<pre>';
						var_dump(get_browser($bug['browser_useragent']));
						echo '</pre>';
					?></td>
				</tr>
				<tr>
					<td>Browser Console</td>
					<td>
						<table>
							<?php
								foreach(json_decode($bug['browser_console']) as $i => $w) {
									echo "<tr>";
										echo "<td>$i</td>";
										echo "<td>{$w->level}</td>";
										echo "<td>{$w->timestamp}</td>";
										foreach($w->details as $f) {
											echo "<td>" . json_encode($f) . "</td>";
										}
									echo "</tr>";
								}
							?>
						</table>
					</td>
				</tr>
				<tr>
					<td>Screenshot</td>
					<td>
						<?php if ($bug['screenshot']) { ?>
							<img alt="screenshot" src='<?php echo $bug['screenshot']; ?>' style='border: dashed 5px red'>
						<?php } else { ?>
							No picture
						<?php } ?>
					</td>
				</tr>
				<tr>
					<td>Browser State</td>
					<td><pre><?php echo json_encode(json_decode($bug['browser_state']), JSON_PRETTY_PRINT); ?></pre></td>
				</tr>
			</table>
		<?php
	}

	public function fixIt($id) {
		echo "<hr>";
		echo "Fixing bug $id<br>";
		echo "<hr>";
		$this->db->runPrepareSqlStatement("UPDATE bug_reporting SET fixed = NOW() WHERE id = :id", array("id" => $id));
	}

	public function route() {
	 	if (\Jehon\Maintenance\Lib\getParameter("id", -1) < 0) {
	 		$this->viewList();
	 	} else {
	 		$id = \Jehon\Maintenance\Lib\getParameter("id");
			// Delete it?
	 		if (\Jehon\Maintenance\Lib\getParameter("fix", false)) {
				$this->fixIt($id);
	 		}
	 		$this->viewOne($id);
	 	}
	}
}
