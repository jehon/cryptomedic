import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function IOBlock(
  header: React.ReactNode,
  block: React.ReactNode
): React.ReactNode {
  return (
    <div
      style={{
        width: "calc(min(100%, 800px))",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "0 auto"
      }}
    >
      <Accordion defaultActiveKey="" style={{ width: "100%" }}>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              {header}
              <img src="/static/img/view.svg" alt="View" className="inline" />
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div
                style={{
                  width: "calc(min(800px, 100%))",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  columnGap: "20px"
                }}
              >
                {block}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
