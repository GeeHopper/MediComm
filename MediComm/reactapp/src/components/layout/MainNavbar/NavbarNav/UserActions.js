import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import Cookies from 'js-cookie';
import axios from 'axios';

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,

      //User related
      profilepic: '',
      profilepicfile: ''
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentWillMount(){
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
            console.log("pp is: " + response.data.user.profilepic);
            if(response.data.user.profilepic)
            {
                console.log("it is");
                this.setState({profilepic: response.data.user.profilepic});
                this.setState({profilepicfile: response.data.user.profilepic});
            }
        });
  }

  checkProfilepic()
    {
        if(this.state.profilepicfile)
        {

            return (
              <img
            className="user-avatar rounded-circle mr-2"
            src={require("../../../../../public/uploads/" + this.state.profilepicfile)}
            alt="User Avatar"
          />
            );
        }
        else
            return (<div>no image</div>);
    }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          {console.log("pp inline is: " + this.state.profilepic)}
          {this.checkProfilepic()}
          {" "}
          <span className="d-none d-md-inline-block">Sierra Brooks</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
         
          <DropdownItem tag={Link} to="/" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
