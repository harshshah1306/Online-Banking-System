function validate()
	{
		var user=document.login_info.usrname.value;
		var pass=document.login_info.pswd.value;
		if(user==null || user=="" || pass==null || pass=="")
		{
			document.getElementById("show_err").innerHTML="Error:Username or Password is empty";
			return false;
		}
		else if(excel_getdata(user,pass)==0)
		{
			document.getElementById("show_err").innerHTML="Error:Username or Password is invalid";
			return false;
		}
		if(excel_sheet.Cells(i,9).value!="No")
		{
			setCookie("acc_name",excel_sheet.Cells(i,9).value);
			setCookie("prev_page","corporate_banking.html");
		}
		else
		{
			setCookie("prev_page","personal_banking.html");
		}
		setCookie("username",user);
		checkCookie_login();
	}
function setCookie(uname,vname)
	{
		document.cookie = uname+"="+vname+";";
	}
function getCookie(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		  {
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0) 
		  {
			return c.substring(name.length,c.length);
		  }
		  }
		return "";
	}
function checkCookie()
{
	var user=getCookie("username");
	var prev_page=getCookie("prev_page");
	if(user!="")
	{
		get_excelsheet();
		document.getElementById("welcome_user").innerHTML="Welcome, "+getCookie("name_user");
		if(prev_page=="login.html")
		{
			window.location.assign(prev_page);
		}
	}
	else
	{
		window.location.assign("login.html");
	}
}
var flag;
function deleteCookie(flag)
{
	document.cookie="username=;";
	document.cookie="name_user=;";
	document.cookie="used_rows=;";
	document.cookie="acc_name=;";
	if(flag==1)
		window.location.assign('login.html');
	else
		window.location.assign('main.html');
}

function setPrev_page()
{
	var path=window.location.pathname;
	var url=path.substring(path.lastIndexOf('/')+1);
	document.cookie="prev_page="+url+";";
}
function checkCookie_login()
{
	var user=getCookie("username");
	var prev_page=getCookie("prev_page");
	if(user!="")
	{
		window.location.assign(prev_page);
	}
	else
	{
		get_excelsheet();
	}
}
var check;
function checkLogin(check)
{
	var user=getCookie("username");
	if(user!="")
	{
		if(check==1)
		{
			window.location.assign("personal_banking.html");
		}
		document.getElementById("welcome_user").innerHTML="Welcome, "+getCookie("name_user");
	}
}