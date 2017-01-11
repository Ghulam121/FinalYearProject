<?php
$url_title_received = $_REQUEST["q"];
$url_received = $_REQUEST["r"];
$time_received = $_REQUEST["s"];
if(!empty($url_title_received)){
// Create connection
  $con = mysqli_connect("localhost","root","","webhistory");
// Check connection
if (!$con){
    die("Connection failed: " . mysqli_connect_error());
}
// create query;
$sql = "INSERT INTO tabs_info (url_title,url,time)
VALUES ('$url_title_received','$url_received','$time_received')";

if (mysqli_query($con, $sql)) {
    	echo "error occured";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}
mysqli_close($con);
}
else{
}
?>