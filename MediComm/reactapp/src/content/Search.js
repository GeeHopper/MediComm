import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;


class Search extends React.Component {

    profilepicfile = "";

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


    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount() {

        const url = 'http://localhost:8080/searchQuery';
        const options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'query': this.props.match.params.query
            }
        };
        console.log("User Id is: " + this.props.match.params.userid)
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
                for(var i = 0; i < response.data.users.length; i++)
                {
                    if (response.data.users[i].profilepic != undefined) {
                        this.state.profilepic.push(response.data.users[i].profilepic);
                        this.setState({
                            profilepic: this.state.profilepic
                        });

                        this.state.profilepicfile.push(response.data.users[i].profilepicfile);
                        this.setState({
                            profilepicfile: this.state.profilepicfile
                        });
                    }
                    this.state.mail.push(response.data.users[i].mail);
                    this.setState({
                        mail: this.state.mail
                    });
                    this.state.userid.push(response.data.users[i]._id);
                    this.setState({
                        _id: this.state.userid
                    });
                    
                    this.state.firstname.push(response.data.users[i].firstname);
                    this.setState({
                        firstname: this.state.firstname
                    });

                    this.state.lastname.push(response.data.users[i].lastname);
                    this.setState({
                        lastname: this.state.lastname
                    });

                    this.state.address.push(response.data.users[i].address);
                    this.setState({
                        address: this.state.address
                    });

                    this.state.patid.push(response.data.users[i].patid);
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
                console.log("len: " + response.data.users.length);
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
        console.log("MAAAIL " + this.state.mail[i])
        return (
            <div>
                <div className="title">
                    Profileedit
            </div>


                <div className="bg-right"></div>

                <form onSubmit={this.handleSubmit} encType="multipart/formdata">

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

                    <div className="_id">
                        <div className="input_field">
                            <a type="text" placeholder="URL" href={"http://localhost:3000/profile/"+this.state.userid[i]} className="input" name="lastname" onChange={this.handleInputChange}>Profile</a>
                            <i className="name"></i>
                        </div>
                    </div>


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

        return(
        <div className="container flex center">
                {this.state.content}
        </div>
        );
        
        //return 'lol';
    }
}

export default Search;