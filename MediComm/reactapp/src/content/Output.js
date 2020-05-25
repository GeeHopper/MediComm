import React from 'react';

class Output extends React.Component{
    render(){
        return(
            <p>
                <span>{this.props.data.id}: </span>
                <span>{this.props.data.name}: </span>
            </p>
        )
    }

}

export default Output;