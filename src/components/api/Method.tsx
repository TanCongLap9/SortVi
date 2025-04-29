import { ListGroup } from 'react-bootstrap';
import { MethodType } from '../../types/api/types';
import { getDefId } from './App';
import { Description } from './Description';
import { Examples } from './Examples';
import { WithCode } from './WithCode';

const Signatures = ({
  signatures,
}: {
  signatures: MethodType['signatures'];
}) => (
  <div>
    <p className="my-2">
      <strong>Signatures</strong>
    </p>
    <ListGroup as="ul">
      {signatures.map((sig, i) =>
        typeof sig === 'string' ? (
          <ListGroup.Item key={i} as="li">
            <pre className="m-0">
              <code>{sig}</code>
            </pre>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item key={i} as="li">
            <div className="mb-2">
              <pre className="m-0">
                <code>{sig.signature}</code>
              </pre>
            </div>
            <div>
              <WithCode>{sig.desc}</WithCode>
            </div>
          </ListGroup.Item>
        )
      )}
    </ListGroup>
  </div>
);

export const Method = ({ def }: { def: MethodType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>method </span>
      <span className="font-monospace">{def.name}()</span>
    </h4>
    <Description desc={def.desc} />
    <Signatures signatures={def.signatures} />
    {def.examples && <Examples examples={def.examples} />}
  </div>
);
