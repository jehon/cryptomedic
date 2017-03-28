<?php

class RequestOptionsBuilder {
  protected $url;
  protected $role = "cdc";
  protected $asJson = true;
  protected $method = "GET";
  protected $params = [];
  protected $expected = 200;
  protected $syncCheckpoint = false;
  protected $syncNbr = false;
  protected $reference = false;

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
    if ($this->syncCheckpoint !== false) {
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


  public function getRole() {
    return $this->role;
  }

  public function setRole($role) {
    $this->role = $role;
    return $this;
  }

  public function asReadOnly() {
    $this->role = "readonly";
    return $this;
  }

  public function asUnauthenticated() {
    $this->role = false;
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

  public function addParams($params) {
    $this->params = array_merge($this->params, $params);
    return $this;
  }

  public function addParam($key, $value) {
    $this->params[$key] = $value;
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


  public function getReference() {
    return $this->reference;
  }

  public function setReference($reference = null) {
    $this->reference = $reference;
    return $this;
  }

  public function withReference() {
    $this->reference = null;
    return $this;
  }

}
