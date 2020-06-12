import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
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

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
var blob_file = '';


class Voice extends React.Component{

    profilepicfile = "";

    constructor(props){
        super(props);
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
            filetype: '',
            notes: '',
            shareWith: [],

            receiver: '',

            //audio related states
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        this.stop = this.stop.bind(this);
          
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
        const {mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid, pat_userid, receiver, blobURL, blob} = this.state;
        const form_data = new FormData();
        
        //console.log("file is: " + e.target.file.files[0]);
        
        console.log("NOW BLOB IS: " + blob_file);

        const chat = {
            sender: this.state.userid,
            receiver: this.state.receiver,
            message: blob_file,
            type: 'audio',
        }

        if(blob_file !== '')
        {
            console.log("blob found");
            form_data.append("blob", blob_file);
        }
        else{
            console.log("please record audio before submitting");
        }

        const headerss = {
            'content-type': 'multipart/form-data'
        }
        if(this.state.blobURL)
        {
            console.log("sending blob...");
            axios
            .post('http://localhost:8080/chat-sent', chat)
            .then(() => console.log('Message sent :))'))
            .catch(err => {
                console.error(err);
            });
        }



        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
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
            console.log(response.data.profilepic);
            if(response.data.user.profilepic)
            {
                this.setState({profilepic: response.data.user.profilepic});
                this.setState({profilepicfile: response.data.user.profilepic});
            }
            this.setState({userid: response.data.user._id});
            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
        });

        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true })
            },
          );
    }  

    start = () =>{
        if (this.state.isBlocked) {
          console.log('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              this.setState({ isRecording: true });
            }).catch((e) => console.error(e));
        }
    };

    stop = () =>{
        console.log("stoppedDdD");
        
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            var base64data = '';
            reader.onloadend = function() {
                base64data = reader.result;                
                console.log("blob is: " + base64data);
                blob_file = base64data;
            }
            
            const blobURL = URL.createObjectURL(blob)
            this.setState({ blobURL, isRecording: false });
          }).catch((e) => console.log(e));
    };

    

    render(){

        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    <input type="text" placeholder="Receiver" value={this.state.receiver} className="input" name="receiver" onChange={this.handleInputChange} />
                    
                    <input type="submit" className="btn btn-primary" value="Submit" /><br />

                    
                    
                </form>

                    <button onClick={this.start} disabled={this.state.isRecording}>
                        Record
                    </button>
                    <button onClick={this.stop} disabled={!this.state.isRecording}>
                        Stop
                    </button>
                    <audio src={this.state.blobURL} controls="controls" />
            </div>
        );
    }
}

export default Voice;