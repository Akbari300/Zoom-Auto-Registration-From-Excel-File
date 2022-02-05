import Excel from 'exceljs';
import {callRegiserApi} from './callApi';
import {showAlert} from './alerts';

export const excleToJson = (meetingId,file)=>{
    const workbook = new Excel.Workbook();
	const reader = new FileReader();
	reader.readAsArrayBuffer(file);
    reader.onload = () => {
        const buffer = reader.result;
        let result = workbook.xlsx.load(buffer)
            .then(function () {
                const worksheet = workbook.getWorksheet('Data');
                let headers = ['first_name', 'last_name', 'email'];
                let result1 = [];
                if(worksheet){
                    worksheet.eachRow(function (row, rowNumber) {
                        let obj = {};
                        for(var j=0;j<headers.length - 1;j++){
                            obj[headers[j]] = row.getCell(j+1).value;
                        }
                        obj[headers[2]]= row.getCell(3).value.text;
    
                        if(obj.first_name!= 'First_Name')
                            result1.push(obj);
                    });

                    callRegiserApi(meetingId,result1);
                }
                else{
                    showAlert('error',"EXCEL File IS NOT in CORRECT FORMAT");
                    window.setTimeout(()=>{
                        location.assign('/');
                    }, 1500);
                }
                
            });	
    }
            

}