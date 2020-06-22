


import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";

var ObjectID = require('mongodb').ObjectID;

//makeid to save profile pics and associate them with the users
function makeprofilepicid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + ".png";
 }

class Me extends React.Component{

    profilepicfile = "";

    constructor(){
        super();
        this.state = {
            //basic userdata
            profilepic: '',
            mail: '',
            firstname: '',
            lastname: '',
            address: '',
            isDoc: '',
            patid: '',
            userid: '',
            docid: '',
            profilepicfile: '',

            //doc related   
            phone: '',
            fax: '',
            fieldofwork: '',
            establishmentnumber: '',

            //patient related
            insurednumber: '',
            healthinsurance: '',
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));
        
          
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e =>
    {
        e.preventDefault();
        const {mail, firstname, lastname, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid, docid, fieldofwork, phone, fax, docnum, establishmentnumber} = this.state;
        const form_data = new FormData();
        //If a profile pic is sent, it's name gets replaced by a string for identification. this string is once saved in the user table and accesable via uploads/newfilename
        const user = {
            mail,
            firstname,
            lastname,
            address,
            agreement,
            userid,
            profilepic
        }
        
        if(e.target.profilepic.files[0])
        {
            const newfilename = makeprofilepicid(20);
            form_data.append("file", e.target.profilepic.files[0]);
            form_data.append("newfilename", newfilename);
            user.profilepic = newfilename;
        }

        var doctor = '';
        var patient = '';
       
        if(this.state.isDoc === "0")
        {
            patient = {
                insurednumber,
                healthinsurance,
                patid
            };
        }
        else
        {
            doctor = {
                phone,
                fax,
                docnum,
                establishmentnumber,
                fieldofwork,
                mail,
                docid
            }
        }

        //using axios to post
        axios
        .post(Tools.host + '/edit-sent-user', user)
            .then(() => console.log('User updated. :))'))
            .catch(err => {
                console.error(err);
        });
        if(this.state.isDoc === "0")
        {
            axios
            .post(Tools.host + '/edit-sent-patient', patient)
                .then(() => console.log('Patient updated. :))'))
                .catch(err => {
                    console.error(err);
            });
        }
        else
        {
            axios
            .post(Tools.host + '/edit-sent-doctor', doctor)
                .then(() => console.log('Doctor updated. :))'))
                .catch(err => {
                    console.error(err);
            });
        }
        const headerss = {
            'content-type': 'multipart/form-data'
        }
        if(e.target.profilepic.files[0])
        {
            axios
            .post(Tools.host + '/profilepic-sent', form_data,{headerss})
                .then(() => console.log('Profilepic set. :)'))
                .catch(err => {
                    console.error(err);
            });
        }


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/


    }
    
    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {
        Tools.getUserData(this);
    }  

    isDoc()
    {
        if(this.state.isDoc === "1")
            return true;
        else
            return false;
    }

    docContent()
    {
        return(
            <div className="form w-50 mx-auto my-5">


            <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                {this.checkProfilepic()}
                <br />

                <input type="file" name="profilepic" onChange={this.handleInputChange}/> <br/>


                <div className="mail ">
                    <div className="input_field my-4">
               <input type="text" placeholder="E-Mail" value={this.state.mail} className="input form-control py-3" name="mail" onChange={this.handleInputChange}/>
               <i className="mail"></i>
                    </div>
                    </div>

                    <div className="vorName">
                    <div className="input_field my-4">
              <input name="firstname" type="text" value={this.state.firstname} placeholder="Vorname" className="input form-control py-3" onChange={this.handleInputChange}/>
              </div>
              </div>

              <div className="nachName">
                    <div className="input_field my-4">
       <input type="text" placeholder="Nachname" value={this.state.lastname} className="input form-control py-3" name="lastname" onChange={this.handleInputChange}/>
       </div>
              </div>

                    <div className="anschrift">
                    <div className="input_field my-4">
             <input type="text" placeholder="Anschrift" value={this.state.address} className="input form-control py-3" name="address" onChange={this.handleInputChange}/>
             </div>
              </div>


              <div className="kk">
                    <div className="input_field my-4">
             <input list="kk" placeholder="Phone" className="input form-control py-3"  value={this.state.phone} name="phone" onChange={this.handleInputChange}/>
             </div>
              </div>

              <div className="Fax">
                    <div className="input_field my-4">
                <input type="text" placeholder="Fax" className="input form-control py-3" value={this.state.fax} name="fax" onChange={this.handleInputChange}/>
               </div>
              </div>

                <div className="verNr">
                <div className="input_field my-4">
                 <input type="text" placeholder="Establishmentnumber" className="input form-control py-3" value={this.state.establishmentnumber} name="establishmentnumber" onChange={this.handleInputChange}/>
                 </div>
              </div>

              <div className="work">
                <div className="input_field my-4">
              <input type="text" placeholder="Field of work" className="input form-control py-3" value={this.state.fieldofwork} name="fieldofwork" onChange={this.handleInputChange}/>
              </div>
              </div>

                <div className=" button text-center">
                <input type="submit" className="btn btn-primary" value="Submit"  style={{fontWeight: 'bold', fontSize: 15}}></input>
                </div>

            </form>
        </div>
        );
    }

