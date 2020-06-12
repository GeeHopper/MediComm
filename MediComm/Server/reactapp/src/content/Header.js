import React from 'react';
import Output from './Output';

class Header extends React.Component{
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
                <head>

                </head>
                <div>
                    <button onClick={() =>
                        this.setState({count: this.state.count + 1})}>+</button>
                    <p> Count = {this.state.count}</p>
                    

                    <form onSubmit = {this.handleSubmit}>
                        Name: <input type="text" value={this.state.name} onChange={this.updateData} />
                        <textarea value={this.state.name} onChange={this.updateData} />
                        <input type="submit" value="Send"/>
                        <p> this.state.name: {this.state.name}</p>
                        <p> this.state.sendForm: {this.state.sendForm}</p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Header;