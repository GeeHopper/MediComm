import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";
const Patient = require("../model/patient");
const queryString = require('query-string');
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
        Tools.checkLogin(Cookies.get("token"));


    }


    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const username = params.get('username'); // bar
        console.log("name is: " + username);

        const url = Tools.host + '/searchQuery';
        const options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'query': username
            }
        };
        console.log("User Id is: " + this.props.match.params.query)
        axios.post(url, options)
            .then(response => {

                if(response.data.users)
                {
                    for (var i = 0; i < response.data.users.length; i++) {
                        //making sure its a doctor
                        if(response.data.users[i].isDoc === "1")
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

                            this.state.content.push(this.patientSearchContent(i));
                            this.setState({
                                content: this.state.content
                            })
                        }
                    }
                }
                else
                {
                    this.state.content.push(<div>No Users found :(</div>);
                    this.setState({
                        content: this.state.content
                    })
                }

            });
        


    }

    patientSearchContent(i) {
        return (
            <div className="form w-50 my-5" key={"main" + i}>



            <form onSubmit={this.handleSubmit} encType="multipart/formdata">

                <div className="vorName">
                    <div className="input_field my-4">
                        <input name="firstname" type="text" value={this.state.firstname[i]} placeholder="Vorname" className="input  form-control py-2" onChange={this.handleInputChange} />
                        <i className="name"></i>
                    </div>

                </div>

                <div className="nachName">
                    <div className="input_field my-4">
                        <input type="text" placeholder="Nachname" value={this.state.lastname[i]} className="input  form-control py-2" name="lastname" onChange={this.handleInputChange} />
                        <i className="name"></i>
                    </div>
                </div>

                <div className="_id">
                    <div className="button text-center my-4">
                        <a type="text" placeholder="URL" href={"http://localhost:3000/profile/?userid="+this.state.userid[i]} className="btn btn-primary" name="lastname" onChange={this.handleInputChange}>Profile</a>
                        <i className="name"></i>
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

export default Search;