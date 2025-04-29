import { ClassType } from '../../types/api/types';
import { getDefId } from './App';
import { Description } from './Description';

export const Class = ({ def }: { def: ClassType }) => (
  <div>
    <h4 className="my-3" id={getDefId(def)}>
      <span>class </span>
      <span className="font-monospace">{def.name}</span>
    </h4>
    <Description desc={def.desc} />
  </div>
);
