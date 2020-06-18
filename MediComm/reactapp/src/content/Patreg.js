import React from 'react';
import patpng from '../static/res/images/pat.png';
import axios from 'axios';
import fs from 'fs';



class Patreg extends React.Component{
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
    <div class="container-fluid" style={{background: "white"}}>
        <div class="row" style={{background: '#e1f2fb'}}>
            <div class="col-md-7" style={{background: '#ffffff'}}>
                <div id="pat-reg">
                    <img class="pat-reg img-fluid" src={patpng} alt="pat-reg"></img>
                </div>
            </div>


            <div class="col-md-4 py-5 ml-md-5" style={{minHeigth: 100}}>
                <div class="title text-center mt-4">
                    <h2 class="text-secondary mb-5">Registrieren</h2>
                </div>
               

                <form onSubmit={this.handleSubmit} >

                    <div class="row" >
                        <div class="vorName col">
                            <div class="input_field">
                                <input type="text" placeholder="Vorname" class="input form-control" name="firstname" onChange={this.handleInputChange}/>
                                <i class="name"></i>
                            </div>

                        </div>

                        <div class="nachName col">
                            <div class="input_field">
                                <input type="text" placeholder="Nachname" class="input form-control" name="lastname" onChange={this.handleInputChange}/>
                                <i class="name"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mail">
                        <div class="input_field">
                            <input type="text" placeholder="Email" class="input form-control my-3" name="mail" onChange={this.handleInputChange}/>
                            <i class="mail"></i>
                        </div>
                    </div>

                    <div class="pass">
                        <div class="input_field">
                            <input type="password" placeholder="Passwort" class="input form-control my-3" name="password" onChange={this.handleInputChange}/>
                            <i class="enlock"></i>
                        </div>
                    </div>



                    <div class="anschrift">
                        <div class="input_field">
                            <input type="text" placeholder="Anschrift" class="input form-control my-3" name="address" onChange={this.handleInputChange}/>
                            <i class="anschrift"></i>
                        </div>
                    </div>

                    <div class="telefon">
                        <div class="input_field">
                            <input type="text" placeholder="Telefon" class="input form-control my-3"onChange={this.handleInputChange}/>
                            <i class="telefon"></i>
                        </div>
                    </div>

                    <div class="fax">
                        <div class="input_field">
                            <input type="text" placeholder="Fax" class="input form-control my-3"onChange={this.handleInputChange}/>
                            <i class="fax"></i>
                        </div>
                    </div>

                    <div class="kk">
                        <div class="input_field">
                            <input list="kk" placeholder="Krankenkasse" class="input form-control my-3"onChange={this.handleInputChange}/>
                            <datalist id="kk">
                                <option value="AOK"></option>
                                <option value="Knappschaft"></option>
                                <option value="Innungskrankenkasse "></option>
                                <option value="DAK Gesundheit"></option>
                                <option value=" BARMER"></option>
                            </datalist>
                        </div>
                    </div>

                    <div class="verNr">
                        <div class="input_field">
                            <input type="text" placeholder="Versichertennummer " class="input form-control my-3"onChange={this.handleInputChange}/>
                            <i class="verNr"></i>
                        </div>
                    </div>

                    <div class="form">
                        <div class="button text-center">
                            <a href="button" class="btn btn-primary badge-pill w-50 mt-4"style={{fontWeight: 'bold', fontSize: 15}}>Registrieren</a>
                        </div>
                    </div>

                    <div id="agreement">
                    <div class="button text-center mt-3 " style={{fontWeight: 'bold', fontSize: 12}}>
                    <input type="checkbox" name="agreement" onChange={this.handleInputChange}/> Please accept the <a href="/dsgvo">License and User Agreement</a>
                    </div>
                </div>

                <div class="button text-center" >
                <input type="submit" className="btn btn-primary badge-pill w-40 mt-4 " value="Submit" style={{fontWeight: 'bold', fontSize: 12}}></input>
                </div>
                <div className="row"style={{backgroundColor: '#e1f2fb'}}>
                            <p> <br></br> </p> </div>
                </form>
            </div>

        </div>
    </div>

    );
  }
}

export default Patreg;
