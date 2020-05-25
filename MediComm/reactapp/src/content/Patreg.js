import React from 'react';

class Register extends React.Component{
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
        <div>
            <div class="title">
                Registrieren
            </div>


            <div id="pat-reg">
                <img class="pat-reg" src="images/pat.png" alt="pat-reg" height="500" />
            </div>


            <div class="bg-right"></div>

            <form action="/pat-reg-sent" method="post">
                
                <div class="mail">
                    <div class="input_field">
                        <input type="text" placeholder="Email" class="input" name="mail" />
                        <i class="mail"></i>
                    </div>
                </div>

                <div class="vorName">
                    <div class="input_field">
                        <input name="firstname" type="text" placeholder="Vorname" class="input" />
                        <i class="name"></i>
                    </div>

                </div>

                <div class="nachName">
                    <div class="input_field">
                        <input type="text" placeholder="Nachname" class="input" name="lastname" />
                        <i class="name"></i>
                    </div>
                </div>

                <div class="pass">
                    <div class="input_field">
                        <input name="password" type="password" placeholder="Passwort" class="input" />
                        <i class="enlock"></i>
                    </div>
                </div>

                <div class="anschrift">
                    <div class="input_field">
                        <input type="text" placeholder="Anschrift" class="input" name="address" />
                        <i class="anschrift"></i>
                    </div>
                </div>


                <div class="kk">
                    <div class="input_field">
                        <input list="kk" placeholder="Krankenkasse" class="input" name="healthinsurance" />
                        <datalist id="kk">
                            <option value="AOK" />
                            <option value="Knappschaft" />
                            <option value="Innungskrankenkasse" />
                            <option value="DAK Gesundheit" />
                            <option value=" BARMER" />
                        </datalist>
                    </div>
                </div>

                <div class="verNr">
                <div class="input_field">
                    <input type="text" placeholder="Versichertennummer" class="input" name="insurednumber" />
                    <i class="verNr"></i>
                </div>
                </div>

                <div id="agreement">
                    <input type="checkbox" name="agreement" />Please accept the <a href="res/DSGVO">License and User Agreement</a>
                </div>
                
                <input type="submit" class="btn btn-primary" value="Submit" />
                
            </form>
        </div>
        );
    }
}

export default Register;