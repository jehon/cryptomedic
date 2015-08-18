/**
 * Interface:
 * 
 * Available requests:
 *    userLogin		-> user settings
 *    userLogout	-> ok
 *    getFolder 	-> folder data
 *    folderCreate	-> ok/ko
 *    fileCreate 	-> ok/ko
 *    fileModify 	-> ok/ko
 *    fileDelete 	-> ok/ko
 *    
 * Sending messages:
 *    folderUpdated (folder data)
 *    conflict (conflict data)
 *    progress(sync status, queue length)
 *    
 * 
 * Questions:
 *    - how to log in a user? = subscribe on this computer OR check the password in the local database
 *    - how to log out a user? = forget from this computer
 *     
 */
