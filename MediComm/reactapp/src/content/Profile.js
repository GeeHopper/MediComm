import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";
const Patient = require("../model/patient");
var ObjectID = require('mongodb').ObjectID;



class Profile extends React.Component {

    profilepicfile = "";
    doctor = "";

    constructor(props) {
        super(props);
        this.state = {
            profilepic: '',
            mail: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            mail: '',
            fax: '',
            url: '',
            fieldofwork: '',
            insurednumber: '',
            healthinsurance: '',
            isDoc: '',
            patid: '',
            userid: '',
            docid: '',
            profilepicfile: ''
        };

        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        Tools.checkLogin(Cookies.get("token"));


    }

    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount() {

        const params = new URLSearchParams(this.props.location.search);
        const userid = params.get('userid');

        const url = Tools.host + '/checkUserUrl';
        const options = {
            method: 'POST',
            headers: {
                'token': Cookies.get("token")
            },
            data: {
                'userid': userid
            }
        };
        //("User Id is: " + userid)
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
                if (response.data.user) {
                    if(response.data.user.profilepic)
                    {
                        this.setState({ profilepic: response.data.user.profilepic });
                        this.setState({ profilepicfile: response.data.user.profilepic });
                    }
                
                    this.setState({ userid: response.data.user._id });
                    this.setState({ mail: response.data.user.mail });
                    this.setState({ firstname: response.data.user.firstname });
                    this.setState({ lastname: response.data.user.lastname });
                    this.setState({ password: response.data.user.password });
                    this.setState({ address: response.data.user.address });
                    this.setState({ patid: response.data.user.patid });
                    this.setState({isDoc: response.data.user.isDoc});
                    //console.log("patid: " + this.state.patid);
                }
                if(response.data.patient)
                {
                    this.setState({ insurednumber: response.data.patient.insurednumber });
                    this.setState({ healthinsurance: response.data.patient.healthinsurance });
                }
            });

        this.fetchDoc();
    }

    docContent() {
        return (
            <div className="form w-50 mx-auto my-5">


            <form onSubmit={this.handleSubmit} encType="multipart/formdata">

            {this.checkProfilepic()}


            <div className=" row mx-md-n5 ">

            <div className="input_field px-md-5 " style={{fontWeight: 'bold', fontSize: 20}}>
            <div className="title text-primary">
           Nachname:
           </div>
             {this.state.lastname}

             </div>


             <div className="input_field px-md-5" style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary text-right">
            Vorname:
            </div>
            {this.state.firstname}
            </div>
            </div>

            <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
               <div className="title text-primary ">
            Em-Mail:
            </div>
            {this.state.mail}
            </div>




            <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary">
            Addresse:
              </div>
             {this.state.address}
</div>


            </form>
        </div>

    
            );
        
    }

    checkProfilepic() {
        if (this.state.profilepicfile)
            return (<img src={require("../../public/uploads/" + this.state.profilepicfile)} width="200" height="200"/>);
        else
            return ("no image");
    }

    fetchDoc()
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
                //console.log("youre a doc");
                this.doctor = response.data.user;
                return true;
            }
            else
            {
                //console.log("youre not a doc");
                return false;
            }
        });
    }

    addPatient = e =>
    {
        if(this.doctor.isDoc === "1")
        {
            //console.log("your docid is: " + this.doctor._id);
            //console.log("your patients id is: " + this.state.userid);
            var params = {
                doc_userid: this.doctor._id,
                pat_userid: this.state.userid
            };
            axios
            .post(Tools.host + '/addPatient/', params)
                .then(() => console.log('Patient added :)'))
                .catch(err => {
                    console.error(err);
            });
        }
        else{
            console.log("Bitte als Arzt einloggen.");
        }
    }

    patientContent() {
        if(this.state.isDoc !== '')
        {
            return (      
                <div className="form w-50 mx-auto my-5">

                {this.checkProfilepic()}

                <div className=" row mx-md-n5 ">

                <div className="input_field px-md-5 " style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary">
                Nachname:
                </div>
                {this.state.lastname}

                </div>


                <div className="input_field px-md-5" style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary text-right">
                Vorname:
                </div>

                {this.state.firstname}
                </div>
                </div>


                <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
               <div className="title text-primary ">
               E-Mail:
               </div>
               {this.state.mail}
               </div>




                <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary">
                Anschrift:
                </div>
                {this.state.address}
                </div>



                <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary">
                Krankenkasse:
                </div>
                 {this.state.healthinsurance}
                 </div>

                 <div className="input_field my-3" style={{fontWeight: 'bold', fontSize: 20}}>
                <div className="title text-primary">
                Versichertennummer:
                </div>
                 {this.state.insurednumber}
                 </div>

                 <div className="addFriend ">
                    <input type="submit" className="btn btn-primary"  value="add patient" onClick={this.addPatient}/>
                </div>






        </div>

            );
        }
        else
            return(<div>loading...</div>);
    }

    getContent() {
        if (Tools.isDoc(this))
            return this.docContent();
        else
            return this.patientContent();
    }

    render() {
        return this.getContent();
    }
}

export default Profile;