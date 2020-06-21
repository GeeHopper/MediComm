import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
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


    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handlePatNotesChange(i, e) {
        console.log("iii: " + i);

        const newNotes = this.state.patNotes;
        newNotes[i] = e.target.value;
        console.log("changed: " + e.target.value);

        this.setState({
            patNotes: newNotes
        }, () => {
            console.log("notes: " + this.state.patNotes);
        });
        
        var newContent = [];
        console.log("length is: " + this.state.mail.length);
        for(var i = 0; i < this.state.mail.length; i++)
        {
            console.log("i: " + i);
            newContent.push(this.patientOverviewContent(i));
        }

        this.setState({
            content: newContent
        }, () => {
            console.log("content: " + this.state.content);
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
        .post('http://localhost:8080/edit-sent-patnotes', therapy)
            .then(() => console.log('patNotes updated :))'))
            .catch(err => {
                console.error(err);
        });

    }


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    


   
    
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

            
            
            if(response.data.user.isDoc === "1")
            {
                console.log("youre a doctor");
                this.doctor = response.data.user;
                this.setState({doctorid: response.data.user._id});
            }
            else
            {
                console.log("youre a pat");
            }
        });



        console.log("your id is: " + this.doctor._id);
        url = 'http://localhost:8080/overviewMyPats';
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
                console.log(response.data.patients[0].firstname);
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
                    console.log("mail is: " + response.data.patients[i].mail);

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
                    
                }
                console.log("len: " + response.data.patients.length);
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

    patientOverviewContent(i) {
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
                    Krankenkasse: {this.state.healthinsurance[i]}  
                    <br />
                    Versichertennummer: {this.state.insurednumber[i]} 

                    <div className="verNr">
                        <div className="input_field">
                            <input type="text" placeholder="Notizen" className="input" value={this.state.patNotes[i]} name="patNotes" onChange={(event) => this.handlePatNotesChange(i, event)} />
                            <i className="verNr"></i>
                        </div>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Update patNotes" />
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

export default OverviewMyPats;