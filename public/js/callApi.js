import axios from 'axios';
import req from 'express/lib/request';
import {showAlert} from './alerts';


export const callRegiserApi = async(meetingId,data)=>{
    try{
        const res= await axios({
            method: 'POST',
            url: `/api/v1/excel/${meetingId}`,
            data:{
                data
            }
        });

        if(res.data.status === 'success'){
            document.getElementById('spinner').classList.remove('loader');
            showAlert('success','Successfully registered');
            document.getElementById('register').style.display = "block";

            window.setTimeout(()=>{
                location.assign('/');
            }, 5000);
        }
    }catch(err){
        document.getElementById('spinner').classList.remove('loader');
        document.getElementById('register').style.display = "block";
        showAlert('error',err.response.data.message);
        window.setTimeout(()=>{
            location.assign('/');
        }, 5000);
    }
}