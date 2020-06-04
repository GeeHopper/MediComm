import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
var ObjectID = require('mongodb').ObjectID;


class Me extends React.PureComponent{

    profilepicfile = "";
    
    constructor(props){
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
            profilepicfile: '',
            fileToPlay: '',

            pat_userid: '',
            filename: '',
            originalfilename: '',
            filetype: '',

        };

        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        
          
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
    };



    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {
        

        var filename = this.props.match.params.query;

        //checking for extension in url
        var n = filename.indexOf('.');
        filename = filename.substring(0, n != -1 ? n : filename.length);

        console.log("filename is: " + this.filename) 

        console.log("User Id is: " + this.props.match.params.query);
        this.setState({fileToPlay: "/uploads/" + this.props.match.params.query});
        console.log("toplay is: " + this.state.fileToPlay)

        //var filenames = this.props.match.params.query;

        //Checking file ingo
        var url = 'http://localhost:8080/checkFile';
        var options = {
        method: 'POST',
        headers: {
            'token': Cookies.get("token"),
        },
        data: {
            'filename': filename
        }
        };
        axios.post(url, options)
        .then(response => {
            this.setState({pat_userid: response.data.patientfile.pat_userid});
            this.setState({filename: response.data.patientfile.filename});
            //this.setState({filename: "../uploads/dummy.png"});
            this.setState({originalfilename: response.data.patientfile.originalfilename});
            this.setState({filetype: response.data.patientfile.filetype});
            console.log("filename: " + response.data.patientfile.filename + "." + response.data.patientfile.filetype);
            var test = "/uploads/" + response.data.patientfile.filename + "." + response.data.patientfile.filetype;
            this.setState({fileToPlay: test});
        });

        
        
        

        //Fetching user data
        var url = 'http://localhost:8080/me';
        var options = {
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
            if(response.data.user.profilepic)
            {
                this.setState({profilepic: response.data.user.profilepic});
                this.setState({profilepicfile: response.data.user.profilepic});
            }
            this.setState({userid: response.data.user._id});
            //this.setState({patid: response.data.patient._id});
            //this.setState({mail: response.data.patient.mail});
            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
            //this.setState({insurednumber: response.data.patient.insurednumber});
            //this.setState({healthinsurance: response.data.patient.healthinsurance});

            if(this.isDoc())
                console.log("u doc")
            else
                console.log("u no doc");
        });

    }  

    //check if file has been loaded from the server already
    checkFile() {
        return(
            

            <div>test</div>
        )

    };

    isDoc()
    {
        if(this.state.isDoc == "1")
            return true;
        else
            return false;
    }

    patientContent()
    {
        return(this.docContent());
    }

    docContent()
    {
        return(this.checkFile());
    }

    getContent()
    {
        if(this.isDoc())
            return this.docContent();
        else
            return this.patientContent();
    }

    checkLogin(mail)
    {
        
            return mail()

            /*try {
                const decoded = jwt.verify(this.state.token, "randomString");
                //return "it is: " + decoded.user;
                const user = User.findById(req.user.id);
            } catch (e) {
                console.error(e);
            }*/
    }

    render(){
        const { pageNumber, numPages } = this.state;
        if(this.state.fileToPlay != '')
        {
        return (
        <div>
            <img src={this.state.fileToPlay} />
        </div>
        );
        }
        else
        {
            return (
            <div>
                no pdf
            </div>
            );
        }

    }
}

export default Me;