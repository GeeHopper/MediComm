import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview/index.js'; // source code : ./src/demo/AppWithImagePreview/ImagePreview

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
        .post('http://localhost:8080/edit-sent-user', user)
            .then(() => console.log('User updated :))'))
            .catch(err => {
                console.error(err);
        });
        axios
        .post('http://localhost:8080/edit-sent-patient', patient)
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
            //this.setState({patid: response.data.patient._id});
            //this.setState({mail: response.data.patient.mail});
            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
            this.setState({isDoc: response.data.user.isDoc});
            //this.setState({insurednumber: response.data.patient.insurednumber});
            //this.setState({healthinsurance: response.data.patient.healthinsurance});
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

    
    handleTakePhotoAnimationDone (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
        this.setState({dataUri: dataUri});
    }

    docContent()
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

        );
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
        if(this.isDoc())
        {
            console.log("u docc");
            return this.docContent();
        }
        else
        {
            console.log("u patt");
            return this.patientContent();

        }
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

export default Picture;