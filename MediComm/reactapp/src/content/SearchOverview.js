import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
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
            console.log("i doc")
            patient = {
                insurednumber,
                healthinsurance,
                patid
            };
        }
        else
        {
            console.log("i doc")
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
        
        console.log("user profilepic: " + user.profilepic);

        //using axios to post
        axios
        .post('http://localhost:8080/edit-sent-user', user)
            .then(() => console.log('User updated :))'))
            .catch(err => {
                console.error(err);
        });
        if(this.state.isDoc === "0")
        {
            axios
            .post('http://localhost:8080/edit-sent-patient', patient)
                .then(() => console.log('Patient updated :))'))
                .catch(err => {
                    console.error(err);
            });
        }
        else
        {
            axios
            .post('http://localhost:8080/edit-sent-doctor', doctor)
                .then(() => console.log('Patient updated :))'))
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
            .post('http://localhost:8080/profilepic-sent', form_data,{headerss})
                .then(() => console.log('Profilepic set.'))
                .catch(err => {
                    console.error(err);
            });
        }


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    setUsername(username)
    {
        this.username = username;
        console.log("username: " + username);
    }

    getUserData(){

        const url = 'http://localhost:8080/me';
        const options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };
        axios.get(url, options)
        .then(response => {
            //console.log(response.json({message: "request received!", response}));
            //this.state.mail = response.json({message: "request received!", response}).parse();
            //console.log (response.json());
            //this.state.mail = response.data.firstname;
            //console.log(response.data);
            //this.setUsername(response.data.firstname)
            //this.setState(resp);
            //console.log(response.data);
            if(response.data.user.profilepic)
            {
                this.setState({profilepic: response.data.user.profilepic});
                this.setState({profilepicfile: response.data.user.profilepic});
            }
            this.setState({userid: response.data.user._id});
            this.setState({mail: response.data.user.mail});
            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
            this.setState({isDoc: response.data.user.isDoc});
            if(response.data.user.isDoc === "0")
            {
                this.setState({patid: response.data.patient._id});
                this.setState({insurednumber: response.data.patient.insurednumber});
                this.setState({healthinsurance: response.data.patient.healthinsurance});
            }
            else
            {
                this.setState({docid: response.data.doctor._id});
                this.setState({fax: response.data.doctor.fax});
                this.setState({phone: response.data.doctor.phone});
                this.setState({fieldofwork: response.data.doctor.fieldofwork});
                this.setState({establishmentnumber: response.data.doctor.establishmentnumber});
            }
            
        });
        
    }

    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {
        this.getUserData();
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
            <div>

            <form action="searchmypats" encType="multipart/formdata">
                
            <input type="text" placeholder="Suche Patienten durch Nachnamen..." className="input" name="patlastname"/>
                    
            <input type="submit" className="btn btn-primary" value="Submit" />
                
            </form>
        </div>
        );
    }

    patientContent()
    {
        return(
        <div>

            <form action="searchmydocs" encType="multipart/formdata">
                
            <input type="text" placeholder="Suche Doktor durch Nachnamen..." className="input" name="doclastname"/>
                    
            <input type="submit" className="btn btn-primary" value="Submit" />
                
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