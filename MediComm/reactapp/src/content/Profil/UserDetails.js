import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

const UserDetails = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
     
    </CardHeader>
    <ListGroup flush>
      
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Laura Schmidt",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Patient",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Beschreibung",
    metaValue:
      "kurze Beschreibung bla bla blaaaaaaaa jnajnjnajndjndjnfjfbajbjfabkjabkbkabkbkhabhkfbkha"
  }
};

export default UserDetails;
