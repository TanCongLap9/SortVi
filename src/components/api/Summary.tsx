import { Card } from 'react-bootstrap';
import { EntityType } from '../../types/api/types';
import { getDefId } from './App';

export const Summary = ({ api }: { api: Array<EntityType> }) => (
  <Card>
    <Card.Header>
      <Card.Title as="h5">Contents</Card.Title>
    </Card.Header>
    <Card.Body>
      {api?.map((def, i) => (
        <div key={i}>
          <Card.Link href={`#${getDefId(def)}`}>
            <pre className="m-0">
              <code>{def.name}</code>
            </pre>
          </Card.Link>
        </div>
      ))}
    </Card.Body>
  </Card>
);
