import Cookies from 'js-cookie';
import axios from 'axios';
const jwt = require("jsonwebtoken");

class Tools
{
    static host = "http://localhost:8080";
    //static host = "http://10.0.2.2:8080";
    //static host = "htt://localhost:5000";

    //getting userdata from the backend and initializing states with is
    static getUserData(comp){

        const url = Tools.host + '/me';
        const options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };
        axios.get(url, options)
        .then(response => {
            //console.log(response.json({message: "request received!", response}));
            //comp.state.mail = response.json({message: "request received!", response}).parse();
            //console.log (response.json());
            //comp.state.mail = response.data.firstname;
            //console.log(response.data);
            //comp.setUsername(response.data.firstname)
            //comp.setState(resp);
            //console.log(response.data);
            if(response.data.user.profilepic)
            {
                comp.setState({profilepic: response.data.user.profilepic});
                comp.setState({profilepicfile: response.data.user.profilepic});
            }
            comp.setState({userid: response.data.user._id});
            comp.setState({mail: response.data.user.mail});
            comp.setState({firstname: response.data.user.firstname});
            comp.setState({lastname: response.data.user.lastname});
            comp.setState({password: response.data.user.password});
            comp.setState({address: response.data.user.address});
            comp.setState({isDoc: response.data.user.isDoc});
            if(response.data.user.isDoc === "0")
            {
                comp.setState({patid: response.data.patient._id});
                comp.setState({insurednumber: response.data.patient.insurednumber});
                comp.setState({healthinsurance: response.data.patient.healthinsurance});
            }
            else
            {
                comp.setState({docid: response.data.doctor._id});
                comp.setState({fax: response.data.doctor.fax});
                comp.setState({phone: response.data.doctor.phone});
                comp.setState({fieldofwork: response.data.doctor.fieldofwork});
                comp.setState({establishmentnumber: response.data.doctor.establishmentnumber});
            }
            
        });
        
    }

    //check wether a user is logged in, otherwise redirect him to the login page
    static checkLogin(token)
    {
        if (!token) 
        {
            //redirect if not logged in
            window.location="/login";
            return false;
        }
        else
        {   
            try{
                const decoded = jwt.verify(token, "randomString");
                console.log("token is valid");
                return true;
            }
            catch
            {
                console.log("Bitte einloggen");
                window.location="/login";
                return false;
            }
        }
    }
    
    //check wether a user is a doctor
    static isDoc(comp) {
        if (comp.state.isDoc === "1")
            return true;
        else
            return false;
    }
}

export default Tools;