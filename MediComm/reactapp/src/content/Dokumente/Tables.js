import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const Tables = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Dokumente" subtitle="Medibook" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0"> PDF Datei</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
             
              <tbody>
                <tr>
                  <td></td>
                  
                </tr>
                
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0"> Image</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
             
              <tbody>
                <tr>
                  <td></td>
                  
                </tr>
                
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Video</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
             
              <tbody>
                <tr>
                  <td></td>
                  
                </tr>
                
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

  
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Audio</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
             
              <tbody>
                <tr>
                  <td></td>
                  
                </tr>
                
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  </Container>
);

export default Tables;
