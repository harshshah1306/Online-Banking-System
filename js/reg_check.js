function check_form()
{
	try{
	var title_name=document.register.title_name.value;
	var fname=document.register.fname.value;
	var mname=document.register.mname.value;
	var lname=document.register.lname.value;
	var accno=document.register.acc_no.value;
	var user_id=document.register.user_id.value;
	var pass=document.register.password.value;
	var letters = /^[A-Za-z]+$/;
	if(fname=="" || mname=="" || lname=="" || accno=="" || user_id=="" || pass=="")
	{
		alert("All * Marked Fields Are Required");
		return false;
	}
	if(!(fname.match(letters)) || !(mname.match(letters)) || !(lname.match(letters)))
	{
		alert("Name must contain only letters");
		return false;
	}
	if(accno!=parseInt(accno))
	{
		alert("Account No. should contain numbers only");
		document.register.acc_no.focus();
		return false;
	}
	var flag_accno=0,flag_userid=0;
	if(used_rows>1)
	{
		for(var i=1;i<=used_rows;i++)
		{
			if(accno==excel_sheet.Cells(i,5).value)
			{
				alert("Invalid Account Number");
				document.register.acc_no.focus();
				flag_accno=1;
				break;
			}
		}
		for(i=1;i<=used_rows;i++)
		{
			if(user_id==excel_sheet.Cells(i,6).value)
			{
				alert("User-id already in use");
				flag_userid=1;
				break;
			}
		}
	}
	if(flag_accno==1 || flag_userid==1)
	{
		return false;
	}
	if(value_cor==1)
	{
		var acc_name=document.register.corporate_name.value;
		if(acc_name=="" || acc_name==null)
		{
			alert("Corporate Account Name required.");
			return false;
		}
	}
	fname=fname.toLowerCase();
	mname=mname.toLowerCase();
	lname=lname.toLowerCase();
	fname=fname.charAt(0).toUpperCase()+fname.slice(1,fname.length);
	mname=mname.charAt(0).toUpperCase()+mname.slice(1,mname.length);
	lname=lname.charAt(0).toUpperCase()+lname.slice(1,lname.length);
	excel_sheet.Cells(++used_rows,1).value=title_name+" ";
	excel_sheet.Cells(used_rows,2).value=fname+" ";
	excel_sheet.Cells(used_rows,3).value=mname+" ";
	excel_sheet.Cells(used_rows,4).value=lname+" ";
	excel_sheet.Cells(used_rows,5).value=accno;
	excel_sheet.Cells(used_rows,6).value=user_id;
	excel_sheet.Cells(used_rows,7).value=pass;
	excel_sheet.Cells(used_rows,8).value=50000;
	if(value_cor==1)
	{
		excel_sheet.Cells(used_rows,9).value=acc_name;
	}
	else
	{
		excel_sheet.Cells(used_rows,9).value="No";
	}
	user_trans=excel.Workbooks.Open(base_path+"user_trans.xls");
	user_trans_sheet=excel.Worksheets("Sheet1");
	user_trans.SaveAs(base_path+accno+".xls");
	sheet_quit();
	}
	catch(err)
	{
		alert(err);
	}
}