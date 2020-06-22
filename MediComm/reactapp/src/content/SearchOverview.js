import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./tools";
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
        
        //console.log("user profilepic: " + user.profilepic);

        //using axios to post
        axios
        .post(Tools.host + '/edit-sent-user', user)
            .then(() => console.log('User updated :))'))
            .catch(err => {
                console.error(err);
        });
        if(this.state.isDoc === "0")
        {
            axios
            .post(Tools.host + '/edit-sent-patient', patient)
                .then(() => console.log('Patient updated :))'))
                .catch(err => {
                    console.error(err);
            });
        }
        else
        {
            axios
            .post(Tools.host + '/edit-sent-doctor', doctor)
                .then(() => console.log('Doktor updated :))'))
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
                .then(() => console.log('Profilepic set.'))
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

    docContent()
    {
        return(
            <div className="form w-50 mx-auto my-5">

            <form action="searchmypats" encType="multipart/formdata">

            <input type="text" placeholder="Suche Patienten durch Nachnamen..." className="input form-control py-3" name="patlastname"/>
                    <br></br>
                    <div className=" button text-center">
            <input type="submit" className="btn btn-primary" value="Submit" style={{fontWeight: 'bold', fontSize: 15}}></input>
            </div>
            </form>
        </div>
        );
    }

    patientContent()
    {
        return(
            <div className="form w-50 mx-auto my-5">

            <form action="searchmydocs" encType="multipart/formdata">

            <input type="text" placeholder="Suche Doktor durch Nachnamen..." className="input form-control py-3" name="doclastname"/>
            <br></br>
            <div className=" button text-center">
            <input type="submit" className="btn btn-primary" value="Submit" style={{fontWeight: 'bold', fontSize: 15}}></input>
            </div>
            </form>
        </div>
        )
    }

    getContent()
    {
        if(Tools.isDoc(this))
            return this.docContent();
        else
            return this.patientContent();
    }


    render(){

        return this.getContent();
    }
}

export default Me;