    checkProfilepic()
    {
        if(this.state.profilepicfile)
            return (<img src = {require("../../public/uploads/" + this.state.profilepicfile)} width="200" height="200"/>);
        else
            return ("no image");
    }

    patientContent()
    {
        return(
            <div className="form w-50 mx-auto my-5">
            <div className="title ">
                <h2 className="text-secondary mb-5 py-4 text-center"> <u>Profilansicht</u> </h2>
             </div>
 
 
 
             <form onSubmit={this.handleSubmit} encType="multipart/formdata">
 
             <input type="file" name="profilepic" onChange={this.handleInputChange}/> <br/>
 
                 <div className="mail ">
                     <div className="input_field my-4">
                         <input type="text" placeholder="E-Mail" value={this.state.mail} className="input form-control py-3" name="mail" onChange={this.handleInputChange}/>
                         <i className="mail"></i>
                     </div>
                 </div>
 
                 <div className="vorName">
                     <div className="input_field my-4">
                         <input name="firstname" type="text" value={this.state.firstname} placeholder="Vorname" className="input form-control py-3" onChange={this.handleInputChange}/>
                         <i className="name"></i>
                     </div>
 
                 </div>
 
                 <div className="nachName">
                     <div className="input_field my-4">
                         <input type="text" placeholder="Nachname" value={this.state.lastname} className="input form-control py-3" name="lastname" onChange={this.handleInputChange}/>
                         <i className="name"></i>
                     </div>
                 </div>
 
                 <div className="anschrift">
                     <div className="input_field my-4">
                         <input type="text" placeholder="Anschrift" value={this.state.address} className="input form-control py-3" name="address" onChange={this.handleInputChange}/>
                         <i className="anschrift"></i>
                     </div>
                 </div>
 
 
                 <div className="kk">
                     <div className="input_field my-4">
                         <input list="kk" placeholder="Krankenkasse" className="input form-control py-3" value={this.state.healthinsurance} name="healthinsurance" onChange={this.handleInputChange}/>
                         <datalist id="kk">
                             <option value="AOK" />
                             <option value="Knappschaft" />
                             <option value="Innungskrankenkasse" />
                             <option value="DAK Gesundheit" />
                             <option value="BARMER" />
                         </datalist>
                     </div>
                 </div>
 
                 <div className="verNr">
                 <div className="input_field my-4">
                     <input type="text" placeholder="Versichertennummer" className="input form-control py-3" value={this.state.insurednumber} name="insurednumber" onChange={this.handleInputChange}/>
                     <i className="verNr"></i>
                 </div>
                 </div>
                 {this.checkProfilepic()}
 
 
 
                 <div className="button text-center" >
                 <input type="submit" className="btn btn-primary" value="Submit" style={{fontWeight: 'bold', fontSize: 15}}></input>
                 </div>
             </form>
         </div>

        )
    }

    getContent()
    {
        if(this.isDoc())
            return this.docContent();
        else
            return this.patientContent();
    }


    render(){

        return this.getContent();
    }
}

export default Me;

