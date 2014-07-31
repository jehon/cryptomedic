<?php
require_once("debug.php");
require_once("exceptions.php");

// Configure the application
require_once("../../config.php");

class Server {
	const DEBUG = "debug";	
	const LOGIN_USERNAME = "login.username";	
	const LOGIN_GROUP = "login.group";	
	const ROUTE_AUTHENTICATE = "authenticate";	
	
	var $config = array(
		Server::ROUTE_AUTHENTICATE => "authenticate"
	);

	public function __construct($config) {
		// read the configuration
		$this->config = array_merge($this->config, $config);
		if (!array_key_exists($this->getConfig("domain"), $_SESSION))
			$_SESSION[$this->getConfig("domain")] = array();
	}

	/**
	 * Return the root of the rest server, ie. where all the route start
	 */
	public function getRestServerRoot() {
		return substr($_SERVER['REQUEST_URI'], 0, -strlen($_SERVER['REDIRECT_subquery']));
	}

	public function getSession($key, $default = null) {
		if (array_key_exists($key, $_SESSION[$this->getConfig("domain")]))
			return $_SESSION[$this->getConfig("domain")][$key];
		return $default;
	}

	public function setSession($key, $value) {
		debugHeader($value, "SESSION-$key");
		$_SESSION[$this->getConfig("domain")][$key] = $value;
	}

	/**
	 * Retreive a value stored in the user session with setCache
	 * 
	 * @param string $key
	 * @see setCache
	 */
	public function getCache($key, $default = null) {
		return $this->getSession($key, $default);
	}

	/**
	 * 
	 * Add a item in the session of the user
	 * 
	 * @param string $key
	 * @param any $variable
	 * @see getCache
	 */
	public function setCache($key, $value) {
		return $this->setSession($key, $value);
	}

	/**
	* Get an item of the configuration
	* If the default value is null, the configuration item is considered as mandatory
	*
	* @param string $key
	* @param any $defvalue the default value
	* @see setConfig
	* @see addConfig
	*/
	public function getConfig($key) {
		if (array_key_exists($key, $this->config))
			return $this->config[$key];
		// if ($defvalue != null)
		// 	return $defvalue;
		throw new HttpInternalError("Key not configured: '$key'");
	}

	/**
	 * Set an item of the configuration
	 * 
	 * Should be use in the specific configuration file
	 * 
	 * @param string $key
	 * @param any $value
	 */
	public function setConfig($key, $value) {
		$this->config[$key] = $value;
	}

	/**
	 * Add an item of the configuration
	 * 
	 * Should be use when the configuration item is multi-valued
	 * 
	 * @param string $key
	 * @param any $value
	 * @see setConfig
	 * @see getConfig
	 */
	public function addConfig($key, $value) {
		if (!array_key_exists($key, $this->config))
			$this->config[$key] = array();
		$this->config[$key][] = $value;
	}
}
