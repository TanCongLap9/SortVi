import { ObjectType } from '../../types/api/types';
import { getDefId } from './App';
import { Description } from './Description';

const EType = ({ type }: { type: string }) => (
  <>
    <p className="my-2">
      <strong>Type</strong>
    </p>
    <p className="font-monospace">{type}</p>
  </>
);

export const Other = ({ def }: { def: ObjectType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>object </span>
      <span className="font-monospace">{def.name}</span>
    </h4>
    {def.entityType && <EType type={def.entityType} />}
    <Description desc={def.desc} />
  </div>
);
