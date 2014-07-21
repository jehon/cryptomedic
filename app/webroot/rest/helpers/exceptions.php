<?php

class HttpException extends Exception {
  protected $httpCode = 400;
  public function getHttpCode() {
    return $this->httpCode;
  }
}

/**
  * Une authentification est nécessaire pour accéder à la ressource
  */
class HttpUnauthorized extends HttpException {
	public function __construct($message = "", $code = 0, Exception $previous = null) {
    	$this->httpCode = 401;
    	parent::__construct($message, 0, $previous);
  	}
}

/**
 * Le serveur a compris la requête, mais refuse de l'exécuter. 
 * Contrairement à l'erreur 401, s'authentifier ne fera aucune différence. 
 * Sur les serveurs où l'authentification est requise, cela signifie généralement 
 * que l'authentification a été acceptée mais que les droits d'accès ne permettent pas 
 * au client d'accéder à la ressource
 */
class HttpForbidden extends HttpException {
	public function __construct($message = "", $code = 0, Exception $previous = null) {
    	$this->httpCode = 403;
      parent::__construct($message, 0, $previous);
  	}
}

class HttpNotFound extends HttpException {
	public function __construct($message = "", $code = 0, Exception $previous = null) {
    	$this->httpCode = 404;
      parent::__construct($message, 0, $previous);
  	}
}

class HttpInvalidData extends HttpException {
	public function __construct($message = "", $code = 0, Exception $previous = null) {
    	$this->httpCode = 406;
      parent::__construct($message, 0, $previous);
  	}
}

class HttpInternalError extends HttpException {
	public function __construct($message = "", $code = 0, Exception $previous = null) {
    	$this->httpCode = 500;
      parent::__construct($message, 0, $previous);
  	}
}

class DBSystemError extends HttpInternalError {}