import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class Me extends React.Component{

    username = "test";

    constructor(){
        super();
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
            insurednumber: '',
            isDoc: ''
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
        const {mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance} = this.state;

        const user = {
            mail,
            firstname,
            lastname,
            password,
            address,
            agreement,
        }
        const patient = {
            insurednumber,
            healthinsurance
        };
        console.log("mail: " + mail);
        
        //using axios to post
        /*axios
        .post('http://localhost:8080/pat-reg-sent', user)
            .then(() => console.log('User registered :))'))
            .catch(err => {
                console.error(err);
        });*/


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    setUsername(username)
    {
        this.username = username;
        console.log("username: " + username);
    }

    //using axios in here to get access to the response of our backend in our frontend
    componentDidMount () {
        const url = 'http://localhost:8080/me';
        const options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };
        console.log("MOUNTED");
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
            this.setState({mail: response.data.patient.mail});
            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
            this.setState({agreement: response.data.user.agreement});
            this.setState({insurednumber: response.data.patient.insurednumber});
            this.setState({healthinsurance: response.data.patient.healthinsurance});
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

    isDoc()
    {
        if(this.state.isDoc == "1")
            return true;
        else
            return false;
    }

    docContent()
    {
        return("");
    }

    patientContent()
    {
        return(
        <div>
            <div className="title">
                Profileedit
            </div>


            <div className="bg-right"></div>

            <form onSubmit={this.handleSubmit}>
                
                <div className="mail">
                    <div className="input_field">
                        <input type="text" placeholder="Eemail" value={this.state.mail} className="input" name="mail" onChange={this.handleInputChange}/>
                        <i className="mail"></i>
                    </div>
                </div>

                <div className="vorName">
                    <div className="input_field">
                        <input name="firstname" type="text" value={this.state.firstname} placeholder="Vorname" className="input" onChange={this.handleInputChange}/>
                        <i className="name"></i>
                    </div>

                </div>

                <div className="nachName">
                    <div className="input_field">
                        <input type="text" placeholder="Nachname" value={this.state.lastname} className="input" name="lastname" onChange={this.handleInputChange}/>
                        <i className="name"></i>
                    </div>
                </div>

                <div className="pass">
                    <div className="input_field">
                        <input name="password" type="password"  placeholder="Passwort" className="input" onChange={this.handleInputChange}/>
                        <i className="enlock"></i>
                    </div>
                </div>

                <div className="anschrift">
                    <div className="input_field">
                        <input type="text" placeholder="Anschrift" value={this.state.address} className="input" name="address" onChange={this.handleInputChange}/>
                        <i className="anschrift"></i>
                    </div>
                </div>


                <div className="kk">
                    <div className="input_field">
                        <input list="kk" placeholder="Krankenkasse" className="input" value={this.state.healthinsurance} name="healthinsurance" onChange={this.handleInputChange}/>
                        <datalist id="kk">
                            <option value="AOK" />
                            <option value="Knappschaft" />
                            <option value="Innungskrankenkasse" />
                            <option value="DAK Gesundheit" />
                            <option value=" BARMER" />
                        </datalist>
                    </div>
                </div>

                <div className="verNr">
                <div className="input_field">
                    <input type="text" placeholder="Versichertennummer" className="input" value={this.state.insurednumber} name="insurednumber" onChange={this.handleInputChange}/>
                    <i className="verNr"></i>
                </div>
                </div>

                <div id="agreement">
                    <input type="checkbox" name="agreement" onChange={this.handleInputChange}/>Please accept the <a href="res/DSGVO">License and User Agreement</a>
                </div>
                
                <input type="submit" className="btn btn-primary" value="Submit" />
                
            </form>
        </div>

        )
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

        return this.getContent();
    }
}

export default Me;