import React from 'react';
import Output from './Output';
import loginpng from '../static/res/images/login.png';
import axios from 'axios';

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
        console.log("pressed :D: " + mail);
        
        //using axios to post, withcredentials also gets the cookie
        axios
        .post('http://localhost:8080/login-sent', login, {withCredentials: true})
        //.post('http://192.168.2.102:5000/login-sent', login, {withCredentials: true})
            .then(() => console.log('Logged in :)'))
            .catch(err => {
                console.error(err);
        });


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    render(){
        return(
            <div id="top-cut">

                <div id="logImg">
                <img className="logImg" src={loginpng} alt="logImg" height="600" />
                </div>

                <div className="title">
                Login
                </div>
                <div className="no-acc">
                <p>No Account? <a href="file:///Users/zulfiyecakmak/Desktop/WebProjekt-test/reg.html">Signup!</a></p>

                </div>

                <div id="middleOne">
                <p className="kurzBeschreibung">Beschreibung was die App bietet</p>
                </div>

                <div id="middleTwo">
                <div className="iconTermin">
                    <i className="far fa-calendar-check"></i>
                    <div className="iconDoc">
                    <i className="fas fa-user-md"></i>
                    </div>
                    <div className="iconNote">
                    <i className="far fa-sticky-note"></i>
                    </div>
                    <div className="iconFolder">
                    <i className="far fa-folder"></i>
                    </div>
                    <div className="iconMessage">
                    <i className="far fa-envelope"></i>
                    </div>
                </div>

                <p className="termin-title">Termine vereinbaren</p>
                <p className="doc-title">Kommunizieren </p>
                <p className="note-title">Ihre Notizen </p>
                <p className="folder-title">Ihre Gesundheitsakte </p>
                <p className="message-title">Austausch von Nachrichten</p>
                </div>

                <div id="middleThree">
                WERBUNG MIT SCREENSHOTS
                </div>
                
                
                <form onSubmit={this.handleSubmit}>
                    <div className="input_field">
                        <input type="text" placeholder="Email" name="mail" className="input"  required onChange={this.handleInputChange}></input>
                        <i className="mail"></i>
                    </div>

                    <div className="input_field">
                        <input type="password" placeholder="Passwort" name="password" className="input" required onChange={this.handleInputChange}></input>
                        <i className="enlock"></i>
                    </div>



                    <div className="btn">
                    <button type="submit" value="Login">Login</button>
                    
                    </div>
                </form>
            </div>
                
        );
    }
}

export default Login;