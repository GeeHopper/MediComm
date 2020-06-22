import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

export default () => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" action="search">
    <InputGroup seamless className="ml-3">
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons">search</i>
        </InputGroupText>
      </InputGroupAddon>
      <FormInput
        name="username"
        className="navbar-search"
        placeholder="Suche nach Doktor..."
      />
    </InputGroup>
  </Form>
);
