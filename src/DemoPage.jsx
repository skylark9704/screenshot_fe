import React from "react";
import Drop from "./Dropdown";
import Demo from "./Form";
import { Row, Col } from "antd";
import ListDemo from "./List";

function DemoPage() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ListDemo />
        </Col>
        <Col span={8}>
          <img
            src={
              "https://cdn.mos.cms.futurecdn.net/rLh7Dh7EKo8F6zmDtXYp8W-970-80.jpg.webp"
            }
            width="100%"
          />
        </Col>
        <Col span={8}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <img width="100%" src={"bc-logo.svg"} />
        </Col>
        <Col span={6}>
          <Drop />
        </Col>
        <Col span={6}>
          <Demo />
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
}

export default DemoPage;
