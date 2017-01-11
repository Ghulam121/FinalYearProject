<?php
$url_title_received = $_REQUEST["q"];
$time_received = $_REQUEST["s"];
if(!empty($url_title_received)){
// Create connection
  $con = mysqli_connect("localhost","root","","webhistory");
// Check connection
if (!$con){
    die("Connection failed: " . mysqli_connect_error());
}
// create query;
$sql = "UPDATE tabs_info SET time = '$time_received' WHERE url_title = '$url_title_received'";

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