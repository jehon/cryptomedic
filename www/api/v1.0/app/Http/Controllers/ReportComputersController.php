<?php namespace App\Http\Controllers;

class ReportComputersController extends ReportController {
  public function buildData() {
    $this->result['list'] = $this->runSqlWithNamedParameter("SELECT * FROM sync_computers WHERE
      updated_at IS NOT NULL
      AND updated_at < DATE_ADD(NOW(), INTERVAL - 6 MONTH)
    ");
  }
}
