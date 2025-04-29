import { Fragment } from 'react';
import {
  ClassType,
  EntityType,
  EnumType,
  MethodType,
  ObjectType,
} from '../../types/api/types';
import { Class } from './Class';
import { Enum } from './Enum';
import { Method } from './Method';
import { Other } from './Other';

export const DefsList = ({ api }: { api: Array<EntityType> }) => (
  <>
    {api?.map((def, i) => (
      <Fragment key={i}>
        {def.type === 'enum' ? (
          <Enum def={def as EnumType} />
        ) : def.type === 'method' ? (
          <Method def={def as MethodType} />
        ) : def.type === 'class' ? (
          <Class def={def as ClassType} />
        ) : def.type === 'object' ? (
          <Other def={def as ObjectType} />
        ) : undefined}
      </Fragment>
    ))}
  </>
);
