import React from 'react';
import loginpng from '../static/res/images/login.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

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
        .post('http://10.0.2.2:8080/login-sent', login, {withCredentials: true})
        //.post('http://192.168.2.102:5000/login-sent', login, {withCredentials: true})
            .then(() =>{
             console.log('Logged in :)');
             //redirect after succesful login
             this.props.history.push("/me");
            })
            .catch(err => {
                console.error(err);
        });

        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    componentDidMount()
    {
        //if already logged in => redirect to /me
        if(localStorage.getItem('token')) {
            //console.log("got token");
            this.props.history.push("/me");
        }
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
                      h3{\
                        color: rgb(170, 125, 243);\
                      }\
                "}
                </style>
                

                        <div className="container-fluid" style={{background: "white"}}>
                            <div className="row">
                                <div className="col-sm-6">
                                <br />
                                <h2>Medibook</h2>
                                    <img className="logImg img-fluid" src={loginpng} alt="logImg" />
                                </div>
                                <div className="col-sm-6 mt-5 text-center">
                                    <div className="title py-4">
                                        <h3 className=" mt-5"style={{fontWeight: 'bold'}}>Login</h3>
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form w-50 mx-auto">
                                            <div className="input_field my-4">
                                                <input type="text" placeholder="Email" name="mail" className="input form-control py-3" onChange={this.handleInputChange}/>
                                                <i className="mail"></i>
                                            </div>
                                            <div className="input_field my-4">
                                                <input type="password" placeholder="Passwort" name="password" className="input form-control py-3" onChange={this.handleInputChange}/>
                                                <i className="enlock"></i>
                                            </div>
                                            <div className="no-acc" style={{fontWeight: 'bold',fontSize: 15}}>
                                                <p>Noch kein Account? <a href="/reg">Signup!</a></p>
                                            </div>
                                                <div className="button">
                                                    <button type="submit" className="btn btn-primary w-50 my-4" style={{fontWeight: 'bold', fontSize: 15}}>Login</button>
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
                            <div className="d-flex justify-content-around my-5 text-center flex-wrap"style={{background: "white"}}>
                                <div className="iconTermin mt-1">
                                    <i className="far fa-calendar-check"></i>
                                    <p className="termin-title  mt-3" style={{fontWeight: 'bold',color: 'rgb(170, 125, 243)',fontSize: 15}}>Termine vereinbaren</p>
                                </div>
                                <div className="iconDoc ">
                                    <i className="fas fa-user-md"></i>
                                    <p className="doc-title mt-3"style={{fontWeight: 'bold',fontSize: 15}}>Arztsuche </p>
                                </div>
                                <div className="iconNote ">
                                    <i className="far fa-sticky-note"></i>
                                    <p className="note-title  mt-3"style={{fontWeight: 'bold',fontSize: 15}}>Ihre Notizen </p>
                                </div>
                                <div class="iconDrug ">
                                     <i class="fas fa-capsules"></i>
                                    <p class="note-title mt-3"style={{fontWeight: 'bold',fontSize: 15}}>Rezept beantragen</p>
                                </div>
                                <div className="iconFolder ">
                                    <i className="far fa-folder"></i>
                                    <p className="folder-title mt-3"style={{fontWeight: 'bold',fontSize: 15}}>Ihre Gesundheitsakte </p>
                                </div>
                                <div className="iconMessage ">
                                    <i className="far fa-envelope"></i>
                                    <p className="message-title mt-3"style={{fontWeight: 'bold',fontSize: 15}}>Austausch von Nachrichten</p>
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

Login.propTypes = {
    /**
     * The small stats dataset.
     */
    smallStats: PropTypes.array
};
  

export default Login;