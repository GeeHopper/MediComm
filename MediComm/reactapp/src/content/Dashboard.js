import React from 'react';
import Output from './Output';
import App from '../App';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

//new design related imports
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle.js";
import SmallStats from "../components/common/SmallStats.js";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";

var ObjectID = require('mongodb').ObjectID;

//makeid to save profile pics and associate them with the users
function makeprofilepicid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + ".png";
 }

class Dashboard extends React.Component{

    profilepicfile = "";

    constructor(){
        super();
        this.state = {
            profilepic: '',
            mail: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            mail: '',
            fax: '',
            url: '',
            fieldofwork: '',
            insurednumber: '',
            healthinsurance: '',
            isDoc: '',
            patid: '',
            userid: '',
            docid: '',
            profilepicfile: '',

            content: []
        };
        
        //always passing our token so the site can verify wether we're logged in or not
        axios.defaults.headers.common['token'] = Cookies.get("token");
          
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e =>
    {
        e.preventDefault();
        const {mail, firstname, lastname, password, address, agreement, insurednumber, healthinsurance, profilepic, patid, userid} = this.state;
        const form_data = new FormData();
        //If a profile pic is sent, it's name gets replaced by a string for identification. this string is once saved in the user table and accesable via uploads/newfilename
        const user = {
            mail,
            firstname,
            lastname,
            password,
            address,
            agreement,
            userid,
            profilepic
        }
        
        if(e.target.profilepic.files[0])
        {
            const newfilename = makeprofilepicid(20);
            form_data.append("file", e.target.profilepic.files[0]);
            form_data.append("newfilename", newfilename);
            user.profilepic = newfilename;
        }
       
        const patient = {
            insurednumber,
            healthinsurance,
            patid
        };
        
        console.log("user profilepic: " + user.profilepic);

        //using axios to post
        axios
        .post('http://localhost:8080/edit-sent-user', user)
            .then(() => console.log('User updated :))'))
            .catch(err => {
                console.error(err);
        });
        axios
        .post('http://localhost:8080/edit-sent-patient', patient)
            .then(() => console.log('Patient updated :))'))
            .catch(err => {
                console.error(err);
        });
        const headerss = {
            'content-type': 'multipart/form-data'
        }
        if(e.target.profilepic.files[0])
        {
            axios
            .post('http://localhost:8080/profilepic-sent', form_data,{headerss})
                .then(() => console.log('Profilepic set.'))
                .catch(err => {
                    console.error(err);
            });
        }


        /*this.setState({sendForm: this.state.name});
        event.preventDefault();*/
    }

    setUsername(username)
    {
        this.username = username;
        console.log("username: " + username);
    }

    //using axios in here to get access to the response of our backend in our frontend
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
            console.log(response.data.profilepic);
            if(response.data.user.profilepic)
            {
                this.setState({profilepic: response.data.user.profilepic});
                this.setState({profilepicfile: response.data.user.profilepic});
            }
            this.setState({userid: response.data.user._id});
            if(response.data.user.isDoc === "0")
            {
                this.setState({patid: response.data.patient._id});
                this.setState({mail: response.data.patient.mail});
                this.setState({insurednumber: response.data.patient.insurednumber});
                this.setState({healthinsurance: response.data.patient.healthinsurance});
            }
            else if(response.data.user.isDoc === "1")
            {
                this.setState({phone: response.data.doctor.phone});
                this.setState({docid: response.data.doctor._id});
                this.setState({fax: response.data.doctor.fax});
                this.setState({establishmentnumber: response.data.doctor.establishmentnumber});
                this.setState({fieldofwork: response.data.doctor.fieldofwork});
                this.setState({mail: response.data.doctor.mail});
            }


            this.setState({firstname: response.data.user.firstname});
            this.setState({lastname: response.data.user.lastname});
            this.setState({password: response.data.user.password});
            this.setState({address: response.data.user.address});
            
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

    isDoc()
    {
        if(this.state.isDoc == "1")
            return true;
        else
            return false;
    }

    docContent()
    {
        return("");
    }

    checkProfilepic()
    {
        if(this.state.profilepicfile)
            return (<img src = {require("../uploads/" + this.state.profilepicfile)} />);
        else
            return ("no image");
    }

    patientContent()
    {
        return(
            <div id="page-top">
            <div id="wrapper">
          
              <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          
                  <div className="sidebar-brand-text mx-3">Medibook <sup></sup></div>
                </a>
          
                <hr className="sidebar-divider my-0" />
          
                <li className="nav-item">
                  <a className="nav-link" href="index.html">
                    <i className="fas fa-user"></i>
                    <span>Persönliche Daten</span></a>
                </li>
          
                <hr className="sidebar-divider" />
          
          
          
          
                <li className="nav-item ">
                  <a className="nav-link" href="dokumente.html">
                  <i className="far fa-folder"></i>
                    <span>Dokumente</span>
                  </a>
                </li>
          
                <li className="nav-item">
                  <a className="nav-link collapsed" href="termin.html">
                    <i className="far fa-calendar-check"></i>
                    <span>Terminplan</span>
                  </a>
                </li>
                <hr className="sidebar-divider" />
          
          
                <li className="nav-item">
                  <a className="nav-link" href="medikamente.html">
                <i className="fas fa-capsules"></i>
                    <span>Medikamente</span></a>
                </li>
          
                <li className="nav-item">
                  <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>KANN..</span></a>
                </li>
          
                <hr className="sidebar-divider d-none d-md-block" />
          
                <div className="text-center d-none d-md-inline">
                  <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
          
              </ul>
              <div id="content-wrapper" className="d-flex flex-column">
          
                <div id="content">
          
                  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                      <i className="fa fa-bars"></i>
                    </button>

                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                      <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
          
                    <ul className="navbar-nav ml-auto">
          
                      <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                          <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                              <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                  <i className="fas fa-search fa-sm"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </li>
          
                      <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-bell fa-fw"></i>
                          <span className="badge badge-danger badge-counter">3+</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                          <h6 className="dropdown-header">
                            Alerts Center
                          </h6>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                              <div className="icon-circle bg-primary">
                                <i className="fas fa-file-alt text-white"></i>
                              </div>
                            </div>
                            <div>
                              <div className="small text-gray-500">December 12, 2019</div>
                              <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                              <div className="icon-circle bg-success">
                                <i className="fas fa-donate text-white"></i>
                              </div>
                            </div>
                            <div>
                              <div className="small text-gray-500">December 7, 2019</div>
                              $290.29 has been deposited into your account!
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                              <div className="icon-circle bg-warning">
                                <i className="fas fa-exclamation-triangle text-white"></i>
                              </div>
                            </div>
                            <div>
                              <div className="small text-gray-500">December 2, 2019</div>
                              Spending Alert: We've noticed unusually high spending for your account.
                            </div>
                          </a>
                          <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                        </div>
                      </li>
          
                      <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-envelope fa-fw"></i>
                          <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                          <h6 className="dropdown-header">
                            Message Center
                          </h6>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                              <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                              <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                              <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                              <div className="status-indicator"></div>
                            </div>
                            <div>
                              <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                              <div className="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                              <div className="status-indicator bg-warning"></div>
                            </div>
                            <div>
                              <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                              <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                          </a>
          
                          <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                        </div>
                      </li>
          
                      <div className="topbar-divider d-none d-sm-block"></div>
          
                       Nav Item - User Information 
                      <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                          <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                        </a>
                         Dropdown - User Information 
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                          <a className="dropdown-item" href="profile.html">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                          </a>
          
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                          </a>
                        </div>
                      </li>
          
                    </ul>
          
                  </nav>
          
                  <div className="container-fluid">
          
                     Page Heading 
                    <h1 className="h3 mb-4 text-gray-800">Buttons</h1>
          
          
                        </div>
          
              </div>
          
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up"></i>
            </a>
          
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          
            
          
        </div>
        </div>
        );
    }

    getContent()
    {
        if(this.state.mail != '')
        {
            if(this.isDoc())
                return this.docContent();
            else
                return this.patientContent();
        }
        else
        {
            return(<div>Please login to view this Content. :)</div>);
        }
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

        //return this.getContent();
        return(
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                <PageTitle title="Terminübersicht" subtitle="Medibook" className="text-sm-left mb-3" />
                </Row>

            
            </Container>
        )
    }
}

export default Dashboard;