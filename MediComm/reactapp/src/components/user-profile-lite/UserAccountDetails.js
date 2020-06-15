import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

const UserAccountDetails = ({ title }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feVorname">Vorname</label>
                  <FormInput
                    id="feVorname"
                    placeholder="Vorname"
                 
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Nachname</label>
                  <FormInput
                    id="feNachname"
                    placeholder="Nachname"
                   
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                   
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Passwort</label>
                  <FormInput
                    type="password"
                    id="fePasswort"
                    placeholder="Passwort"
                    
                    onChange={() => {}}
                    autoComplete="current-passwort"
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Adresse</label>
                <FormInput
                  id="feAdresse"
                  placeholder="Adresse"
                  onChange={() => {}}
                />
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">Stadt</label>
                  <FormInput
                    id="feStadt"
                    placeholder="Stadt"
                    onChange={() => {}}
                  />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">Staat</label>
                  <FormSelect id="feInputState">
                    <option>Wähle...</option>
                    <option>Baden-Württemberg</option>
                    <option>Bayern </option>
                    <option>Berlin</option>
                    <option>Brandenburg</option>
                    <option>Bremen</option>
                    <option>Hamburg</option>
                    <option>Hessen</option>
                    <option>Mecklenburg-Vorpommern</option>
                    <option>Niedersachsen</option>
                    <option>Nordrhein-Westfalen</option>
                    <option>Rheinland-Pfalz</option>
                    <option>Saarland</option>
                    <option>Sachsen</option>
                    <option>Sachsen-Anhalt</option>
                    <option>Thüringen</option>
                    <option>Schleswig-Holstein</option>
                   
                  </FormSelect>
                </Col>
               
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feBeschreibung">Beschreibung</label>
                  <FormTextarea id="feBeschreibung" rows="5" />
                </Col>
              </Row>
              <Button theme="accent">Aktualisieren</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
