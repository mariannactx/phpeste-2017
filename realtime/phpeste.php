<?php
error_reporting(E_ALL);
session_start();
require('src/ortc.php');
 

$URL = 'http://ortc-developers.realtime.co/server/2.1';
$AK = 'ZGcOXE';// your realtime.co application key
$PK = '7E59QZ6p4883';// your realtime.co private key
$TK = 'YOUR_AUTHENTICATION_TOKEN';// token: could be randomly generated in the session
$CH = 'palestra'; //channel
$ttl = 180; 
$isAuthRequired = true;
$result = false;

     
// ORTC auth
// on a live usage we would already have the auth token authorized and stored in a php session
// Since a developer appkey does not require authentication the following code is optional
 
if( ! array_key_exists('ortc_token', $_SESSION) ){    
	$_SESSION['ortc_token'] = $TK;       
}	
 
$rt = new Realtime( $URL, $AK, $PK, $TK );  

if($isAuthRequired){
	$result = $rt->auth(
		array(
			$CH => 'w'
		), 
		$ttl
	);//post authentication permissions. w -> write; r -> read
	echo 'authentication status '. ( $result ? 'success' : 'failed' ).'<br/>';
}

if($result || !$isAuthRequired){
	$result = $rt->send($CH, "Sending message from php API", $response);
	echo ' send status '.( $result ? 'success' : 'failed' ).'<br/>';
}    

?>
