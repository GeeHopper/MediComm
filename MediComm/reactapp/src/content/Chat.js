import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import ReactPlayer from 'react-player/lazy'
var ObjectID = require('mongodb').ObjectID;



class Chat extends React.Component {

    profilepicfile = "";

    constructor() {
        super();
        this.state = {
            profilepic: '',
            mail: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
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

            //chat attributes
            message: '',
            receiver: '',
            messages: [],
            senders: [],
            receivers: [],
            content: [],
            types: [],
            blob_urls: [],

            errormsg: ''
        };

        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");


    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid, receiver, message } = this.state;

        //If a profile pic is sent, it's name gets replaced by a string for identification. this string is once saved in the user table and accesable via uploads/newfilename
        const chat = {
            sender: this.state.mail,
            receiver: this.state.receiver,
            message: this.state.message,
            type: 'text',
        }


        //using axios to post
        axios
            .post('http://localhost:8080/chat-sent', chat)
            .then(() => console.log('Message sent :))'))
            .catch(err => {
                console.error(err);
            });



        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    setUsername(username) {
        this.username = username;
        console.log("username: " + username);
    }

    componentWillMount() {
        //Fetching user data
        var url = 'http://localhost:8080/me';
        var options = {
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
                if (response.data.user.profilepic) {
                    this.setState({ profilepic: response.data.user.profilepic });
                    this.setState({ profilepicfile: response.data.user.profilepic });
                }
                this.setState({ userid: response.data.user._id });
                this.setState({ firstname: response.data.user.firstname });
                this.setState({ lastname: response.data.user.lastname });
                this.setState({ password: response.data.user.password });
                this.setState({ address: response.data.user.address });
                this.setState({ isDoc: response.data.user.isDoc });
                this.setState({ mail: response.data.user.mail});
                //this.setState({insurednumber: response.data.patient.insurednumber});
                //this.setState({healthinsurance: response.data.patient.healthinsurance});


                console.log("your id is: " + this.state.userid);
                url = 'http://localhost:8080/chat-receive';
                options = {
                    method: 'POST',
                    headers: {
                        'token': Cookies.get("token")
                    },
                    data: {
                        'mail': this.state.mail
                    }
                };
                axios.post(url, options)
                    .then(response => {
                        console.log(response.data.messages[0]);
                        for (var i = 0; i < response.data.messages.length; i++) {
                            console.log("adding message: " + response.data.messages[0].message);
                            this.state.messages.push(response.data.messages[i].message);
                            this.setState({
                                messages: this.state.messages
                            });

                            /*var blobURL = URL.createObjectURL(this.state.messages[i]);
                            this.state.blob_urls.push(blobURL);
                            this.setState({
                                blob_urls: this.state.blob_urls
                            });*/


                            console.log("senders: " + response.data.messages[i].receiver)

                            this.state.senders.push(response.data.messages[i].sender);
                            this.setState({
                                senders: this.state.senders
                            });

                            this.state.receivers.push(response.data.messages[i].receiver);
                            this.setState({
                                receivers: this.state.receivers
                            });

                            this.state.types.push(response.data.messages[i].type);
                            this.setState({
                                types: this.state.types
                            });

                        }

                        var newContent = [];
                        console.log("len is: " + this.state.messages.length);
                        for (var i = 0; i < this.state.messages.length; i++) {
                            console.log("i: " + i);
                            newContent.push(this.chatContent(i));
                        }

                        this.setState({
                            content: newContent
                        }, () => {
                            console.log("content:")
                        })
                    });


            }).catch(error => {
                this.setState({errormsg: error.message});
                console.log("error is: " + error.message);
            });


        //Fetching messages
    }



    chatContent(i) {
        var content = [];

        if (this.state.senders[i] !== this.state.mail) {
            if(this.state.types[i] === "text")
            {
                return (
                    <div key={"main" + i}>
                        {this.state.messages[i]} from {this.state.senders[i]}
                        <br />
                        <hr />
                    </div>

                );
            }
            else if(this.state.types[i] === "audio"){
                console.log("type is...: " + this.state.types[i]);
                return(
                    <div key={"main" + i}>
                        <ReactPlayer url={this.state.messages[i]} controls height='10%' />
                            from {this.state.senders[i]}
                        <br />
                        <hr />
                    </div>
                );
            }
        }
        else {
            if(this.state.types[i] === "text")
            {
                return (
                    <div key={"main" + i}>
                        {this.state.messages[i]} to {this.state.receivers[i]}
                        <br />
                        <hr />
                    </div>

                );
            }
            else if(this.state.types[i] === "audio"){
                return(
                    <div key={"main" + i}>
                            <ReactPlayer url={this.state.messages[i]} controls height={20} /> 
                            to {this.state.receivers[i]}
                            <br />
                            <hr />
                    </div>
                );
            }
        }
    }




    isDoc() {
        if (this.state.isDoc === "1")
            return true;
        else
            return false;
    }

    docContent() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    {
                        this.state.content
                    }
                    <input type="text" placeholder="Receiver" value={this.state.receiver} className="input" name="receiver" onChange={this.handleInputChange} />
                    <input type="text" placeholder="Message" value={this.state.message} className="input" name="message" onChange={this.handleInputChange} />


                    <input type="submit" className="btn btn-primary" value="Submit" />

                </form>


            </div>
        );
    }

    checkProfilepic() {
        if (this.state.profilepicfile)
            return (<img src={require("../uploads/" + this.state.profilepicfile)} />);
        else
            return ("no image");
    }

    patientContent() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    {
                        this.state.content
                    }
                    <input type="text" placeholder="Receiver" value={this.state.receiver} className="input" name="receiver" onChange={this.handleInputChange} />
                    <input type="text" placeholder="Message" value={this.state.message} className="input" name="message" onChange={this.handleInputChange} />


                    <input type="submit" className="btn btn-primary" value="Submit" />

                </form>


            </div>
        )
    }

    errorContent()
    {
        return(
            <div>
                Something went wrong :( error is: {this.state.errormsg}
            </div>

        );
    }

    getContent() {
        if(this.state.errormsg === '')
        {
            if (this.isDoc())
                return this.docContent();
            else
                return this.patientContent();
        }
        else
        {
            return this.errorContent();
        }
    }

    checkLogin(mail) {

        return mail()

        /*try {
            const decoded = jwt.verify(this.state.token, "randomString");
            //return "it is: " + decoded.user;
            const user = User.findById(req.user.id);
        } catch (e) {
            console.error(e);
        }*/
    }

    render() {
        return this.getContent();
    }
}

export default Chat;