import React from 'react';
import Output from './Output';

class Profileedit extends React.Component{
    constructor(){
        super();
        this.state = {
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
                {/*<button onClick={() =>
                    this.setState({count: this.state.count + 1})}>+</button>
                <p> Count = {this.state.count}</p>*/}
                
                <form action="edit-sent" method="post">
                    <input type="text" placeholder="firstname" name="firstname" className="input"  required />

                </form>
            </div>
        );
    }
}

export default Profileedit;