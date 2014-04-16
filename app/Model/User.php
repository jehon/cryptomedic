<?php
App::uses ( 'AppModel', 'Model' );
class User extends AppModel {
	public $validate = array (
			'username' => array (
					'required' => array (
							'rule' => array (
									'notEmpty' 
							),
							'message' => 'A username is required' 
					) 
			),
			'password' => array (
					'required' => array (
							'rule' => array (
									'notEmpty' 
							),
							'message' => 'A password is required' 
					) 
			),
			'group' => array (
					'valid' => array (
							'rule' => array (
									'inList',
									array (
											'admin',
											'cdc',
											'readonly' 
									) 
							),
							'message' => 'Please enter a valid group',
							'allowEmpty' => false 
					) 
			) 
	);
}
