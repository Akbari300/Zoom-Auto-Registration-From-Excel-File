import '@babel/polyfill';
import {excleToJson} from './excelJson';

const RegisterForm = document.querySelector('.form--login');

if(RegisterForm){
    let file;
    RegisterForm.addEventListener('submit', e=>{
        e.preventDefault();
        document.getElementById('register').style.display = "none";
        document.getElementById('spinner').classList.add('loader');
        const meetingId = document.getElementById('meetingId').value;
		let file = document.getElementById('excelFile').files[0];
        if(file && meetingId) excleToJson(meetingId,file);
    });
}





