import { Table } from 'react-bootstrap';
import { EnumType } from '../../types/api/types';
import { getDefId } from './App';
import { Description } from './Description';

const Values = ({ values }: { values: EnumType['values'] }) => (
  <div>
    <p className="my-2">
      <strong>Values</strong>
    </p>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {values.map((ex, i) => (
          <tr key={i}>
            <td>
              <pre className="m-0">
                <code>{ex.name}</code>
              </pre>
            </td>
            <td>
              <pre className="m-0">
                <code>{ex.value}</code>
              </pre>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export const Enum = ({ def }: { def: EnumType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>enum </span>
      <span className="font-monospace">{def.name}</span>
    </h4>
    <Description desc={def.desc} />
    <Values values={def.values} />
  </div>
);
