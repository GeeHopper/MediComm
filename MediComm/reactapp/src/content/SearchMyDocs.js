import React from 'react';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;


class SearchMyDocs extends React.Component {

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
            content: []
        };

        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");


    }


    fetchPatient()
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
            
            if(response.data.user.isDoc === "0")
            {
                console.log("youre a patient");
                this.patient = response.data.user;
                return true;
            }
            else
            {
                console.log("youre a doc");
                return false;
            }
        });
    }

    
    //using axios in here to get access to the response of our backend in our frontend
    async componentDidMount() {

        const params = new URLSearchParams(this.props.location.search);
        const doclastname = params.get('doclastname'); // bar

        var url = 'http://localhost:8080/me';
        var options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };
        await axios.get(url, options)
        .then(response => {
            
            if(response.data.user.isDoc === "0")
            {
                //console.log("youre a patient");
                this.patient = response.data.user;
            }
            else
            {
                //console.log("youre a doc");
            }
        });


        
        //console.log("your id is: " + this.patient._id);
        url = 'http://localhost:8080/searchMyDocs';
        options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'pat_userid': this.patient._id,
                'doc_lastname': doclastname
            }
        };
        
        axios.post(url, options)
            .then(response => {
                for (var i = 0; i < response.data.doctors.length; i++) {
                    try
                    {
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
                    }
                    catch
                    {
                        this.state.profilepic = "doc_pic.png"
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

                    this.state.patid.push(response.data.doctors[i].patid);
                    this.setState({
                        patid: this.state.patid
                    });

                    this.state.content.push(this.patientSearchContent(i));
                    this.setState({
                        content: this.state.content
                    })
                }
                //console.log("len: " + response.data.doctors.length);
            });
    }

    checkProfilepic(i) {
        if (typeof this.state.profilepicfile[i] === "undefined")
            return ("no image");
        else
            return (<img src={require("../uploads/" + this.state.profilepicfile[i])} />);

    }

    patientSearchContent(i) {
        return (
            <div key={"main" + i}>

                <div className="title">
                    Profileedit
                </div>


                <div className="bg-right"></div>

                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    <div className="mail">
                        <div className="input_field">
                            <input type="text" placeholder="Email" value={this.state.mail[i]} className="input" name="mail" onChange={this.handleInputChange} />
                            <i className="mail"></i>
                        </div>
                    </div>

                    <div className="vorName">
                        <div className="input_field">
                            <input name="firstname" type="text" value={this.state.firstname[i]} placeholder="Vorname" className="input" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>

                    </div>

                    <div className="nachName">
                        <div className="input_field">
                            <input type="text" placeholder="Nachname" value={this.state.lastname[i]} className="input" name="lastname" onChange={this.handleInputChange} />
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
                            <input type="text" placeholder="Anschrift" value={this.state.address[i]} className="input" name="address" onChange={this.handleInputChange} />
                            <i className="anschrift"></i>
                        </div>
                    </div>


                    <div className="kk">
                        <div className="input_field">
                            <input list="kk" placeholder="Krankenkasse" className="input" value={this.state.healthinsurance[i]} name="healthinsurance" onChange={this.handleInputChange} />

                        </div>
                    </div>

                    <div className="verNr">
                        <div className="input_field">
                            <input type="text" placeholder="Versichertennummer" className="input" value={this.state.insurednumber[i]} name="insurednumber" onChange={this.handleInputChange} />
                            <i className="verNr"></i>
                        </div>
                    </div>

                    <br /><a href={"profile/?userid=" + this.state.userid}>Profile besuchen</a>
                    {/*this.checkProfilepic(i)*/}


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

export default SearchMyDocs;