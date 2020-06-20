import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { element } from 'prop-types';
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;



class Profile extends React.Component {

    profilepicfile = "";
    doctor = "";

    constructor(props) {
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
            profilepicfile: ''
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



        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }


    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount() {

        const params = new URLSearchParams(this.props.location.search);
        const userid = params.get('userid');

        const url = 'http://localhost:8080/checkUserUrl';
        const options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'userid': userid
            }
        };
        console.log("User Id is: " + userid)
        axios.post(url, options)
            .then(response => {
                //console.log(response.json({message: "request received!", response}));
                //this.state.mail = response.json({message: "request received!", response}).parse();
                //console.log (response.json());
                //this.state.mail = response.data.firstname;
                //console.log(response.data);
                //this.setUsername(response.data.firstname)
                //this.setState(resp);
                //console.log(response.data);
                if (response.data.user) {
                    if(response.data.user.profilepic)
                    {
                        this.setState({ profilepic: response.data.user.profilepic });
                        this.setState({ profilepicfile: response.data.user.profilepic });
                    }
                }
                this.setState({ userid: response.data.user._id });
                this.setState({ mail: response.data.user.mail });
                this.setState({ firstname: response.data.user.firstname });
                this.setState({ lastname: response.data.user.lastname });
                this.setState({ password: response.data.user.password });
                this.setState({ address: response.data.user.address });
                this.setState({ patid: response.data.user.patid });
                this.setState({isDoc: response.data.user.isDoc});
                console.log("patid: " + this.state.patid);
                if(response.data.patient)
                {
                    this.setState({ insurednumber: response.data.patient.insurednumber });
                    this.setState({ healthinsurance: response.data.patient.healthinsurance });
                }
            });

        this.fetchDoc();


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

    isDoc() {
        if (this.state.isDoc == "1")
            return true;
        else
            return false;
    }

    docContent() {
        return (
                <div>

                    <div className="bg-right"></div>
    
                    <form onSubmit={this.handleSubmit} encType="multipart/formdata">
    
                    {this.checkProfilepic()}

                    <br />

                    Email: {this.state.mail}

                    <br />
    
                    Firstname: {this.state.firstname}

                    <br />

                    Lastname: {this.state.lastname} 

                    <br />
    
                    Address: {this.state.address} 

                    <br />
                    
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

    fetchDoc()
    {
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

            
            
            if(response.data.user.isDoc === "1")
            {
                console.log("youre a doc");
                this.doctor = response.data.user;
                return true;
            }
            else
            {
                console.log("youre not a doc");
                return false;
            }
        });
    }

    addPatient = e =>
    {
        if(this.doctor.isDoc === "1")
        {
            console.log("yews doc");
            console.log("your id is: " + this.doctor._id);
            console.log("your patients id is: " + this.state.userid);
            var params = {
                doc_userid: this.doctor._id,
                pat_userid: this.state.userid
            };
            axios
            .post('http://localhost:8080/addPatient/', params)
                .then(() => console.log('Patient added :)'))
                .catch(err => {
                    console.error(err);
            });
        }
        else{
            console.log("no doc");
        }

        //using axios to post
        

    }

    patientContent() {
        if(this.state.isDoc !== '')
        {
            return (      
                    <div>

                        {this.checkProfilepic()}

                        <br />
                    
                        Mail: {this.state.mail} 

                        <br />

                        Firstname: {this.state.firstname}

                        <br />

                        Lastname: {this.state.lastname} 

                        <br />

                        Anschrift: {this.state.address} 

                        <br />
                        
                        Krankenkasse: {this.state.healthinsurance} 

                        <br />

                        Versichertennummer: {this.state.insurednumber} 

                        <br />

                        <div className="addFriend">
                            <button onClick={this.addPatient}>Add Patient</button>
                        </div>

                       

                        
                </div>

            );
        }
        else
            return(<div>loading...</div>);
    }

    getContent() {
        if (this.isDoc())
            return this.docContent();
        else
            return this.patientContent();
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

export default Profile;