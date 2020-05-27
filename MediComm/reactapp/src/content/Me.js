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
            count: 0,
            data: [
                {"id":1, "name":"Schmidt"},
                {"id":2, "name":"chmidt"},
                {"id":3, "name":"hmidt"},
                {"id":4, "name":"midt"},
            ],
            token: Cookies.get("token"),
            persons: [1, 2, 3],
            mail: []
        };
        
        axios.defaults.headers.common['token'] = Cookies.get("token");
        

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

    setUsername(username)
    {
        this.username = username;
        console.log("username: " + username);
    }

    componentDidMount () {
        const url = 'http://localhost:8080/me';
        const options = {
        method: 'GET',
        headers: {
            'token': Cookies.get("token"),
        },
        };

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
            this.setState({mail: response.data.firstname});
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


        
        
        return(
            <ul>
            
                { this.state.mail } it is :)
            
            </ul>
        );
    }
}

export default Me;