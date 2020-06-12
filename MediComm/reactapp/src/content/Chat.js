import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
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

            //chat attributes
            message: '',
            receiver: '',
            messages: [],
            senders: [],
            receivers: [],
            content: [],
            types: [],

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
            sender: this.state.userid,
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
                this.setState({ docid: response.data.doctor._id });
                this.setState({ mail: response.data.doctor.mail });
                this.setState({ firstname: response.data.user.firstname });
                this.setState({ lastname: response.data.user.lastname });
                this.setState({ password: response.data.user.password });
                this.setState({ address: response.data.user.address });
                this.setState({ isDoc: response.data.user.isDoc });
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
                        'userid': this.state.userid
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

        if (this.state.senders[i] !== this.state.userid) {
            if(this.state.types[i] === "text")
            {
                return (
                    <div key={"main" + i}>
                        <input type="text" placeholder="received message" value={this.state.messages[i]} className="input" name="messages" onChange={this.handleInputChange} />
                        from {this.state.senders[i]}
                    </div>

                );
            }
        }
        else {
            if(this.state.types[i] === "text")
            {
                return (
                    <div key={"main" + i}>
                        <input type="text" placeholder="sent message" value={this.state.messages[i]} className="input" name="messages" onChange={this.handleInputChange} />
                        to {this.state.receivers[i]}
                    </div>

                );
            }
            else if(this.state.types[i] === "audio"){
                console.log("type is...: " + this.state.types[i]);
                return(
                    <div key={"main" + i}>
                            <audio src={this.state.messages[i]} controls="controls" /> to {this.state.receivers[i]}
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
                <div className="title">
                    Profileedit
            </div>


                <div className="bg-right"></div>

                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    <div className="mail">
                        <div className="input_field">
                            <input type="text" placeholder="Eemail" value={this.state.mail} className="input" name="mail" onChange={this.handleInputChange} />
                            <i className="mail"></i>
                        </div>
                    </div>

                    <div className="vorName">
                        <div className="input_field">
                            <input name="firstname" type="text" value={this.state.firstname} placeholder="Vorname" className="input" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>

                    </div>

                    <div className="nachName">
                        <div className="input_field">
                            <input type="text" placeholder="Nachname" value={this.state.lastname} className="input" name="lastname" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>
                    </div>


                    <div className="pass">
                        <div className="input_field">
                            <input name="password" type="password" placeholder="Passwort" className="input" onChange={this.handleInputChange} />
                            <i className="enlock"></i>
                        </div>
                    </div>

                    <div className="anschrift">
                        <div className="input_field">
                            <input type="text" placeholder="Anschrift" value={this.state.address} className="input" name="address" onChange={this.handleInputChange} />
                            <i className="anschrift"></i>
                        </div>
                    </div>


                    <div className="kk">
                        <div className="input_field">
                            <input list="kk" placeholder="Krankenkasse" className="input" value={this.state.healthinsurance} name="healthinsurance" onChange={this.handleInputChange} />
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
                        <div className="input_field">
                            <input type="text" placeholder="Versichertennummer" className="input" value={this.state.insurednumber} name="insurednumber" onChange={this.handleInputChange} />
                            <i className="verNr"></i>
                        </div>
                    </div>
                    {this.checkProfilepic()}

                    <input type="file" name="profilepic" onChange={this.handleInputChange} /> <br />

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