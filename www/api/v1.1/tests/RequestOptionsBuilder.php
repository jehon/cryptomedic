<?php

class RequestOptionsBuilder {
  protected $url;
  protected $user = "cdc";
  protected $asJson = true;
  protected $method = "GET";
  protected $params = [];
  protected $expected = 200;
  protected $syncCheckpoint = false;
  protected $syncNbr = false;

  public function clone() {
    return clone $this;
  }

  public function getOptions() {
    $options = [
      "params" => $this->params,
    ];
  }

  public function getHeaders() {
    $headers = [];
    if ($this->syncCheckpoint) {
      $headers["X-SYNC-CHECKPOINT"] = $this->syncCheckpoint;
    }
    if ($this->syncNbr) {
      $headers["X-SYNC-NBR"] = $this->syncNbr;
    }
    return $headers;
  }

  public function getUrl() {
    return $this->url;
  }

  public function getAbsoluteUrl() {
    return "/api/" . basename(dirname(dirname(__FILE__))). "/" . $this->getUrl();
  }

  public function setUrl($url) {
    $this->url = $url;
    return $this;
  }


  public function getUser() {
    return $this->user;
  }

  public function setUser($user) {
    $this->user = $user;
    return $this;
  }

  public function asReadOnly() {
    $this->user = "readonly";
    return $this;
  }

  public function asUnauthenticated() {
    $this->user = false;
    return $this;
  }

  public function getAsJson() {
    return $this->asJson;
  }

  public function asJson() {
    $this->asJson = $asJson;
    return $this;
  }

  public function asText() {
    $this->asJson = false;
    return $this;
  }

  public function getMethod() {
    return $this->method;
  }

  public function setMethod($method) {
    $this->method = $method;
    return $this;
  }


  public function getExpected() {
    return $this->expected;
  }

  public function setExpected($expected) {
    $this->expected = $expected;
    return $this;
  }


  public function getParams() {
    return $this->params;
  }

  public function setParams($params) {
    $this->params = $params;
    return $this;
  }


  public function getsyncCheckpoint() {
    return $this->syncCheckpoint;
  }

  public function setSyncCheckpoint($syncCheckpoint) {
    $this->syncCheckpoint = $syncCheckpoint;
    return $this;
  }

  public function setSyncReset() {
    $this->syncCheckpoint = "";
    return $this;
  }

  public function getSyncNbr() {
    return $this->syncNbr;
  }

  public function setSyncNbr($syncNbr) {
    $this->syncNbr = $syncNbr;
    return $this;
  }
}
