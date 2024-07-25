var toolTipLeft;
var toolTipRightPos;
var toolTipTopPos;
var toolTipBottomPos;
//var toolTipString;
var toolTipOpenLeft;

//**************Handling this at the Primary.master.cs file level*************
//Changed 12/4 by John Beutler
//****************************************************************************
//toolTipString =  "<br/>CALL TOLL FREE<br/>";
//toolTipString += "US/Canada<br/>800-547-7827<br/><br/>";
//toolTipString += "SUBMIT REQUEST ONLINE<br/><a href=\"http://www.serenainternational.com/About/InfoRequest.asp\" onClick=\"hideToolTip();\">Online Request Form</a>";


var DEFAULT_WIDTH = 760;
//var popupArr = new Array();
var popup;
function DivWindow(id,width,height,top,left,url) {
	this.id = id;
	this.type = "image";
	this.width = width;
	this.height = height;
	this.top = top;
	this.left = left;
	this.url = url;
}
function BodyObject(width,height,offsetX) {
	this.width = width;
	this.height = height;
	this.offsetX = offsetX;
}

function openDivWindow(id,width,height,top,left,url) {
	//if ( (popupArr[id] == undefined ) || (popupArr[id] == null ) ){

	popup = new DivWindow(id,width,height,top,left,url);
	//}
	div = document.getElementById(id);
	positionDivWindow(id);
	div.style.width = (popup.width)+"px";
	div.style.height = (15 + popup.height)+"px";
	div.style.display = "block";
	//content = div.firstChild;
	innerdiv = document.getElementById(id+"_iframe");
	innerdiv.width = popup.width;
	innerdiv.height = popup.height;
	innerdiv.innerHTML = "<iframe src='"+popup.url+"' width='100%' height='100%' border='0' scrolling='no' frameborder='0' marginwidth='0' marginheight='0' style='overflow:hidden;'></iframe>";
	//alert(content);
	//content.src = popup.url;
}

//Function to Open Logo Terms Window
function openWindow(linkObj, top) { 
	logoFile = "/images/company/logofiles/" + linkObj.title;
	id = 'window1';
	popup = new DivWindow('window1',650,450,top,50,"logoTerms.aspx?test=test");
	div = document.getElementById(id);   
	positionDivWindow(id);
	div.style.width = (popup.width)+"px";
	div.style.height = (15 + popup.height)+"px";
	div.style.display = "block";
	innerdiv = document.getElementById(id+"_iframe");
	innerdiv.width = popup.width;
	innerdiv.height = popup.height;
	innerdiv.innerHTML = "<iframe src='"+popup.url+"' width='100%' height='100%' border='0' scrolling='no' frameborder='0' marginwidth='0' marginheight='0'></iframe>";
}
 
function closeDivWindow(id) {
	div = document.getElementById(id);
	div.style.display = "none";
	innerdiv = document.getElementById(id+"_iframe");
	innerdiv.innerHTML = "";
}

//Function to Close Logo Terms Window 
function closeLogoWindow(agreeBool) {

	div = document.getElementById('window1');
	div.style.display = "none";
	innerdiv = document.getElementById('window1'+"_iframe");
	innerdiv.innerHTML = "";
	
	if (agreeBool == 1) {
	 	var domainName = getDomainName(document.URL) 
		window.location = "http://" + domainName + logoFile;
	} 
}

function positionDivWindow(id){
	var bodyObj;
	bodyObj = getBodyDimension();

	div = document.getElementById(id);
	div.style.top = popup.top+"px";
	div.style.left = (bodyObj.offsetX + popup.left)+"px";
}
function repositionDivWindow(){

	if (document.getElementById('window1').style.display != "none" ){
		positionDivWindow('window1');
	}
	
	positionToolTip();
}

// code for tooltip BEGIN


function showToolTip(e,text){
		var bodyObj;
		bodyObj = getBodyDimension();
		if(document.all)
			e = event;
		
		var obj = document.getElementById('bubble_tooltip');
		var obj2 = document.getElementById('bubble_tooltip_content');
		obj2.innerHTML = text;
		obj.style.display = 'block';
		
		var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)
			st=0; 
		var leftPos = e.clientX - 250;
		if(leftPos<0)
			leftPos = 0;
		obj.style.left = leftPos + 'px';
		//We'll want to put some logic in here for positioning of elements...
		//obj.style.top = e.clientY - obj.offsetHeight -1 + st + 'px';
		obj.style.top = e.clientY -20 + st + 'px';

    
	    //Get the nodes' properties
	    	ddWidth = obj.offsetWidth;
    		ddHeight = obj.offsetHeight;
    		ddX = findPosX(obj);
    		ddY = findPosY(obj);
    		ddMargin = document.getElementById('container').offsetLeft;

	    //Calculate the coordinates of the space outside of the dropdown.
	    //Used when the cursor is clicked outside of the tooltip area to close it...
    	toolTipLeft = ddX;
		toolTipRightPos = toolTipLeft + obj.offsetWidth;
		toolTipTopPos = ddY;
		toolTipBottomPos = toolTipTopPos + obj.offsetHeight;

		toolTipOpenLeft = obj.offsetLeft - bodyObj.offsetX;
		if(document.getElementById('ctl00_PrimaryBody_ctl00_ddlSelectCountry'))
		{
		    document.getElementById('ctl00_PrimaryBody_ctl00_ddlSelectCountry').style.display = 'none';
		}
		
	}	
	function getBodyDimension(){
		var w,h,ox;
		if (self.innerHeight) // all except Explorer
		{
			w = self.innerWidth;
			h = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight)
			// Explorer 6 Strict Mode
		{
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		}
		else if (document.body) // other Explorers
		{
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}
		if (w < DEFAULT_WIDTH){
			ox = 0;
		} else {
			ox = (w - DEFAULT_WIDTH) / 2;
		}
		var bodyDimension = new BodyObject(w,h,ox);
		return bodyDimension;
	}
	function positionToolTip()
	{
		var obj = document.getElementById('bubble_tooltip');
		if (obj.style.display == "block"){
			var bodyObj;
			bodyObj = getBodyDimension();
			
				//alert(obj.offsetLeft);
			obj.style.left = (toolTipOpenLeft + bodyObj.offsetX) + 'px';
		}
		
	}
	function blurToolTip(obj)
	{
		if(cursorX < toolTipLeft || (cursorX > (toolTipRightPos + 70)) || cursorY < toolTipTopPos || cursorY > toolTipBottomPos)
			hideToolTip();
	}

	function hideToolTip()
	{
		document.getElementById('bubble_tooltip').style.display = 'none';
		
		if(document.getElementById('ctl00_PrimaryBody_ctl00_ddlSelectCountry'))
		{
		    document.getElementById('ctl00_PrimaryBody_ctl00_ddlSelectCountry').style.display = 'block';
		}
		
	}
	
	// Code for tooltip end