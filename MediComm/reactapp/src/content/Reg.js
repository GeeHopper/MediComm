import React from 'react';
import logo from './logo.svg';
import './App.css';

class Reg extends React.Component{
  render(){
  return (
  <div>
     <style>{"\
        .container-fluid,.col-md-6,.d-flex{\
            min-height: 50vh;\
        }\
        @media screen and (min-width: 767px){\
            .container-fluid,.col-md-6,.d-flex{\
            min-height: 100vh;\
        }\
        }\

       .row {\

            min-height: 100vh;\
        }\

        img {\

            border-radius: 50%;\
            width: 155px;\
            margin-bottom: 16px;\
        }\

        .doctor-img {\
            border: 2px solid #eeeeee;\
            opacity: 0.6;\
            transition: all 0.5s ease;\
        }\

        .doctor-img:hover {\
            border: 2px solid #eb9788;\
            opacity: 1;\
        }\
        .patient-img{\
            border: 2px solid #eeeeee;\
            opacity: 0.6;\
            transition: all 0.5s ease;\
        }\
        .patient-img:hover{\
            border: 2px solid #3aaf9f;\
            opacity: 1;\
          }\
       "}
    </style>

    <div className="container-fluid text-center">
        <div className="row ">
            <div className="col-md-6" style="background: #f3eded;">
                <div className="d-flex justify-content-center align-items-center">
                    <div id="box1">
                        <a href="/Users/zulfiyecakmak/Desktop/Web-Projekt/doc-reg.html">
                            <img className="doctor-img" src="img/doctor.png" alt="doctor-img"></img></a> 
                        <div className="d-caption">
                           <h5 style="color: #b7472a;">Doctor</h5> 
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-md-6" style="background: #e1f2fb;">
                <div className="d-flex justify-content-center align-items-center">
                    <div id="box2">
                        <a href="/Users/zulfiyecakmak/Desktop/Web-Projekt/pat-reg.html">
                            <img className="patient-img" src="img/patient.png" alt="patient-img"></img></a>
                        <div className="p-caption">
                           <h5 style="color: #0c7b93;">Patient</h5> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

  
  );


export default App;
