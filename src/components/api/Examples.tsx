import { ListGroup } from 'react-bootstrap';

export const Examples = ({ examples }: { examples: Array<string> }) => (
  <div>
    <p className="my-2">
      <strong>Examples</strong>
    </p>
    <ListGroup as="ul">
      {examples.map((ex, i) => (
        <ListGroup.Item key={i} as="li">
          <pre className="m-0">
            <code>{ex}</code>
          </pre>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);
