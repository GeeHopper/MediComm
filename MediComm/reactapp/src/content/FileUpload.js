import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tools from "./Tools";
var ObjectID = require('mongodb').ObjectID;

//makeid to save profile pics and associate them with the users
function makeprofilepicid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + ".png";
 }

class OverviewTherapies extends React.Component{

    profilepicfile = "";

    constructor(){
        super();
        this.state = {
            //basic userdata
            profilepic: '',
            mail: '',
            firstname: '',
            lastname: '',
            address: '',
            isDoc: '',
            patid: '',
            userid: '',
            docid: '',
            profilepicfile: '',

            //doc related
            phone: '',
            fax: '',
            fieldofwork: '',
            establishmentnumber: '',

            //patient related
            insurednumber: '',
            healthinsurance: '',
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
    componentWillMount () {
        Tools.getUserData(this);
    }  

    docContent()
    {
        if(this.state.isDoc != '')
        {
            //console.log("doc is: " + this.state.isDoc)
            window.location.href = "/fileuploaddoc"
        }
        else
        {
           // console.log("loadin in doc");
            return(<div>loading..</div>);
        }
        //window.location.href = "/overviewmypats";
        //return(window.location.href = "http://stackoverflow.com";);
    }


    patientContent()
    {
        if(this.state.isDoc != '')
        {
            //console.log("doc is: " + this.state.isDoc)
            window.location.href = "/fileuploadpat"
        }
        else
        {
            //console.log("loadin in pat");
            return(<div>loading..</div>);
        }
        //window.location.href = "/overviewmydocs";
    }

    getContent()
    {
        if(Tools.isDoc(this))
            return this.docContent();
        else
            return this.patientContent();
    }


    render(){

        return this.getContent();
    }
}

export default OverviewTherapies;