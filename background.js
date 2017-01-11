var previous_url=" ";
var current_url=" ";
var Enabled = true;
var check=true;
var urls,v;
var end_time = 0;
var temp1=0,temp2=0, temp3=0;
var start_time_calculated=0;
var end_time_calculated=0;
var previous_url_title=" ";
var current_url_title="";
var focus_start_time=0;
var focus_end_time=0;
var total_time=0;
var retrieveTime=0;
var retrn=0;
var app = 9 ;
var abc=0;

/* this function implemented for checking sever code;  */
function noResultFound(){

 alert(" Sorry No result Found");

}
/* this function updates the time of the already visited website on the multiple visit
*/
function Update(stp,stp1,stp2) {
  var xhttp;
  if (stp.length == 0) {
         return;
  }
  xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
  }
	else{
	}
  };
    xhttp.open("GET", "http://localhost/chromeextension/data/update.php?q="+stp+"& r= "+stp1+"& s= "+stp2, true);
        xhttp.send();
}
/* this function checks for url, i-e either it is the first time the user is visiting a particular url or it has already been visited and its entry has been
recorded.
*/
function checkIt(str){
     var xhttp;
      if (str == "") {
         return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        retrieveTime = this.response;
		retrieveTime = parseInt(retrieveTime);
		//alert(retrieveTime+" "+total_time);
		 if(retrieveTime == -1){
                               total_time = millisecondsToTime(total_time);							   
	 			               record(previous_url_title,previous_url,total_time);
		                }
		                else{
						     total_time = millisecondsToTime(total_time);
		                         total_time = total_time + retrieveTime;						
	 			                         Update(previous_url_title,previous_url,total_time);
		                 }
	 
                                             previous_url_title = current_url_title;
											 previous_url=current_url;
											 retrieveTime=0;
	}
	else{
	
	}
  };
  xhttp.open("GET", "http://localhost/chromeextension/data/checkForUrl.php?q="+str, true);
        xhttp.send();
}
/* this function inserts the data (url,time of focus) in the database
*/
function record(str,str1,str2) {
  var xhttp;
  if (str.length == 0) {
         return;
  }
  xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
  }
	else{
	}
  };
    xhttp.open("GET", "http://localhost/chromeextension/data/insertData.php?q="+str+"& r= "+str1+"& s= "+str2, true);
        xhttp.send();
}
/* this function exracts the urls data 
*/
function content(theUrl) {
  var xhttp;
  if (theUrl.length == 0) {
         return;
  }
  xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
		 alert(this.response);
  }
	else{
	}
  };
    xhttp.open("GET", "http://localhost/chromeextension/data/getMetaData.php?q="+theUrl, true);
        xhttp.send();
}

/*calculates the total time of tab focus (in seconds)
*/
function millisecondsToTime(milli)
{
      //var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000)%60);
      //var minutes = Math.floor((milli / (60 * 1000)) % 60);
	  //var hours   = Math.floor((milli / (60 * 60 * 1000)) % 60);
      return seconds;
}
/*
it is fired when a tab get or loose focus
*/
function WindowFocus(){
if(previous_url_title == " "){
    previous_url_title = current_url_title;
	previous_url = current_url;
	return;
 }
 else{ 
    if(previous_url_title!=current_url_title){
	    temp2 = new Date();
		    focus_end_time = temp2.getTime();
			     total_time =   focus_end_time - start_time;
				 //alert(total_time);
				 	checkIt(previous_url_title);
					/* the checkIt Functioncreate a query which searches for previous_url_title and get the total time spent on it and add the new calcluated focus time 
		               and then create a query and modify the total time spent on a spacific url. */
					                                  return;											 
	    }
	}
}
  /*this this the main function it is called when an event occur i-e tab switching etc.
  */
function mainFunction(){
chrome.tabs.query({currentWindow:true,active:true},function (tabs){
                //temp1 = new Date();
				//start_time = temp1.getTime();
                current_url = tabs[0].url;   //saves the url of current active tab
			    current_url_title = tabs[0].title; // save the newly loaded or opened tab and. 
				      WindowFocus();               // now check for the previous one.
				             temp1 = new Date();   /* we calculate this start time after checking for the previous window because we want to 
							                         save the value of the start time of the previous window */
					            start_time = temp1.getTime(); 
                         //content("https://github.com/Ghulam121/FinalYearProject");
						// alert("hello");
					});						
}
/*this is the event listner of chrome API*/
 chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if(Enabled)
    {
		if (info.status == "complete") {
			            mainFunction();			
		}
	}
});
if(Enabled)
{
	chrome.tabs.onActivated.addListener(mainFunction);
}