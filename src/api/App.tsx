import { Card, Container, ListGroup, Table } from "react-bootstrap";
import { api } from "../data.json";
import {
  EntityType,
  ClassType,
  EnumType,
  MethodType,
  ObjectType,
} from "./types";
import Header from "../Header";
import { Fragment } from "react";

const App = () => (
  <Container>
    <Header />
    <h2>Sorter API</h2>
    <Summary api={api} />
    <DefsList api={api} />
  </Container>
);

const getDefId = (def: EntityType) => def.type + "-" + def.name.toLowerCase();

const Summary = ({ api }: { api: Array<EntityType> }) => (
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

const DefsList = ({ api }: { api: Array<EntityType> }) =>
  api?.map((def, i) => (
    <Fragment key={i}>
      {def.type === "enum" ? (
        <Enum def={def} />
      ) : def.type === "method" ? (
        <Method def={def} />
      ) : def.type === "class" ? (
        <Class def={def} />
      ) : def.type === "object" ? (
        <Other def={def} />
      ) : undefined}
    </Fragment>
  ));

const Other = ({ def }: { def: ObjectType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>object </span>
      <span className="font-monospace">{def.name}</span>
    </h4>
    {def.entityType && <EType type={def.entityType} />}
    <Description desc={def.desc} />
  </div>
);

const Class = ({ def }: { def: ClassType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>class </span>
      <span className="font-monospace">{def.name}</span>
    </h4>
    <Description desc={def.desc} />
  </div>
);

const Enum = ({ def }: { def: EnumType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>enum </span>
      <span className="font-monospace">{def.name}</span>
    </h4>
    <Description desc={def.desc} />
    <Values values={def.values} />
  </div>
);

const Method = ({ def }: { def: MethodType }) => (
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

const Signatures = ({
  signatures,
}: {
  signatures: MethodType["signatures"];
}) => (
  <div>
    <p>
      <b>Signatures</b>
    </p>
    <ListGroup as="ul">
      {signatures.map((sig, i) =>
        typeof sig === "string" ? (
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

const WithCode = ({ children }: { children: string }) =>
  children.split("`").map((v, i) => (i % 2 ? <code key={i}>{v}</code> : v));

const Examples = ({ examples }: { examples: Array<string> }) => (
  <div>
    <p>
      <b>Examples</b>
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

const Values = ({ values }: { values: EnumType["values"] }) => (
  <div>
    <p>
      <b>Values</b>
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

const Description = ({ desc }: { desc: string }) => (
  <>
    <p>
      <b>Description</b>
    </p>
    <p>
      <WithCode>{desc}</WithCode>
    </p>
  </>
);

const EType = ({ type }: { type: string }) => (
  <>
    <p>
      <b>Type</b>
    </p>
    <p className="font-monospace">{type}</p>
  </>
);

export default App;
