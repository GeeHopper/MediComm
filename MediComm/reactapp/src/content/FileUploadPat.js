import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";
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

class FileUpload extends React.Component{

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
            shareWith: []
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));
        
          
    }

    handleInputChange = e => {
        //console.log("file set");
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
            pat_mail: this.state.mail,
            filename: makefileid(20),
            original_filename: '',
            filetype: '',
            shareWith: ''
        };

        //console.log("file is: " + e.target.file.files[0]);
        
        if(e.target.file.files[0])
        {
            //console.log("file found");
            form_data.append("file", e.target.file.files[0]);
            form_data.append("newfilename", patientfile.filename);
            form_data.append("filetype", e.target.file.files[0].name.split('.').pop());
            patientfile.original_filename = e.target.file.files[0].name;
            patientfile.filetype = e.target.file.files[0].name.split('.').pop();
            patientfile.notes = this.state.notes;
            patientfile.shareWith = this.state.shareWith;
            //console.log("sharing with: " + patientfile.shareWith)
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
        
        //console.log("new filename: " + patientfile.filename);



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
            <div>
                Bitte als Patient einloggen. :)
            </div>
        );
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
                
                <input type="text" placeholder="keywords/comments" onChange={this.handleInputChange} name="notes"></input>

                <input type="text" placeholder="Doctor IDs" onChange={this.handleInputChange} name="shareWith"></input>

                <input type="submit" className="btn btn-primary" value="Submit" />
                
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

export default FileUpload;