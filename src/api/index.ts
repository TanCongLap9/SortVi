export interface EnumType {
  name: string;
  type: "enum";
  desc: string;
  values: Array<{ name: string; value: string }>;
}

export interface ObjectType {
  name: string;
  type: "object";
  entityType: string;
  desc: string;
}

export interface ClassType {
  name: string;
  type: "class";
  desc: string;
}

export interface MethodType {
  name: string;
  type: "method";
  desc: string;
  signatures:
    | Array<{
        signature: string;
        desc: string;
      }>
    | Array<string>;
  examples?: Array<string>;
}

export type EntityType = EnumType | ClassType | MethodType | ObjectType;
