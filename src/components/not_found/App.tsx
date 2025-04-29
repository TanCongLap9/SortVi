import { Container } from 'react-bootstrap';
import { Header } from '../Header';

export const App = () => (
  <>
    <Header />
    <Container className="h-100" data-testid="404">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center">
          <strong>That's a 404.</strong>
        </h2>
        <p className="text-center">You feel lost.</p>
      </div>
    </Container>
  </>
);
