import React from 'react';
import Output from './Output';
import loginpng from '../static/res/images/login.png';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            mail: '',
            password: ''
        };
        
       

        this.updateData = this.updateData.bind(this);
    }

    updateData(event) {
        /*var newItem = {"id":5, "name":name}
        this.setState(state => {
            const data = state.data.concat(newItem);
            return data, newItem;
        });*/
        this.setState({name: event.target.value});
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e =>
    {
        e.preventDefault();
        const {mail, password,} = this.state;

        const login = {
            mail,
            password
        };
        
        //using axios to post, withcredentials also gets the cookie
        axios
        .post('http://localhost:8080/login-sent', login, {withCredentials: true})
        //.post('http://192.168.2.102:5000/login-sent', login, {withCredentials: true})
            .then(() =>{
             console.log('Logged in :)');
             //redirect after succesful login
             this.props.history.push("/dashboard");
            })
            .catch(err => {
                console.error(err);
        });

        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    componentDidMount()
    {
        if(localStorage.getItem('token')) {
            console.log("got token");
            this.props.history.push("/dashboard");
        }
        console.log("no tokenss)")
    }

    render(){
        return(
            <div>
                <style>{"\
                    #middleOne{\
                        position: relative;\
                        background-color: #c6cfff;\
                        padding-bottom: 40px;\
                        width: 100%;\
                    }\
                    #middleThree {\
                        position: relative;\
                        background-color: #c6cfff;\
                        padding-bottom: 450px;\
                    }\
                    i{\
                        font-size: 80px;\
                    }\
                    @media screen and (max-width: 767px){\
                        i{\
                            font-size: 40px;\
                            color: #888888;\
                        }\
                        .d-flex div{\
                            width: 50%;\
                        }\
                    }\
                    i{\
                    color: #888888;\
                    }\
                            p{\
                            color: #888888;\
                        }\
                    .btn-primary {\
                        background-color: #c6cfff;\
                        color: #666666;\
                    }\
                    h2{\
                        color: rgb(170, 125, 243);\
                        font-family: 'Lobster', cursive;\
                        text-align: center;\
                      }\
                "}
                </style>
                

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6">
                                <br />
                                <h2>Medibook</h2>
                                    <img className="logImg img-fluid" src={loginpng} alt="logImg" />
                                </div>
                                <div className="col-sm-6 mt-5 text-center">
                                    <div className="title py-4">
                                        <h3 className="text-secondary mt-5">Login</h3>
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form w-50 mx-auto">
                                            <div className="input_field my-4">
                                                <input type="text" placeholder="Email" name="mail" className="input form-control py-4" onChange={this.handleInputChange}/>
                                                <i className="mail"></i>
                                            </div>
                                            <div className="input_field my-4">
                                                <input type="password" placeholder="Passwort" name="password" className="input form-control py-4" onChange={this.handleInputChange}/>
                                                <i className="enlock"></i>
                                            </div>
                                            <div className="no-acc">
                                                <p>Noch kein Account? <a href="/reg">Signup!</a></p>
                                            </div>
                                                <div className="button">
                                                    <button type="submit" className="btn btn-primary w-50 my-4"><Link to="/overview">Login</Link></button>
                                                </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-center px-0">
                                    <div id="middleOne">
                                        <h3 className="kurzBeschreibung text-secondary"> 
                                        <br />
                         Willkommen auf  Medibook- Ihre eigene, digitale und mobile Gesundheitsakte. <br /> 
                        Legen Sie sich Ihr persönliches Profil  an und profitieren Sie von allen Funktionen die Medibook bietet, <br />
                        wie dem Doc Portal für den sicheren Nachrichten- und Dokumentenaustausch mit den Ärzten Ihrer Wahl, Aktendokumentation, Terminbuchungen und dem Beantragen von Rezepten. <br />
                        Registrieren Sie sich!</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around my-5 text-center flex-wrap">
                                <div className="iconTermin">
                                    <i className="far fa-calendar-check"></i>
                                    <p className="termin-title">Termine vereinbaren</p>
                                </div>
                                <div className="iconDoc ">
                                    <i className="fas fa-user-md"></i>
                                    <p className="doc-title">Arztsuche </p>
                                </div>
                                <div className="iconNote ">
                                    <i className="far fa-sticky-note"></i>
                                    <p className="note-title">Ihre Notizen </p>
                                </div>
                                <div className="iconFolder ">
                                    <i className="far fa-folder"></i>
                                    <p className="folder-title">Ihre Gesundheitsakte </p>
                                </div>
                                <div className="iconMessage ">
                                    <i className="far fa-envelope"></i>
                                    <p className="message-title">Austausch von Nachrichten</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 px-0">
                                    <div id="middleThree">
                                        <h3 className="text-secondary text-center">WERBUNG MIT SCREENSHOTS</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
            </div>
        );
        
    }
}

export default Login;