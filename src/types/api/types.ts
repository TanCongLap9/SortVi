export interface EnumType {
  name: string;
  type: string;
  desc: string;
  values: Array<{ name: string; value: string }>;
}

export interface ObjectType {
  name: string;
  type: string;
  entityType: string;
  desc: string;
}

export interface ClassType {
  name: string;
  type: string;
  desc: string;
}

export interface MethodType {
  name: string;
  type: string;
  desc: string;
  signatures:
    | Array<{
        signature: string;
        desc: string;
      }>
    | Array<string>;
  examples?: Array<string>;
}

export type EntityType = EnumType | ObjectType | ClassType | MethodType;
