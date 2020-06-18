import React from 'react';
import docpng from '../static/res/images/doc.png';
import axios from 'axios';
import fs from 'fs';



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
        
        //using axios to post
        axios
        .post('http://localhost:8080/doc-reg-sent', user)
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


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
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
                            <input type="checkbox" name="agreement" onChange={this.handleInputChange}/>  Please accept the <a href="/dsgvo">License and User Agreement</a>
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

        /*return(
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


                <div className="phone">
                    <div className="input_field">
                        <input type="text" placeholder="Telefonnummer" className="input" name="phone" onChange={this.handleInputChange}/>
                        <i className="phone"></i>
                    </div>
                </div>

                <div className="fax">
                    <div className="input_field">
                        <input type="text" placeholder="Fax" className="input" name="fax" onChange={this.handleInputChange}/>
                        <i className="fax"></i>
                    </div>
                </div>

                <div className="docnum">
                    <div className="input_field">
                        <input type="text" placeholder="Arztnummer" className="input" name="docnum" onChange={this.handleInputChange}/>
                        <i className="anschrift"></i>
                    </div>
                </div>

                <div className="establishmentnumber">
                    <div className="input_field">
                        <input type="text" placeholder="Betriebsstättennummer" className="input" name="establishmentnumber" onChange={this.handleInputChange}/>
                        <i className="establishmentnumber"></i>
                    </div>
                </div>

                <div className="fieldofwork">
                    <div className="input_field">
                        <input type="text" placeholder="Fachrichtung" className="input" name="fieldofwork" onChange={this.handleInputChange}/>
                        <i className="fieldofwork"></i>
                    </div>
                </div>

                <div id="agreement">
                    <input type="checkbox" name="agreement" onChange={this.handleInputChange}/>Please accept the <a href="/dsgvo">License and User Agreement</a>
                </div>
                
                <input type="submit" className="btn btn-primary" value="Submit" />
                
            </form>
        </div>
        );*/
    }
}

export default Docreg;