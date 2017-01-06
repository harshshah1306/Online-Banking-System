var mybal;
var call_fun=setInterval(function(){getbal();},1000);
var amount;
function getbal()
{
	mybal=parent.excel_sheet.Cells(parent.row_no,8).value;
	document.getElementById("my_bal").innerHTML="<u>"+mybal+"</u>";
}
function get_sender()
{
	accno=document.transfer.reciever_accno.value;
	if(accno==null || accno=="" || accno==" " || accno!=parseInt(accno))
	{
		document.getElementById("show_err").innerHTML="Account field is empty or doesn't contain NUMBERS";
		document.getElementById("receiver_name").innerHTML="";
		return false;
	}
	else if(accno==(parent.excel_sheet.Cells(parent.row_no,5).value))
	{
		document.getElementById("show_err").innerHTML="Account No. is invaild";
		document.getElementById("receiver_name").innerHTML="";
		flag=0;
		return false;
	}
	for(i=2;i<=used_rows;i++)
	{
		if(accno==(parent.excel_sheet.Cells(i,5).value))
		{
			document.getElementById("show_err").innerHTML="";
			name=parent.excel_sheet.Cells(i,1)+" "+parent.excel_sheet.Cells(i,2).value+" "+parent.excel_sheet.Cells(i,4);
			document.getElementById("receiver_name").innerHTML=name;
			flag=1;
			return true;
		}
	}
	document.getElementById("receiver_name").innerHTML="";
	document.getElementById("show_err").innerHTML="No match found";
	return false;
}

function submit_form()
{
	amount=document.transfer.transfer_amount.value;
	if(flag==0)
	{
		return false;
	}
	else if(amount=="" || amount==null || accno==null || accno=="")
	{
		document.getElementById("show_err").innerHTML="Fields are empty.";
		return false;
	}
	else if(amount!=parseInt(amount))
	{
		document.getElementById("show_err").innerHTML="Amount can't contain alphabets.";
		return false;
	}
	else if(amount<=0)
	{
		document.getElementById("show_err").innerHTML="Amount can't be lesser than 1";
		return false;
	}
	else if(amount>mybal)
	{
		alert("Insufficient Balance.");
		return false;
	}
	mybal-=amount;
	try{
	parent.excel_sheet.Cells(parent.row_no,8).value=mybal;
	parent.excel_sheet.Cells(i,8).value+=parseInt(amount);
	//add to transaction history of user (sender)
	parent.user_trans_sheet.Cells(++trans_no_sender,1).value="Me(Accno="+parent.excel_sheet.Cells(parent.row_no,5).value+")";
	parent.user_trans_sheet.Cells(trans_no_sender,2).value=name+"(Accno="+accno+")";
	parent.user_trans_sheet.Cells(trans_no_sender,3).value=amount;
	parent.user_trans_sheet.Cells(trans_no_sender,4).value=date;
	parent.user_trans_sheet.Cells(trans_no_sender,5).value=0;
	parent.user_trans.Save();
	//add to transaction history of receiver
	add_to_receiver();
	}
	catch(err)
	{
		alert(err);
	}
}
function add_to_receiver()
{
	parent.get_receiversheet(accno);
	var receiver_trans_no=parent.receiver_trans_sheet.UsedRange.rows.Count;
	if(parent.getCookie("acc_name")!="")
	{
		parent.receiver_trans_sheet.Cells(++receiver_trans_no,1).value=parent.getCookie("acc_name")+"(Accno="+parent.excel_sheet.Cells(parent.row_no,5).value+")";
	}
	else{
	parent.receiver_trans_sheet.Cells(++receiver_trans_no,1).value=parent.getCookie("name_user")+"(Accno="+parent.excel_sheet.Cells(parent.row_no,5).value+")";
	}
	parent.receiver_trans_sheet.Cells(receiver_trans_no,2).value="Me(Accno="+accno+")";
	parent.receiver_trans_sheet.Cells(receiver_trans_no,3).value=amount;
	parent.receiver_trans_sheet.Cells(receiver_trans_no,4).value=date;
	parent.receiver_trans_sheet.Cells(receiver_trans_no,5).value=1;
	parent.receiver_file.Save();
	parent.receiver_file.Close();
}