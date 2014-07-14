<?php

class Server {
	var $config = array();
	const DEBUG = "debug";	
	const LOGIN_USERNAME = "login.username";	


	public function __construct($config) {
		// read the configuration
		$this->config = $config;
		if (!array_key_exists($this->getConfig("domain"), $_SESSION))
			$_SESSION[$this->getConfig("domain")] = array();
	}

	public function getSession($key, $default = null) {
		return $this->getCache($key, $default);
	}

	public function setSession($key, $value) {
		return $this->setCache($key, $value);
	}

	/**
	 * Retreive a value stored in the user session with setCache
	 * 
	 * @param string $key
	 * @see setCache
	 */
	public function getCache($key, $default = null) {
		if (array_key_exists($key, $_SESSION[$this->getConfig("domain")]))
			return $_SESSION[$this->getConfig("domain")][$key];
		return $default;
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
		$_SESSION[$this->getConfig("domain")][$key] = $value;
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
	public function getConfig($key, $defvalue = null) {
		if (array_key_exists($key, $this->config))
			return $this->config[$key];
		if ($defvalue != null)
			return $defvalue;
		error_log("Key not configured: '$key'");
		trace("Key not configured: '$key'");
		die("Dying");
		return null;
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
