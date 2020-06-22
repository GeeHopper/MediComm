import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./tools";
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;


class OverviewMyPats extends React.Component {

    profilepicfile = "";
    doctor = "";

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
            patNotes: [],

            //ID of the doctor looking at his pats
            doctorid: ''
        };

        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));


    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handlePatNotesChange(i, e) {

        const newNotes = this.state.patNotes;
        newNotes[i] = e.target.value;
        //console.log("changed: " + e.target.value);

        this.setState({
            patNotes: newNotes
        }, () => {
            //console.log("notes: " + this.state.patNotes);
        });
        
        var newContent = [];
        //console.log("length is: " + this.state.mail.length);
        for(var i = 0; i < this.state.mail.length; i++)
        {
            //console.log("i: " + i);
            newContent.push(this.patientOverviewContent(i));
        }

        this.setState({
            content: newContent
        }, () => {
            //console.log("content: " + this.state.content);
        });
    };



    handleSubmit(i, e) {
        e.preventDefault();
        const patid = this.state.patid[i];
        const doctorid = this.state.doctorid;
        const patNotes = this.state.patNotes[i];
        
        const therapy = {
            patid,
            doctorid,
            patNotes,
        }


        
        //using axios to post
        axios
        .post(Tools.host + '/edit-sent-patnotes', therapy)
            .then(() => console.log('patNotes updated :))'))
            .catch(err => {
                console.error(err);
        });

    }

    
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

            
            
            if(response.data.user.isDoc === "1")
            {
                //console.log("youre a doctor");
                this.doctor = response.data.user;
                this.setState({doctorid: response.data.user._id});
            }
            else
            {
                console.log("Bitte als Arzt einloggen.");
            }
        });



        //console.log("your id is: " + this.doctor._id);
        url = Tools.host + '/overviewMyPats';
        options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'doc_userid': this.doctor._id
            }
        };
        axios.post(url, options)
            .then(response => {
                //console.log(response.data.patients[0].firstname);
                for (var i = 0; i < response.data.patients.length; i++) {
                    if (response.data.patients[i].profilepic != undefined) {
                        this.state.profilepic.push(response.data.patients[i].profilepic);
                        this.setState({
                            profilepic: this.state.profilepic
                        });

                        this.state.profilepicfile.push(response.data.patients[i].profilepicfile);
                        this.setState({
                            profilepicfile: this.state.profilepicfile
                        });
                    }
                    this.state.mail.push(response.data.patients[i].mail);
                    this.setState({
                        mail: this.state.mail
                    });
                    this.state.userid.push(response.data.patients[i]._id);
                    this.setState({
                        mail: this.state.mail
                    });
                    //console.log("mail is: " + response.data.patients[i].mail);

                    this.state.firstname.push(response.data.patients[i].firstname);
                    this.setState({
                        firstname: this.state.firstname
                    });

                    this.state.lastname.push(response.data.patients[i].lastname);
                    this.setState({
                        lastname: this.state.lastname
                    });

                    this.state.address.push(response.data.patients[i].address);
                    this.setState({
                        address: this.state.address
                    });

                    this.state.patid.push(response.data.patients[i]._id);
                    this.setState({
                        patid: this.state.patid
                    });

                    this.state.patNotes.push(response.data.patNotes[i]);
                    this.setState({
                        patNotes: this.state.patNotes
                    });

                    this.state.content.push(this.patientOverviewContent(i));
                    this.setState({
                        content: this.state.content 
                    })

                    
                }
                //console.log("len: " + response.data.patients.length);
            });
    }
    
    patientOverviewContent(i) {
        return (
            <div className="form w-50 mx-auto my-5" key={"main" + i}>

            <form onSubmit={(event) => this.handleSubmit(i, event)} encType="multipart/formdata">

            <div className=" row mx-md-n5 ">

            <div className="input_field px-md-5 " style={{fontWeight: 'bold', fontSize: 20}}>
            <div className="title text-primary">
                Vorname:
                </div>
                 {this.state.firstname[i]}
                 </div>

                 <div className="input_field px-md-5" style={{fontWeight: 'bold', fontSize: 20}}>
                    <div className="title text-primary text-right">
                Nachname:
                </div>
                 {this.state.lastname[i]}
                 </div>


                 </div>

                 <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                   <div className="title text-primary ">
                 E-Mail:
                 </div>
                 {this.state.mail[i]}
                 </div>

                 <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                   <div className="title text-primary ">
                Adresse:
                </div>
                 {this.state.address[i]}
                 </div>

                 <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                   <div className="title text-primary ">
                Krankenkasse:
                </div>
                 {this.state.healthinsurance[i]}
                 </div>


                 <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                   <div className="title text-primary ">
                Versichertennummer:
                </div>
                {this.state.insurednumber[i]}
                </div>

                <div className="verNr">
                    <div className="input_field my-3">
                        <input type="text" placeholder="Notizen" className="input form-control py-2" value={this.state.patNotes[i]} name="patNotes" onChange={(event) => this.handlePatNotesChange(i, event)} />
                        <i className="verNr"></i>
                    </div>
                </div>

                    <input type="submit" className="btn btn-primary" value="Update patNotes" />
                    <br />
                    <hr  style={{backgroundColor: 'black'}}/>
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

    }
}

export default OverviewMyPats;