import React from 'react';
import Cookies from 'js-cookie';
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
            pat_mail: [],
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

            
            this.setState({mail: response.data.user.mail})
            
            if(response.data.user.isDoc === "0")
            {
                console.log("youre a patient");
                this.patient = response.data.user;
                url = 'http://localhost:8080/overviewMyFiles';
                options = {
                    method: 'POST',
                    headers: {
                        'token': Cookies.get("token")
                    },
                    data: {
                        'pat_mail': this.state.mail
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
                            
                            this.state.pat_mail.push(response.data.patientfiles[i].pat_mail);
                            this.setState({
                                pat_mail: this.state.pat_mail
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
                            console.log("CONTENT SET");
                            this.state.content.push(this.overviewContent(i));
                            this.setState({
                                content: this.state.content
                            })
                        }
                    });
            }
            else
            {
                console.log("youre a doc");
                url = 'http://localhost:8080/overviewMyFiles';
                console.log("your userid is: " + this.state.userid);
                options = {
                    method: 'POST',
                    headers: {
                        'token': Cookies.get("token")
                    },
                    data: {
                        'doc_mail': this.state.mail
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
                            
                            this.state.pat_mail.push(response.data.patientfiles[i].pat_mail);
                            this.setState({
                                pat_mail: this.state.pat_mail
                            });
        
                            this.state.filename.push(response.data.patientfiles[i].filename);
                            this.setState({
                                filename: this.state.filename
                            });
        
        
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
            }
        });
       


    }

    isDoc() {
        if (this.state.isDoc == "1")
            return true;
        else
            return false;
    }


    overviewContent(i) {
        return (
            <div key={"main" + i}>


                <div className="bg-right"></div>

                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    <div className="mail">
                        <div className="input_field">
                    Teilen mit:        <input type="text" placeholder="sharewith" value={this.state.shareWith[i]} className="input" name="shareWith" onChange={this.handleInputChange} />
                            <i className="mail"></i>
                        </div>
                    </div>

                    <div className="vorName">
                        <div className="input_field">
                    Notizen/Tags:        <input name="firstname" type="text" value={this.state.notes[i]} placeholder="notes" className="notes" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>

                    </div>

                    <div className="nachName">
                        <div className="input_field">
                    Originaler Dateiname:        <input type="text" placeholder="Nachname" value={this.state.original_filename[i]} className="input" name="original_filename" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>
                    </div>

                    <div className="nachName">
                        <div className="input_field">
                            <a href={"viewfile/?filename=" + this.state.filename[i]}>Show file</a>
                            <i className="name"></i>
                        </div>
                    </div>


                    <br />
                    <br />
                </form>
            </div>

        )
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