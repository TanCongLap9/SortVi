import { Container } from 'react-bootstrap';
import { Header } from '../Header';

export const App = () => (
  <>
    <Header />
    <Container data-testid="home">
      <h2 className="my-4">
        <strong>SortVi</strong>
      </h2>
      <p>
        SortVi is a webapp to visualize sorting algorithm which arranges the
        array into sequence of progressive numbers.
      </p>
      <p>
        Head over to the header section, click <strong>Algorithms</strong> and
        choose the desired one to have a grasp of the algorithms and how it
        works.
      </p>
      <p>
        Or if you want to create your own algorithm, be sure to read the{' '}
        <strong>API</strong> first then you can create your own.
      </p>
    </Container>
  </>
);
