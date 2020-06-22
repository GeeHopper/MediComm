import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview/index.js'; // source code : ./src/demo/AppWithImagePreview/ImagePreview
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

class Picture extends React.Component{

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
            profilepicfile: '',
            dataUri: '',
            setDataUri: '',
            isFullscreen: false
           
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        this.handleTakePhotoAnimationDone = this.handleTakePhotoAnimationDone.bind(this);
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
        const {mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid} = this.state;
        const form_data = new FormData();
        //If a profile pic is sent, it's name gets replaced by a string for identification. this string is once saved in the user table and accesable via uploads/newfilename
        const user = {
            mail,
            firstname,
            lastname,
            password,
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
       
        const patient = {
            insurednumber,
            healthinsurance,
            patid
        };
        
        console.log("user profilepic: " + user.profilepic);

        //using axios to post
        axios
        .post(Tools.host + '/edit-sent-user', user)
            .then(() => console.log('User updated :))'))
            .catch(err => {
                console.error(err);
        });
        axios
        .post(Tools.host + '/edit-sent-patient', patient)
            .then(() => console.log('Patient updated :))'))
            .catch(err => {
                console.error(err);
        });
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

    
    handleTakePhotoAnimationDone (dataUri) {
        // Do stuff with the photo...
        //console.log('takePhoto');
        this.setState({dataUri: dataUri});
    }

    Content()
    {
        return(
            <div>
            {
                (this.state.dataUri)
                ? <ImagePreview dataUri={this.state.dataUri}
                    isFullscreen={this.state.isFullscreen}
                /> 
                : <Camera onTakePhotoAnimationDone = {this.handleTakePhotoAnimationDone}
                    isFullscreen={this.state.isFullscreen}
                />
            }
        </div>

        )
    }

    getContent()
    {
        return this.Content()
    }

    render(){

        return this.getContent();
    }
}

export default Picture;