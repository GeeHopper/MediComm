import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./tools";
var ObjectID = require('mongodb').ObjectID;

//makeid to save profile pics and associate them with the users
function makefileid(length, ending) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

class FileUploadDoc extends React.Component{

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
            pat_mail: '',
            filename: '',
            original_filename: '',
            filetype: '',
            notes: '',
            sharedWith: []
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));
        
          
    }

    handleInputChange = e => {
        //("file set");
        this.setState({
          [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e =>
    {
        e.preventDefault();
        const {mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid, pat_mail, filename, original_filename, filetype} = this.state;
        const form_data = new FormData();
        //If a profile pic is sent, it's name gets replaced by a string for identification. this string is once saved in the user table and accesable via uploads/newfilename
        const patientfile = 
        {
            pat_mail: '',
            filename: makefileid(20),
            original_filename: '',
            filetype: '',
            shareWith: ''
        };

        //console.log("file is: " + e.target.file.files[0]);
        
        if(e.target.file.files[0])
        {
            //("file found");
            form_data.append("file", e.target.file.files[0]);
            form_data.append("newfilename", patientfile.filename);
            form_data.append("filetype", e.target.file.files[0].name.split('.').pop());
            patientfile.original_filename = e.target.file.files[0].name;
            patientfile.filetype = e.target.file.files[0].name.split('.').pop();
            patientfile.notes = this.state.notes;
            patientfile.pat_mail = this.state.pat_mail;
            patientfile.shareWith = this.state.mail;
        }

        const headerss = {
            'content-type': 'multipart/form-data'
        }
        if(e.target.file.files[0])
        {
            axios
            .post(Tools.host + '/fileUpload', form_data,{headerss})
                .then(() => console.log('File uploaded.'))
                .catch(err => {
                    console.error(err);
            });
            axios
            .post(Tools.host + '/patientfile-sent', patientfile)
                .then(() => console.log('patientfile uploaded.'))
                .catch(err => {
                    console.error(err);
            });
        }
       //HIER WEITER
        
        //console.log("new filename: " + patientfile.filename);



        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {
        Tools.getUserData(this);
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

    docContent()
    {
        return(
            <div className="form w-50 mx-auto my-5">

               <div className="title">
              <h5 class="text-secondary mb-5 py-4 text-center"> <u> Dateien hochladen</u> </h5>
            </div>




                <form onSubmit={this.handleSubmit} encType="multipart/formdata">
                    

                    <input type="file" name="file" onChange={this.handleInputChange}/> <br/>

                    <input type="text " placeholder="Patient related to the document" className="input form-control my-4 py-3" onChange={this.handleInputChange} name="pat_mail"></input>
                    
                    <input type="text" placeholder="keywords/comments" className="input form-control my-4 py-3" onChange={this.handleInputChange} name="notes"></input>

                    <input type="submit" className="btn btn-primary " value="Submit" />
                    
                </form>
            </div>
        )
    }

    patientContent()
    {
        return(
        <div>
            Bitte als Arzt einloggen.
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

export default FileUploadDoc;