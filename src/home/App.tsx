import React from "react";
import Header from "../Header";
import { Container } from "react-bootstrap";

const App = () => (
  <>
    <Header />
    <Container>
      <p>
        SortVi is a a webapp to visualize sorting algorithm which arranges the
        array into sequence of progressive numbers.
      </p>
      <p>
        Head over the header section, click <b>Algorithms</b> and choose the
        desired one to have a grasp of the algorithms and how it works.
      </p>
      <p>
        Or if you want to create your own algorithm, be sure to read the{" "}
        <b>API</b> first then you can create your own.
      </p>
    </Container>
  </>
);

export default App;
