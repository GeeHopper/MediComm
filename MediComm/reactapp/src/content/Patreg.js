import React from 'react';
import patpng from '../static/res/images/pat.png';
import axios from 'axios';

class Register extends React.Component{
    constructor(){
        super();

        //declaring states for the input values of the form
        this.state = {
            mail: '',
            firstname: '',
            lastname: '',
            password: '',
            address: '',
            agreement: '',
            insurednumber: '',
            healthinsurance: ''
        };
    
        //this.handleSubmit = this.handleSubmit.bind(this);
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

    //assigns the state values to the input values on input change
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
            insurednumber,
            healthinsurance
        };
        console.log("pressed :D: " + mail);
        
        //using axios to post
        axios
        .post('http://localhost:8080/pat-reg-sent', user)
            .then(() => console.log('User registered :))'))
            .catch(err => {
                console.error(err);
        });


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    render(){
        return(
        <div>
            <div className="title">
                Registrieren
            </div>


            <div id="pat-reg">
                <img className="pat-reg" src={patpng} alt="pat-reg" height="500" onChange={this.handleInputChange}/>
            </div>


            <div className="bg-right"></div>

            <form onSubmit={this.handleSubmit}>
                
                <div className="mail">
                    <div className="input_field">
                        <input type="text" placeholder="Eemail" className="input" name="mail" onChange={this.handleInputChange}/>
                        <i className="mail"></i>
                    </div>
                </div>

                <div className="vorName">
                    <div className="input_field">
                        <input name="firstname" type="text" placeholder="Vorname" className="input" onChange={this.handleInputChange}/>
                        <i className="name"></i>
                    </div>

                </div>

                <div className="nachName">
                    <div className="input_field">
                        <input type="text" placeholder="Nachname" className="input" name="lastname" onChange={this.handleInputChange}/>
                        <i className="name"></i>
                    </div>
                </div>

                <div className="pass">
                    <div className="input_field">
                        <input name="password" type="password" placeholder="Passwort" className="input" onChange={this.handleInputChange}/>
                        <i className="enlock"></i>
                    </div>
                </div>

                <div className="anschrift">
                    <div className="input_field">
                        <input type="text" placeholder="Anschrift" className="input" name="address" onChange={this.handleInputChange}/>
                        <i className="anschrift"></i>
                    </div>
                </div>


                <div className="kk">
                    <div className="input_field">
                        <input list="kk" placeholder="Krankenkasse" className="input" name="healthinsurance" onChange={this.handleInputChange}/>
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
                    <input type="text" placeholder="Versichertennummer" className="input" name="insurednumber" onChange={this.handleInputChange}/>
                    <i className="verNr"></i>
                </div>
                </div>

                <div id="agreement">
                    <input type="checkbox" name="agreement" onChange={this.handleInputChange}/>Please accept the <a href="res/DSGVO">License and User Agreement</a>
                </div>
                
                <input type="submit" className="btn btn-primary" value="Submit" />
                
            </form>
        </div>
        );
    }
}

export default Register;