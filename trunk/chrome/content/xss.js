
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

function scanPage()
{
try
{
alert("SS");
	var ajaxRequest;
	
	var url="http://10.66.212.33/xss/index.php?params="+window.content.document.location.href;
	
	ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function()
	{
	
		if(ajaxRequest.readyState == 4){
			var val= ajaxRequest.responseText;
		}
	
	}
	
	ajaxRequest.open("GET", url, true);
	ajaxRequest.setRequestHeader("Content-type", "image/jpeg");
	ajaxRequest.send(null);
}
catch(e)
{
alert(e);
}

}