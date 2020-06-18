import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
var ObjectID = require('mongodb').ObjectID;


class ViewFile extends React.PureComponent{

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
            //one share with for authentication
            shareWith: [],
            //one share with as string to be passed(when editing file infos for example)
            shareWithString: '',
            notes: ''

        };

        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
        
          
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
    };


    handleSubmit = e =>
    {
        e.preventDefault();
        const {pat_userid, filename, originalfilename, filetype, notes, shareWithString} = this.state;
        
        const patfile = {
            pat_userid,
            filename: this.state.filename,
            originalfilename,
            filetype,
            notes,
            shareWithString
        }


        
        //using axios to post
        axios
        .post('http://localhost:8080/edit-sent-patientfile', patfile)
            .then(() => console.log('Patientfile updated :))'))
            .catch(err => {
                console.error(err);
        });
    }



    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {

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
            this.setState({isDoc: response.data.user.isDoc});
            if(response.data.user.isDoc === "1")
            {
                console.log("set docid");
                this.setState({docid: response.data.user.docid});
            }
            else
            {
                console.log("set patid");
                this.setState({patid: response.data.user.patid});
            }
            //this.setState({insurednumber: response.data.patient.insurednumber});
            //this.setState({healthinsurance: response.data.patient.healthinsurance});
        });
        

        const params = new URLSearchParams(this.props.location.search);
        const filename = params.get('filename'); 

        console.log("FILENAME IS: " + filename);

        //checking for extension in url
        /*var n = filename.indexOf('.');
        filename = filename.substring(0, n != -1 ? n : filename.length);*/


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
            if(response.data.patientfile.shareWith === undefined)
                console.log("shared with nobody");
            else
            {
                this.setState({shareWith: response.data.patientfile.shareWith.split(',')});
                this.setState({shareWithString: response.data.patientfile.shareWith});
            }
            if(response.data.patientfile.notes === undefined)
                console.log("no notes");
            else
                this.setState({notes: response.data.patientfile.notes});
            console.log("sharewith is: " + this.state.shareWith);
            var temp = "../uploads/" + response.data.patientfile.filename + "." + response.data.patientfile.filetype;
            this.setState({fileToPlay: temp});
        });

        
        
        

        

    }  

    //check if file has been loaded from the server already
    image() {
        return(
            <div>
                <img src={this.state.fileToPlay}/>
                on itt
                <form onSubmit={this.handleSubmit} encType="multipart/formdata">    
                    <input type="text" placeholder="keywords/comments" value={this.state.notes} onChange={this.handleInputChange} name="notes"></input>
                    <input type="text" placeholder="Doctor IDs" value={this.state.shareWithString} onChange={this.handleInputChange} name="shareWithString"></input>
                    <input type="submit" className="btn btn-primary" value="Submit" />         
                </form>
            </div>
            
        );

    };

    pdf(){
        return(
            <div>
                <embed src={this.state.fileToPlay} width="500" height="375" 
                type="application/pdf"></embed>

                <form onSubmit={this.handleSubmit} encType="multipart/formdata">
                    <input type="text" placeholder="keywords/comments" value={this.state.notes} onChange={this.handleInputChange} name="notes"></input>
                    <input type="text" placeholder="Doctor IDs" value={this.state.shareWithString} onChange={this.handleInputChange} name="shareWithString"></input>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            </div>
        );
    }

    isDoc()
    {
        if(this.state.isDoc === "1")
        {
            return true;

        }
        else
        {
            return false;
        }
    }

    patientContent()
    {
        console.log("your patid is: " + this.state.patid);
        console.log("sharewith is: " + this.state.shareWith);
        console.log("desired patid is: " + this.state.pat_userid);
        if(this.state.userid === this.state.pat_userid)
        {
            console.log("you're authorized")
            if(this.state.filetype === "png" || this.state.filetype === "jpg")
            {
                console.log("its a png");
                return(this.image());
            }
            else if(this.state.filetype === "pdf")
            {
                console.log("its a pdf");
                return(this.pdf());
            }
            else
                return(<div> no image lul</div>) 
        }
        else
        {
            console.log("youre not authorized")
            return(<div>not authorized</div>);
        }
    }

    checkShare()
    {
        for(var i = 0;i < this.state.shareWith.length;i++)
        {
            console.log("shares are: " + this.state.shareWith[i]);

            //replacing comma
            if(this.state.shareWith[i].replace(/\s/g, '') === this.state.userid)
                return true;
        }
        return false;
    }

    docContent()
    {
        console.log("your docid is: " + this.state.docid);
        var authorized = this.checkShare();
        if(authorized)
        {
            console.log("you're authorized")
            if(this.state.filetype === "png" || this.state.filetype === "jpg")
            {
                console.log("its a png");
                return(this.image());
            }
            else if(this.state.filetype === "pdf")
            {
                console.log("its a pdf");
                return(this.pdf());
            }
            else
                return(<div> no image lul</div>) 
        }
        else
        {
            console.log("youre not authorized")
            return(<div>not authorized</div>);
        }
    }

    getContent()
    {
        if(this.isDoc())
        {
            console.log("youre a doctor");
            return this.docContent();
        }
        else
        {
            console.log("youre a patient");
            return this.patientContent();
        }
    }

    render(){
        return this.getContent();
    }
}

export default ViewFile;