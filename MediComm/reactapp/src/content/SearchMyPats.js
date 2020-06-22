import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;


class SearchMyPats extends React.Component {

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
            content: []
        };

        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));


    }

    checkDoctor()
    {
        const url = Tools.host + '/me';
        const options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };
        axios.get(url, options)
        .then(response => {
            
            if(response.data.user.isDoc === "1")
            {
                //console.log("youre a doctor");
                this.doctor = response.data.user;
                return true;
            }
            else
            {
                //console.log("youre a patient");
                return false;
            }
        });
    }

    
    async componentDidMount() {

        const params = new URLSearchParams(this.props.location.search);
        const patlastname = params.get('patlastname'); 

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
                console.log("youre a dcotor");
                this.doctor = response.data.user;
            }
            else
            {
                console.log("youre a patient");
            }
        });


        
        //console.log("your id is: " + this.doctor._id);
        url = Tools.host + '/searchMyPats';
        options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'doc_userid': this.doctor._id,
                'pat_lastname': patlastname
            }
        };
        
        axios.post(url, options)
            .then(response => {
                if(response.data.patients.length > 0)
                {
                    for (var i = 0; i < response.data.patients.length; i++) {
                        try
                        {
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
                        }
                        catch
                        {
                            this.state.profilepic = "doc_pic.png"
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

                        this.state.patid.push(response.data.patients[i].patid);
                        this.setState({
                            patid: this.state.patid
                        });

                        this.state.content.push(this.patientSearchContent(i));
                        this.setState({
                            content: this.state.content
                        })
                    }
                }
                else
                {
                    this.state.content.push( <div className="error__content p-5">
                    <h2>500</h2>
                    <h3>Something went wrong!</h3>
                    <p>There was a problem on our end. Please try again later.</p>
                    <a href="/searchoverview"> Go back</a>
                  </div>);
                        this.setState({
                            content: this.state.content
                        })
                        //console.log("len: " + response.data.patients.length);
                }
                
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
            <div className="form w-50  my-5" key={"main" + i}>




            <div className="title">
                    Profilansicht des Patienten
                </div>


                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                    <div className="mail">
                        <div className="input_field my-4">
                            <input type="text" placeholder="Email" value={this.state.mail[i]} className="input form-control py-2" name="mail" onChange={this.handleInputChange} />
                            <i className="mail"></i>
                        </div>
                    </div>

                    <div className="vorName">
                        <div className="input_field my-4">
                            <input name="firstname" type="text" value={this.state.firstname[i]} placeholder="Vorname" className="input form-control py-2" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>

                    </div>

                    <div className="nachName">
                        <div className="input_field my-4">
                            <input type="text" placeholder="Nachname" value={this.state.lastname[i]} className="input form-control py-2" name="lastname" onChange={this.handleInputChange} />
                            <i className="name"></i>
                        </div>
                    </div>



                    <div className="anschrift">
                        <div className="input_field my-4">
                            <input type="text" placeholder="Anschrift" value={this.state.address[i]} className="input form-control py-2" name="address" onChange={this.handleInputChange} />
                            <i className="anschrift"></i>
                        </div>
                    </div>


                    
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

export default SearchMyPats;