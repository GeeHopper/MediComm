import React from 'react';
import docpng from '../static/res/images/doc.png';
import axios from 'axios';
import Tools from "./tools";



class Docreg extends React.Component{
    constructor(){
        super();

        //declaring states for the input values of the form
        this.state = {
            mail: '',
            firstname: '',
            lastname: '',
            password: '',
            address: '',
            phone: '',
            fax: '',
            fieldofwork: '',
            agreement: '',
            docnum: '',
            establishmentnumber: ''
        };
    
        this.updateData = this.updateData.bind(this);

        this.agreementchecked = null;
    }

    updateData(event) {
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
        const {mail, firstname, lastname, password, address, phone, fax, fieldofwork, agreement, docnum, establishmentnumber} = this.state;

        const user = {
            mail,
            firstname,
            lastname,
            password,
            address,
            phone,
            fax,
            fieldofwork,
            agreement,
            docnum,
            establishmentnumber
        };
        
        //console.log("Checked is: " + this.agreementchecked.checked);
        
        //check if agreement is accepted
        if(this.agreementchecked.checked)
        {
            axios
            .post(Tools.host + '/doc-reg-sent', user)
                .then(() => console.log('User registered :))'))
                .catch(err => {
                    console.error(err);
                    try{
                        err.response.data.errors.forEach(element => {
                            alert(element["msg"]);
                        });
                    }
                    catch
                    {
                        console.log("error when reading out error messages");
                    }
            });
        }


    }

    render(){
        return(
            <div className="container-fluid" style={{background: "white"}}>
            <div className="row"style={{backgroundColor: "#f3eded"}}>
            
                <div className="col-md-7" style={{backgroundColor: "white"}}>
                    <div id="doc-reg">
                        <img className="doc-reg img-fluid" src={docpng} alt="doc-reg" />
                    </div>
                </div>
                
    
            
                <div className="col-md-4 pt-5 ml-md-5" style={{minHeigth: 100}}>
                    <div className="title text-center mt-4">
                        <h2 className="text-secondary mb-5 ">Registrieren</h2>
                    </div>
                    <div className="bg-right"></div>
    
                    <form className="" onSubmit={this.handleSubmit}>
    
                        <div className="row">
                            <div className="vorName col">
                                <div className="input_field">
                                    <input type="text" placeholder="Vorname" onChange={this.handleInputChange} name="firstname" className="input form-control" />
                                    <i className="name"></i>
                                </div>
    
                            </div>
    
                            <div className="nachName col">
                                <div className="input_field">
                                    <input type="text" placeholder="Nachname" onChange={this.handleInputChange} name="lastname" className="input form-control" />
                                    <i className="name"></i>
                                </div>
                            </div>
                        </div>
                        <div className="mail">
                            <div className="input_field">
                                <input type="text" placeholder="Email" onChange={this.handleInputChange} name="mail" className="input form-control my-3" />
                                <i className="mail"></i>
                            </div>
                        </div>
    
                        <div className="pass">
                            <div className="input_field">
                                <input type="password" placeholder="Passwort" onChange={this.handleInputChange} name="password" className="input form-control my-3" />
                                <i className="enlock"></i>
                            </div>
                        </div>
    
                        <div className="pass-w">
                            <div className="input_field">
                                <input type="password" placeholder="Passwort wiederholen" onChange={this.handleInputChange} className="input form-control my-3" />
                                <i className="enlock"></i>
                            </div>
                        </div>
    
                        <div className="anschrift">
                            <div className="input_field">
                                <input type="text" placeholder="Anschrift" name="address" onChange={this.handleInputChange} className="input form-control my-3" />
                                <i className="anschrift"></i>
                            </div>
                        </div>
    
                        <div className="telefon">
                            <div className="input_field">
                                <input type="text" placeholder="Telefon" name="phone" onChange={this.handleInputChange} className="input form-control my-3" />
                                <i className="telefon"></i>
                            </div>
                        </div>
    
                        <div className="fax">
                            <div className="input_field">
                                <input type="text" placeholder="Fax" name="fax" onChange={this.handleInputChange} className="input form-control my-3" />
                                <i className="fax"></i>
                            </div>
                        </div>
    
                        <div className="arztNr">
                            <div className="input_field">
                                <input type="text" placeholder="Arztnummer" onChange={this.handleInputChange} name="docnum" className="input form-control my-3" />
                                <i className="arztNr"></i>
                            </div>
                        </div>
    
                        <div className="betriebsstättennummer">
                            <div className="input_field">
                                <input type="text" placeholder="Betriebsstättennummer " onChange={this.handleInputChange} name="establishmentnumber" className="input form-control my-3" /> 
                                <i className="betriebsstättennummer "></i>
                            </div>
                        </div>
                        <div className="fachrichtung">
                            <div className="input_field">
                                <input type="text" placeholder="Fachrichtung " onChange={this.handleInputChange} name="fieldofwork" className="input form-control my-3" /> 
                                <i className="adresse "></i>
                            </div>
                        </div>
                        <div id="agreement">
                        <div class="button text-center mt-3 " style={{fontWeight: 'bold', fontSize: 12}}>
                            <input type="checkbox" name="agreement" ref={c => {this.agreementchecked = c}} onChange={this.handleInputChange}/>  Please accept the <a href="/dsgvo">License and User Agreement</a>
                        </div>
                        </div>

                        <div className="form">
                            <div className="button text-center">
                                <input type="submit" className="btn btn-primary badge-pill w-50 mt-5" onChange={this.handleInputChange} value="Registrieren" style={{fontWeight: 'bold', fontSize: 12}}></input>
                            </div>
                        </div>
                        <div className="row"style={{backgroundColor: "#f3eded"}}>
                            <p> <br></br> </p> </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default Docreg;