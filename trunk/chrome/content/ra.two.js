/*

	Ra.2 - Blackbox DOM-based XSS Scanner is our approach towards finding a solution to the problem of detecting DOM-based Cross-Site Scripting vulnerabilities in Web-Application automatically, effectively and fast. Ra.2 is basically a lighweight Mozilla Firefox Add-on that uses a very simple yet effective and unique approach to detect most DOM-based XSS vulnerabilities, if not all. Being a browser-add on it is a session-aware tool which can scan a web-application that requires authentication. Ra.2 uses custom collected list of XSS vectors which has been heavily modified to be compatible with its scanning technology. The add-on also implements basic browser intrumentation to simulate a human interaction to trigger some hard to detect DOM-based XSS conditions.
    Copyright (C) 2012  Nishant Das Patnaik & Sarathi Sabyasachi Sahoo

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

window.addEventListener("load", initAction,true);

const esbIWebProgressListener5 = Components.interfaces.nsIWebProgressListener;
Components.utils.import("resource://gre/modules/AddonManager.jsm");
var settingFilePath="";
var charFuzz=0;
var paramFuzz=0;
AddonManager.getAddonByID("ra2@domxssscanner.app", function(addon) {
try
{
  var addonLocation = addon.getResourceURI("").QueryInterface(Components.interfaces.nsIFileURL).file.path;
  settingFilePath=addonLocation+"\\chrome\\content\\settings.txt";
  var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(settingFilePath);

var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
is.init( file,0x01, 00004, null);
var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
sis.init( is );
var output = sis.read( sis.available() );

if(output.indexOf("chkbox1=1")!=-1)
paramFuzz=1;

if(output.indexOf("chkbox2=1")!=-1)
charFuzz=1;

}
catch(e2)
{
}  
});	

var mycnt=0;
var mycnt2=0;
var mytab=new Array();
var mycomment=new Array();
var rabrowser;
var vals=new Array();
var nurl=new Array();

var s1=new Array();
var s2=new Array();
var s3=new Array();
var istrueTab=0;

var rusername="";

var b1;
var b2;
var b4;

var xxurl="";

var nval=new Array();
var nvalcnt=-2;

var pmdata=0;

var myst=0;
var ratwoprogress;
var ratwoprogressText;
var isScanAll=0;

function initAction()
{
}

function openSettings()
{
var url="chrome://ffutil/content/settings.html";
var kWindowMediatorContractID = "@mozilla.org/appshell/window-mediator;1";
var kWindowMediatorIID = Components.interfaces.nsIWindowMediator;
var kWindowMediator = Components.classes[kWindowMediatorContractID].getService(kWindowMediatorIID);

var browserWindow = kWindowMediator.getMostRecentWindow("navigator:browser");
var browser = browserWindow.getBrowser();
var tab = browser.addTab(url);
browser.selectedTab = tab;
setTimeout('document.getElementById("urlbar").value = "Ra.Two";',10);
}

function getPMValue()
{
ratwoprogress=document.getElementById("RaTwo-PM");
ratwoprogressText=document.getElementById("RaTwo-Per");

var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath("C:\\xss\\config.txt");

var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
is.init( file,0x01, 00004, null);
var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
sis.init( is );
var output = sis.read( sis.available() );
var nvalPM = output.split("\n");

var file2 = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file2.initWithPath("C:\\xss\\xss.txt");

var is2 = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
is2.init( file2,0x01, 00004, null);
var sis2 = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
sis2.init( is2 );
var output2 = sis2.read( sis2.available() );
var valsPM = output2.split("\n");

var d1=0;
var d2=1;

if(valsPM.length>0)
d2=valsPM.length;

if(nvalPM.length>0)
{
for(var i=0;i<nvalPM.length;i++)
{
var turl=nvalPM[i];
if(turl.indexOf("=")!=-1)
{
var turlPM = turl.split("&");
d1=d1+((turlPM.length+1))*d2;
}
else
{
d1=d1+d2+1;
}

}
}

pmdata=100/d1;
if(pmdata<=3)
pmdata=4;

ratwoprogress.value=0;
}

function getPMValue2()
{
ratwoprogress=document.getElementById("RaTwo-PM");
ratwoprogressText=document.getElementById("RaTwo-Per");

var file2 = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file2.initWithPath("C:\\xss\\xss.txt");

var is2 = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
is2.init( file2,0x01, 00004, null);
var sis2 = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
sis2.init( is2 );
var output2 = sis2.read( sis2.available() );
var valsPM = output2.split("\n");

var d1=0;
var d2=1;

if(valsPM.length>0)
d2=valsPM.length;


var turl=window.content.document.location.href;

if(turl.indexOf("=")!=-1)
{
var turlPM = turl.split("&");
d1=d1+((turlPM.length+1))*d2;
}
else
{
d1=d2;
}

pmdata=100/d1;
if(pmdata<=3)
pmdata=4;

ratwoprogress.value=0;

}

function scanAllPages()
{
isScanAll=1;
pmdata=0;
getPMValue();
nval=[];
nval.length=0;
nvalcnt=0;

var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath("C:\\xss\\config.txt");

var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
is.init( file,0x01, 00004, null);
var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
sis.init( is );
var output = sis.read( sis.available() );

nval = output.split("\n");
myst=1;
scanThisPage();

}
function scanThisPage()
{
if(isScanAll==0)
getPMValue2();

mycnt=0;
mycnt2=0;
mytab=[];
mycomment=[];
mycomment.length=0;
rabrowser;
vals=[];
vals.length=0;
nurl=[];
nurl.length=0;
s1=[];
s1.length=0;
s2=[];
s2.length=0;
s3=[];
s3.length=0;
istrueTab=0;
var rusername="";
b1;
b2;
b4;
xxurl="";
myst=0;

var url;

if(nvalcnt>-2)
url=nval[nvalcnt];
else
url=window.content.document.location.href;

var myurl=url;
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath("C:\\xss\\xss.txt");

var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
is.init( file,0x01, 00004, null);
var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
sis.init( is );
var output = sis.read( sis.available() );

vals = output.split("\n");
for(var i=0;i<vals.length;i++)
{
mycomment[i]=vals[i].split("####")[1];
vals[i]=vals[i].split("####")[0];
}
var url2=url;
var url4=url;
var turl=url2;
var gcnt=0;

while(turl.indexOf("=")!=-1)
{
gcnt++;
url2=url;
var i=turl.indexOf("=");
turl=turl.substring(i);
var j=turl.indexOf("&");

if(j==0)
{
var t1="=&"
var t2="="+vals[0];
url2=url2.replace(t1, t2);
}

if(j==-1)
j=turl.length;


var t1="="+turl.substring(1,j);
var t2="="+vals[0];
var turl2=turl.replace(t1, t2);
url2=url2.replace(turl, turl2);

turl=turl.substring(1);

nurl[gcnt-1]=url2;
//alert(url2);
//openTab(url2,vals,myurl);

}
url=url+"#"+vals[0];
openTab(url,vals,myurl,nurl,0);
}

function openTab(url,vals,myurl,nurl,ncnt)
{
try
{
ratwoprogress.value=parseInt(ratwoprogress.value)+pmdata;
ratwoprogressText.value=ratwoprogress.value+" %";


const kWindowMediatorContractID = "@mozilla.org/appshell/window-mediator;1";
const kWindowMediatorIID = Components.interfaces.nsIWindowMediator;
const kWindowMediator = Components.classes[kWindowMediatorContractID].getService(kWindowMediatorIID);

var browserWindow = kWindowMediator.getMostRecentWindow("navigator:browser");
var browser = browserWindow.getBrowser();

rabrowser=browser;
var consoleSvc = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);
consoleSvc.reset();

var tab = browser.addTab(url);

var newTabBrowser = browser.getBrowserForTab(tab);
var istrue=0;
var istrue2=0;


newTabBrowser.addEventListener("DOMContentLoaded", function () 
{

var mydomain=myurl.match('^https?://([a-z0-9]+)\.([a-z0-9\-]+)\.[a-z]+')[0];
if(window.content.document.location.href.indexOf(mydomain)==-1 && window.content.document.location.href.indexOf('localhost/')==-1)
{
if(istrue2==0)
setTimeout(function(){openURL(newTabBrowser,vals,1,url,consoleSvc,myurl,nurl,ncnt);},2000);
istrue2=1;
return;
}


var ss = newTabBrowser.contentDocument.createElement('script');
ss.type = 'text/javascript';
ss.src='chrome://ffutil/content/ra.two.js';
var hh = newTabBrowser.contentDocument.getElementsByTagName('head')[0];
hh.insertBefore(ss,hh.firstChild);

var ss6 = newTabBrowser.contentDocument.createElement('input');
ss6.type = 'hidden';
ss6.id='ratwoeventthreat';
var hh6 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh6.insertBefore(ss6,hh6.firstChild);


getEventsThreat(newTabBrowser);

var ss2 = newTabBrowser.contentDocument.createElement('input');
ss2.type = 'hidden';
ss2.id='ratwouser';
ss2.value=rusername;
var hh2 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh2.insertBefore(ss2,hh2.firstChild);

var ss4 = newTabBrowser.contentDocument.createElement('input');
ss4.type = 'hidden';
ss4.id='ratwovals';
ss4.value=vals;
var hh4 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh4.insertBefore(ss4,hh4.firstChild);

var ss5 = newTabBrowser.contentDocument.createElement('input');
ss5.type = 'hidden';
ss5.id='ratwocomments';
ss5.value=mycomment;
var hh5 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh5.insertBefore(ss5,hh5.firstChild);

setTimeout(function(){var msgs = {};consoleSvc.getMessageArray(msgs, {});var ldata="";msgs.value.forEach(function(msg){ldata=ldata+msg.message;});if(ldata.indexOf('scanPage is not defined')!=-1){consoleSvc.reset();scanPage();}},1000);

var body=newTabBrowser.contentDocument.getElementsByTagName('html')[0].innerHTML;
var tmout=body.match(/setTimeout[(].*?[,].*?[)]/gi);
var max=0;


if(tmout!=null)
{
for(var i=0;i<tmout.length;i++)
{
var cur=tmout[i].match(/[,].*[)]/);
if(cur!=null)
{
cur[0]=cur[0].replace(/\s/gi,'');
cur[0]=cur[0].replace(',','');
var curval=cur[0].replace(')','');
if(curval>max)
max=curval

}
}
}


if(istrue==0)
{
istrue=1;
if(vals.length>1)
{
setTimeout(function(){openURL(newTabBrowser,vals,1,url,consoleSvc,myurl,nurl,ncnt);},parseInt(max)+2000);
}
else
{
if(nurl.length>ncnt)
{
ncnt++;
url=nurl[ncnt-1];

setTimeout(function(){openTab(url,vals,myurl,nurl,ncnt);},2000);
}
else
{
if(nval.length>nvalcnt+1 && nval.length>0)
{
nvalcnt++;
setTimeout('scanThisPage();',2000);
}
else
{
ratwoprogress.value=100;
ratwoprogressText.value="done";
isScanAll=0;
nvalcnt=-2;
nval=[];
nval.length=0;
setTimeout('try{var kWindowMediatorContractID = "@mozilla.org/appshell/window-mediator;1";var kWindowMediatorIID = Components.interfaces.nsIWindowMediator;var kWindowMediator = Components.classes[kWindowMediatorContractID].getService(kWindowMediatorIID);var browserWindow = kWindowMediator.getMostRecentWindow("navigator:browser");var browser = browserWindow.getBrowser();var tab = browser.addTab("http://localhost/xss/summary.php");browser.selectedTab = tab;}catch(e){}',parseInt(max)+2000);
}
}

}

}


}, true);



browser.selectedTab = tab;
mytab[mycnt]=tab;
mycnt++;
}
catch(e)
{
}
}

function openURL(newTabBrowser,vals,cnt,myurl,consoleSvc,lurl,nurl,ncnt)
{

ratwoprogress.value=parseInt(ratwoprogress.value)+pmdata;
ratwoprogressText.value=ratwoprogress.value+" %";
consoleSvc.reset();
//alert(myurl);
myurl=myurl.replace(vals[cnt-1], vals[cnt]);

//alert(myurl);
var mydomain=myurl.match('^https?://([a-z0-9]+)\.([a-z0-9\-]+)\.[a-z]+')[0];

if(window.content.document.location.href.indexOf(mydomain)==-1 && window.content.document.location.href.indexOf('localhost/')==-1)
{
myurl=myurl.replace(vals[cnt-2], vals[cnt]);
newTabBrowser.loadURI(myurl);
}
else
{
newTabBrowser.loadURI(myurl);
if(myurl.indexOf('#')!=-1)
setTimeout('window.content.document.location.reload(true);',500);
}

var lcnt=cnt;
newTabBrowser.addEventListener("load", function () 
{

var body=newTabBrowser.contentDocument.getElementsByTagName('html')[0].innerHTML;
var tmout=body.match(/setTimeout[(].*?[,].*?[)]/gi);
var max=0;


if(tmout!=null)
{
for(var i=0;i<tmout.length;i++)
{
var cur=tmout[i].match(/[,].*[)]/);
if(cur!=null)
{
cur[0]=cur[0].replace(/\s/gi,'');
cur[0]=cur[0].replace(',','');
var curval=cur[0].replace(')','');
if(curval>max)
max=curval

}
}
}

var mydomain=myurl.match('^https?://([a-z0-9]+)\.([a-z0-9\-]+)\.[a-z]+')[0];
if(window.content.document.location.href.indexOf(mydomain)==-1 && window.content.document.location.href.indexOf('localhost/')==-1)
{
cnt++;
if(cnt<vals.length)
openURL(newTabBrowser,vals,cnt,myurl,consoleSvc,lurl,nurl,ncnt);
else
{
if(nurl.length>ncnt)
{
ncnt++;
url=nurl[ncnt-1];
if(istrueTab==0)
openTab(url,vals,myurl,nurl,ncnt);
istrueTab=1;
}
else
{
ratwoprogress.value=100;
ratwoprogressText.value="done";
isScanAll=0;
nvalcnt=-2;
nval=[];
nval.length=0;
setTimeout('try{var kWindowMediatorContractID = "@mozilla.org/appshell/window-mediator;1";var kWindowMediatorIID = Components.interfaces.nsIWindowMediator;var kWindowMediator = Components.classes[kWindowMediatorContractID].getService(kWindowMediatorIID);var browserWindow = kWindowMediator.getMostRecentWindow("navigator:browser");var browser = browserWindow.getBrowser();var tab = browser.addTab("http://localhost/xss/summary.php");browser.selectedTab = tab;}catch(e){}',parseInt(max)+2000);
}
}

return;
}

if(lcnt==cnt-1)
return;


var ss = newTabBrowser.contentDocument.createElement('script');
ss.type = 'text/javascript';
ss.src='chrome://ffutil/content/ra.two.js';
var hh = newTabBrowser.contentDocument.getElementsByTagName('head')[0];
hh.insertBefore(ss,hh.firstChild);

var ss6 = newTabBrowser.contentDocument.createElement('input');
ss6.type = 'hidden';
ss6.id='ratwoeventthreat';
var hh6 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh6.insertBefore(ss6,hh6.firstChild);

getEventsThreat(newTabBrowser);

var ss2 = newTabBrowser.contentDocument.createElement('input');
ss2.type = 'hidden';
ss2.id='ratwouser';
ss2.value=rusername;
var hh2 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh2.insertBefore(ss2,hh2.firstChild);

var ss4 = newTabBrowser.contentDocument.createElement('input');
ss4.type = 'hidden';
ss4.id='ratwovals';
ss4.value=vals;
var hh4 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh4.insertBefore(ss4,hh4.firstChild);

var ss5 = newTabBrowser.contentDocument.createElement('input');
ss5.type = 'hidden';
ss5.id='ratwocomments';
ss5.value=mycomment;
var hh5 = newTabBrowser.contentDocument.getElementsByTagName('body')[0];
hh5.insertBefore(ss5,hh5.firstChild);

setTimeout(function(){var msgs = {};consoleSvc.getMessageArray(msgs, {});var ldata="";msgs.value.forEach(function(msg){ldata=ldata+msg.message;});if(ldata.indexOf('scanPage is not defined')!=-1){consoleSvc.reset();scanPage();}},1000);
cnt++;


if(cnt<vals.length)
setTimeout(function(){openURL(newTabBrowser,vals,cnt,myurl,consoleSvc,lurl,nurl,ncnt);},2000);
else
{
if(nurl.length>ncnt)
{
ncnt++;
url=nurl[ncnt-1];
setTimeout(function(){openTab(url,vals,myurl,nurl,ncnt);},2000);
}
else
{
if(nval.length>nvalcnt+1 && nval.length>0)
{
nvalcnt++;
setTimeout('scanThisPage();',2000);
}
else
{
ratwoprogress.value=100;
ratwoprogressText.value="done";
isScanAll=0;
nvalcnt=-2;
nval=[];
nval.length=0;
setTimeout('try{var kWindowMediatorContractID = "@mozilla.org/appshell/window-mediator;1";var kWindowMediatorIID = Components.interfaces.nsIWindowMediator;var kWindowMediator = Components.classes[kWindowMediatorContractID].getService(kWindowMediatorIID);var browserWindow = kWindowMediator.getMostRecentWindow("navigator:browser");var browser = browserWindow.getBrowser();var tab = browser.addTab("http://localhost/xss/summary.php");browser.selectedTab = tab;}catch(e){}',parseInt(max)+2000);
}
}
}
}, true);

}

function getEventsThreat(newTabBrowser)
{

var myevents=newTabBrowser.contentDocument.getElementById('ratwoeventthreat');
var body=newTabBrowser.contentDocument.getElementsByTagName('html')[0].innerHTML;
var onEventRegex=body.match(/<.*?\son.*?=.*scanPage[(][)]/gi);
var hrefRegex=body.match(/<(a|link|area|base).*?href.*?javascript:scanPage[(][)]/gi);
var srcRegex=body.match(/<(script|img|frame|iframe|embed|input).*?src.*?javascript:scanPage[(][)]/gi);

var totalThreat="";

if(onEventRegex!=null)
{
for(var i=0;i<onEventRegex.length;i++)
{
if(onEventRegex[i].indexOf('>')==-1)
totalThreat=totalThreat+onEventRegex[i]+"<br>";
}
}

if(hrefRegex!=null)
{
for(var i=0;i<hrefRegex.length;i++)
{
if(hrefRegex[i].indexOf('>')==-1)
totalThreat=totalThreat+hrefRegex[i]+"<br>";
}
}

if(srcRegex!=null)
{
for(var i=0;i<srcRegex.length;i++)
{
if(srcRegex[i].indexOf('>')==-1)
totalThreat=totalThreat+srcRegex[i]+"<br>";
}
}

//alert(onEventRegex);
myevents.value=totalThreat;

if(totalThreat!="")
{
setTimeout(function(){scanPage();},500);
}
}


function scanPage()
{
try
{
	var ajaxRequest;
	var i;
	var username=window.content.document.getElementById('ratwouser').value.split(',');
	var vals=window.content.document.getElementById('ratwovals').value.split(',');
	var mycomment=window.content.document.getElementById('ratwocomments').value.split(',');
	var eventThreat=window.content.document.getElementById('ratwoeventthreat').value;
	
	for(i=0;i<vals.length;i++)
	{
	if(decodeURIComponent(window.content.document.location.href).indexOf(vals[i])!=-1)
	break;
	}
	//alert(window.content.document.getElementById('ratwouser').value);
	var d1=decodeURIComponent(window.content.document.location.href).replace(/#/gi, "ratwo");
	d1=d1.replace('scanPage()','alert(1)');
	d1=d1.replace(/&/gi, "ratwoAnd");
	var url="http://localhost/xss/index.php?params="+d1+"&comment="+mycomment[i]+"&username="+username+"&eventThreat="+eventThreat;
	ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function()
	{
		if(ajaxRequest.readyState == 4){
			var val= ajaxRequest.responseText;
		}
	
	}
	
	ajaxRequest.open("GET", url, false);
	ajaxRequest.setRequestHeader("Content-type", "text/plain");
	ajaxRequest.send(null);
}
catch(e)
{
//alert(e);
}

}