function my_details()
{
	var name_user=parent.excel_sheet.Cells(parent.row_no,1).value + parent.excel_sheet.Cells(parent.row_no,2).value + parent.excel_sheet.Cells(parent.row_no,3).value + parent.excel_sheet.Cells(parent.row_no,4).value;
	document.getElementById("name").innerHTML=name_user;
	if(parent.getCookie("acc_name")!="")
	{
		document.getElementById("acc_name").innerHTML=parent.getCookie("acc_name");
	}
	else
	{
		document.getElementById("accname").style.visibility="hidden";
		document.getElementById("accname").style.display="none";
	}
	document.getElementById("accno").innerHTML=parent.excel_sheet.Cells(parent.row_no,5).value;
	document.getElementById("user_id").innerHTML=parent.getCookie("username");
	document.getElementById("bal").innerHTML=parent.excel_sheet.Cells(parent.row_no,8).value;
}
function change_pwd()
{
	var old_pwd_excel=parent.excel_sheet.Cells(parent.row_no,7).value;
	var old_pwd_form=document.pwd_chnge.old_pwd_form.value;
	var new_pwd=document.pwd_chnge.new_pwd.value;
	var confirm_pwd=document.pwd_chnge.confirm_pwd.value;
	if(old_pwd_form=="" || old_pwd_form==null || new_pwd=="" || new_pwd==null || confirm_pwd=="" || confirm_pwd==null)
	{
		document.getElementById("show_err").innerHTML="All fields are necessary";
		return false;
	}
	else{
		if(old_pwd_form==old_pwd_excel)
		{
			if(confirm_pwd==new_pwd)
			{
				if(new_pwd!=old_pwd_excel)
				{
					parent.excel_sheet.Cells(parent.row_no,7).value=new_pwd;
				}
				else{
					
					document.getElementById("show_err").innerHTML="<b>New Password</b> can't be the same as old one";
					return false;
				}
			}
			else{
				document.getElementById("show_err").innerHTML="<b>Confirm Password</b> does not match <b>New Password</b>";
				return false;
			}
		}
		else{
			document.getElementById("show_err").innerHTML="Entered <b>Old Password</b> is invalid";
			return false;
		}
	}
	alert("Password changed.You are been Logged Out.Please Login again");
	parent.deleteCookie(1);
}
var flag;
function show_block(flag)
{
	if(flag==1)
	{
		document.getElementById('pwd_box').style.visibility='visible';
		document.getElementById('pwd_box').style.borderLeft='1px solid #ADADAD';
	}
	else{
		document.getElementById('pwd_box').style.visibility='hidden';
		document.getElementById('pwd_box').style.borderLeft='0px';
		document.pwd_chnge.reset();
	}
}