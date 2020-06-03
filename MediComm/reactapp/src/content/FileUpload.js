import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
var ObjectID = require('mongodb').ObjectID;

//makeid to save profile pics and associate them with the users
function makefileid(length, ending) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + ending;
 }

class Me extends React.Component{

    profilepicfile = "";

    constructor(){
        super();
        this.state = {
            profilepic: '',
            mail: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            mail: '',
            fax: '',
            url: '',
            fieldofwork: '',
            insurednumber: '',
            healthinsurance: '',
            isDoc: '',
            patid: '',
            userid: '',
            docid: '',
            file: '',
            pat_userid: '',
            filename: '',
            original_filename: '',
            filetype: ''
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        
          
    }

    handleInputChange = e => {
        console.log("file set");
        this.setState({
          [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e =>
    {
        e.preventDefault();
        const {mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid, pat_userid, filename, original_filename, filetype} = this.state;
        const form_data = new FormData();
        //If a profile pic is sent, it's name gets replaced by a string for identification. this string is once saved in the user table and accesable via uploads/newfilename
        const patientfile = 
        {
            pat_userid: this.state.userid,
            filename: makefileid(20, ".pdf"),
            original_filename: '',
            filetype: "test"
        };

        //console.log("file is: " + e.target.file.files[0]);
        
        if(e.target.file.files[0])
        {
            console.log("file found");
            form_data.append("file", e.target.file.files[0]);
            form_data.append("newfilename", patientfile.filename);
            patientfile.original_filename = e.target.file.files[0].name;
        }

        const headerss = {
            'content-type': 'multipart/form-data'
        }
        if(e.target.file.files[0])
        {
            axios
            .post('http://localhost:8080/fileUpload', form_data,{headerss})
                .then(() => console.log('File uploaded.'))
                .catch(err => {
                    console.error(err);
            });
            axios
            .post('http://localhost:8080/patientfile-sent', patientfile)
                .then(() => console.log('patientfile uploaded.'))
                .catch(err => {
                    console.error(err);
            });
        }
       //HIER WEITER
        
        console.log("new filename: " + patientfile.filename);



        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    setUsername(username)
    {
        this.username = username;
        console.log("username: " + username);
    }

    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {
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
            console.log(response.data.profilepic);
            if(response.data.user.profilepic)
            {
                this.setState({profilepic: response.data.user.profilepic});
                this.setState({profilepicfile: response.data.user.profilepic});
            }
            this.setState({userid: response.data.user._id});
            this.setState({patid: response.data.patient._id});
            this.setState({mail: response.data.patient.mail});
            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
            this.setState({insurednumber: response.data.patient.insurednumber});
            this.setState({healthinsurance: response.data.patient.healthinsurance});
        });

      

        

        /*fetch('http://localhost:8080/me')
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed.')
                }
                return response;
            })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    persons: data
                });
                console.log('parsed json', data);            
            }, (ex) => {
                this.setState({
                    requestError : true
                });
                console.log('parsing failed', ex)
            })*/

        /*axios.get('http://localhost:8080/me',
        { headers: { 'token':  Cookies.get("token") } }
        ).then((data)=>{
            console.log('data comming',data);
        }).catch((error)=>{
            console.log('error comming',error);
        });*/
    }  

    isDoc()
    {
        if(this.state.isDoc == "1")
            return true;
        else
            return false;
    }

    docContent()
    {
        return("");
    }

    checkProfilepic()
    {
        if(this.state.profilepicfile)
            return (<img src = {require("../uploads/" + this.state.profilepicfile)} />);
        else
            return ("no image");
    }

    patientContent()
    {
        return(
        <div>
            <div className="title">
                Profileedit
            </div>


            <div className="bg-right"></div>

            <form onSubmit={this.handleSubmit} encType="multipart/formdata">
                

                <input type="file" name="file" onChange={this.handleInputChange}/> <br/>
                
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

    checkLogin(mail)
    {
        
            return mail()

            /*try {
                const decoded = jwt.verify(this.state.token, "randomString");
                //return "it is: " + decoded.user;
                const user = User.findById(req.user.id);
            } catch (e) {
                console.error(e);
            }*/
    }

    render(){

        return this.getContent();
    }
}

export default Me;