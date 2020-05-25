import React from 'react';
import Output from './Output';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            count: 0,
            data: [
                {"id":1, "name":"Schmidt"},
                {"id":2, "name":"chmidt"},
                {"id":3, "name":"hmidt"},
                {"id":4, "name":"midt"},
            ]
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event)
    {
        this.setState({sendForm: this.state.name});
        event.preventDefault();
    }

    render(){
        return(
            <div id="top-cut">

                <div id="logImg">
                <img class="logImg" src="images/login.png" alt="logImg" height="600" />
                </div>

                <div class="title">
                Login
                </div>
                <div class="no-acc">
                <p>No Account? <a href="file:///Users/zulfiyecakmak/Desktop/WebProjekt-test/reg.html">Signup!</a></p>

                </div>

                <div id="middleOne">
                <p class="kurzBeschreibung">Beschreibung was die App bietet</p>
                </div>

                <div id="middleTwo">
                <div class="iconTermin">
                    <i class="far fa-calendar-check"></i>
                    <div class="iconDoc">
                    <i class="fas fa-user-md"></i>
                    </div>
                    <div class="iconNote">
                    <i class="far fa-sticky-note"></i>
                    </div>
                    <div class="iconFolder">
                    <i class="far fa-folder"></i>
                    </div>
                    <div class="iconMessage">
                    <i class="far fa-envelope"></i>
                    </div>
                </div>

                <p class="termin-title">Termine vereinbaren</p>
                <p class="doc-title">Kommunizieren </p>
                <p class="note-title">Ihre Notizen </p>
                <p class="folder-title">Ihre Gesundheitsakte </p>
                <p class="message-title">Austausch von Nachrichten</p>
                </div>

                <div id="middleThree">
                WERBUNG MIT SCREENSHOTS
                </div>
                
                
                <form action="login-sent" method="post">
                    <div class="input_field">
                        <input type="text" placeholder="Email" name="mail" class="input"  required></input>
                        <i class="mail"></i>
                    </div>

                    <div class="input_field">
                        <input type="password" placeholder="Passwort" name="password" class="input" required></input>
                        <i class="enlock"></i>
                    </div>



                    <div class="btn">
                    <button type="submit" value="Login">Login</button>
                    
                    </div>
                </form>
            </div>
                
        );
    }
}

export default Login;