import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;


class OverviewMyFiles extends React.Component {

    profilepicfile = "";
    patient = "";

    constructor(props) {
        super(props);
        this.state = {
            //user related states
            profilepic: [],
            mail: [],
            firstname: [],
            lastname: [],
            address: [],
            phone: [],
            mail: [],
            fax: [],
            urls: [],
            fieldofwork: [],
            insurednumber: [],
            healthinsurance: [],
            isDoc: [],
            patid: [],
            userid: [],
            docid: [],
            profilepicfile: [],
            content: [],

            //file related states
            pat_userid: [],
            filename: [],
            original_filename: [],
            filetype: [],
            notes: [],
            shareWith: []
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
    async componentDidMount() {
        var url = 'http://localhost:8080/me';
        var options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };
        await axios.get(url, options)
        .then(response => {
            //console.log(response.json({message: "request received!", response}));
            //this.state.mail = response.json({message: "request received!", response}).parse();
            //console.log (response.json());
            //this.state.mail = response.data.firstname;
            //console.log(response.data);
            //this.setUsername(response.data.firstname)
            //this.setState(resp);
            //console.log(response.data);

            
            
            if(response.data.user.isDoc === "0")
            {
                console.log("youre a patient");
                this.patient = response.data.user;
            }
            else
            {
                console.log("youre a doc");
            }
        });



        console.log("your id is: " + this.patient.patid);
        url = 'http://localhost:8080/overviewMyFiles';
        options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'pat_userid': this.patient.patid
            }
        };
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
                //console.log("original filename: " + response.data.patientfiles[0].original_filename);
                for (var i = 0; i < response.data.patientfiles.length; i++) {
                    
                    this.state.pat_userid.push(response.data.patientfiles[i].pat_userid);
                    this.setState({
                        pat_userid: this.state.pat_userid
                    });

                    this.state.filename.push(response.data.patientfiles[i].filename);
                    this.setState({
                        filename: this.state.filename
                    });

                    console.log("filename is: " + response.data.patientfiles[i].filename);

                    this.state.original_filename.push(response.data.patientfiles[i].original_filename);
                    this.setState({
                        original_filename: this.state.original_filename
                    });

                    this.state.filetype.push(response.data.patientfiles[i].filetype);
                    this.setState({
                        filetype: this.state.filetype
                    });

                    this.state.notes.push(response.data.patientfiles[i].notes);
                    this.setState({
                        notes: this.state.notes
                    });

                    this.state.shareWith.push(response.data.patientfiles[i].shareWith);
                    this.setState({
                        shareWith: this.state.shareWith
                    });

                    /*this.state.insurednumber.push(response.data.patients[i].insurednumber);
                    this.setState({
                        insurednumber: this.state.insurednumber
                    });

                    this.state.healthinsurance.push(response.data.patients[i].healthinsurance);
                    this.setState({
                        healthinsurance: this.state.healthinsurance
                    });*/

                    /*if(this.state.lastname ==== "krickler")*/
                    //if(this.state.mail === this.props.match.params.query)
                    this.state.content.push(this.overviewContent(i));
                    this.setState({
                        content: this.state.content
                    })
                }
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

    isDoc() {
        if (this.state.isDoc == "1")
            return true;
        else
            return false;
    }

    docContent() {
        return ("");
    }

    checkProfilepic(i) {
        if (typeof this.state.profilepicfile[i] === "undefined")
            return ("no image");
        else
            return (<img src={require("../uploads/" + this.state.profilepicfile[i])} />);

    }

    overviewContent(i) {
        return (
            <div key={"main" + i}>

                <div className="title">
                    Fileedit
                </div>


                <div className="bg-right"></div>

                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    <div className="mail">
                        <div className="input_field">
                            <input type="text" placeholder="sharewith" value={this.state.shareWith[i]} className="input" name="shareWith" onChange={this.handleInputChange} />
                            <i className="mail"></i>
                        </div>
                    </div>

                    <div className="vorName">
                        <div className="input_field">
                            <input name="firstname" type="text" value={this.state.notes[i]} placeholder="notes" className="notes" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>

                    </div>

                    <div className="nachName">
                        <div className="input_field">
                            <input type="text" placeholder="Nachname" value={this.state.original_filename[i]} className="input" name="original_filename" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>
                    </div>

                    <div className="nachName">
                        <div className="input_field">
                            <a href={"viewFile/" + this.state.filename[i]}>Show file</a>
                            <i className="name"></i>
                        </div>
                    </div>


                    <br />
                    <br />
                </form>
            </div>

        )
    }

    getContent() {
        //string contents = 
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

        return (
            <div className="container flex center">
                {this.state.content}
            </div>
        );

        //return 'lol';
    }
}

export default OverviewMyFiles;