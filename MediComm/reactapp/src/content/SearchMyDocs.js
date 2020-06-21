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


        
        console.log("your id is: " + this.patient._id);
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
                //console.log(response.json({message: "request received!", response}));
                //this.state.mail = response.json({message: "request received!", response}).parse();
                //console.log (response.json());
                //this.state.mail = response.data.firstname;
                //console.log(response.data);
                //this.setUsername(response.data.firstname)
                //this.setState(resp);
                //console.log(response.data);
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
                    console.log("mail is: " + response.data.doctors[i].mail);

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
                    this.state.content.push(this.patientSearchContent(i));
                    this.setState({
                        content: this.state.content
                    })
                }
                console.log("len: " + response.data.doctors.length);
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

export default SearchMyDocs;