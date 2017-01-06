var used_rows,excel,excel_sheet,excel_file,user_trans,user_trans_sheet,prev_page;
var base_path="H:\\Online Banking-Project\\data\\";
var receiver_file,receiver_trans_sheet;
var i;
function get_excelsheet()
{
	excel=new ActiveXObject("Excel.Application");
	excel.DisplayAlerts=false;
	excel.visible=false;
	excel_file=excel.Workbooks.Open(base_path+"users.xls");
	excel_sheet=excel.Worksheets("Sheet1");
	used_rows=excel_sheet.UsedRange.rows.Count;
}
function excel_getdata(user,pass)
{
	for(i=2;i<=used_rows;i++)
	{
		if(user==excel_sheet.Cells(i,6).value && pass==excel_sheet.Cells(i,7).value)
		{
			setCookie("name_user",(excel_sheet.Cells(i,1)+excel_sheet.Cells(i,2).value+excel_sheet.Cells(i,4)));
			setCookie("used_rows",i);
			return true;
		}
	}
	return false;
}
function sheet_quit()
{
	excel_file.Save();
	excel.Application.Quit();
}

function get_usersheet()
{
	user_trans=excel.Workbooks.Open(base_path+excel_sheet.Cells(row_no,5).value+".xls");
	user_trans_sheet=excel.Worksheets("Sheet1");
}
function get_receiversheet(accno)
{
	receiver_file=excel.Workbooks.Open(base_path+accno+".xls");
	receiver_trans_sheet=excel.Worksheets("Sheet1");
}