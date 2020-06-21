import Cookies from 'js-cookie';
import axios from 'axios';

class Tools
{
    static getUserData(comp){

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

    static checkLogin(token)
    {
        if (!token) 
        {
            //redirect if not logged in
            window.location="/login";
            return false;
        }
        else
            return true;
    }
    
    static isDoc(comp) {
        if (comp.state.isDoc === "1")
            return true;
        else
            return false;
    }
}

export default Tools;