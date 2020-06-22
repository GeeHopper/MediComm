import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;


class OverviewMyDocs extends React.Component {

    profilepicfile = "";
    patient = "";

    constructor(props) {
        super(props);
        this.state = {
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
            docNotes: [],

            patientid:''
        };

        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));

    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    //handleSubmit = e => {
    handleSubmit(i, e) {
        e.preventDefault();
        const docid = this.state.docid[i];
        const patientid = this.state.patientid;
        const docNotes = this.state.docNotes[i];
        
        const therapy = {
            docid,
            patientid,
            docNotes,
        }

        //console.log("doc notes are: " + therapy.docNotes);

        
        //using axios to post
        axios
        .post(Tools.host + '/edit-sent-docnotes', therapy)
            .then(() => console.log('docNotes updated. )'))
            .catch(err => {
                console.error(err);
        });

    }

    handleDocNotesChange(i, e) {

        const newNotes = this.state.docNotes;
        newNotes[i] = e.target.value;
        //console.log("changed: " + e.target.value);

        this.setState({
            docNotes: newNotes
        }, () => {
            //console.log("notes: " + this.state.docNotes);
        });
        
        var newContent = [];
        //  console.log("length is: " + this.state.mail.length);
        for(var i = 0; i < this.state.mail.length; i++)
        {
            //console.log("i: " + i);
            newContent.push(this.doctorOverviewContent(i));
        }

        this.setState({
            content: newContent
        }, () => {
            //console.log("content: " + this.state.content);
        });
    };



    
    //using axios in here to get access to the response of our backend in our frontend
    async componentDidMount() {
        var url = Tools.host + '/me';
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
                //console.log("youre a patient");
                this.patient = response.data.user;
                this.state.patientid = response.data.user._id;
            }
            else
            {
                //console.log("youre a doc");
            }
        });



        //console.log("your id is: " + this.patient._id);
        url = Tools.host + '/overviewMyDocs';
        options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'pat_userid': this.patient._id
            }
        };
        axios.post(url, options)
            .then(response => {
                //console.log(response.data.doctors[0].firstname);
                for (var i = 0; i < response.data.doctors.length; i++) {
                    if (response.data.doctors[i].profilepic != undefined) {
                        this.state.profilepic.push(response.data.doctors[i].profilepic);
                        this.setState({
                            profilepic: this.state.profilepic
                        });

                        this.state.profilepicfile.push(response.data.doctors[i].profilepicfile);
                        this.setState({
                            profilepicfile: this.state.profilepicfile
                        });
                    }
                    this.state.mail.push(response.data.doctors[i].mail);
                    this.setState({
                        mail: this.state.mail
                    });
                    this.state.userid.push(response.data.doctors[i]._id);
                    this.setState({
                        mail: this.state.mail
                    });
                    //console.log("mail is: " + response.data.doctors[i].mail);

                    this.state.firstname.push(response.data.doctors[i].firstname);
                    this.setState({
                        firstname: this.state.firstname
                    });

                    this.state.lastname.push(response.data.doctors[i].lastname);
                    this.setState({
                        lastname: this.state.lastname
                    });

                    this.state.address.push(response.data.doctors[i].address);
                    this.setState({
                        address: this.state.address
                    });

                    this.state.docid.push(response.data.doctors[i]._id);
                    this.setState({
                        docid: this.state.docid
                    });

                    this.state.docNotes.push(response.data.docNotes[i]);
                    this.setState({
                        docNotes: this.state.docNotes
                    });
                    
                    this.state.content.push(this.doctorOverviewContent(i));
                    this.setState({
                        content: this.state.content
                    })
                }
                //console.log("len: " + response.data.doctors.length);
            });
    }



    doctorOverviewContent(i) {
        return (
            <div key={"main" + i}>
                <form onSubmit={(event) => this.handleSubmit(i, event)} encType="multipart/formdata">

                    
                    Mail: {this.state.mail[i]}      
                    <br />
                    Vorname: {this.state.firstname[i]}      
                    <br />
                    Nachname: {this.state.lastname[i]}      
                    <br />
                    Adresse: {this.state.address[i]}      
                    <br />

                    <input type="text" placeholder="Notizen" className="input" value={this.state.docNotes[i]} name="docNotes" onChange={(event) => this.handleDocNotesChange(i, event)} />
                            <i className="verNr"></i>
                    <br />

                    <input type="submit" className="btn btn-primary" value="Update docNotes" />

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

export default OverviewMyDocs;