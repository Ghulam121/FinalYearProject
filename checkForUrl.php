<?php
$url_title_received = $_REQUEST["q"];
if(!empty($url_title_received)){
// Create connection
  $con = mysqli_connect("localhost","root","","webhistory");
// Check connection
if (!$con){
    die("Connection failed: " . mysqli_connect_error());
}
else{

$sql = "SELECT * FROM tabs_info WHERE url_title =  '$url_title_received'";
     if ($result=mysqli_query($con,$sql))
    {
     $rowcount=mysqli_num_rows($result);
     if($rowcount > 0){
	    while($row = mysqli_fetch_assoc($result)) {
		/* if url already exists then return time
		*/
                echo $row["time"];
        }
	 }
	 else {
    echo "-1";
}
   }
mysqli_close($con);
  }
}
else{
  
}
?>