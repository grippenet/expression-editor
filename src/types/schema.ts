/**
 * 
 * Interfaces of the JSON expressions schema
 * 
 */

/**
 * Describe parameter of an expression
 */
export interface ExpressionDescriptorParamSchema {
    /**
     * Name of the parameter, this is only for labelling the parameter to make the expression
     * description more understandable. It's contextual (to be distincted from the role which is more like a parameter type)
     */
    name: string;
    description?: string;
    /**
     * Is this parameter variadic (accept list of values as the set of following parameters)
     */
    variadic?: boolean; // 
    /**
     * Semantic role of the parameter
     */
    role?: RoleType; 
    comment?: string;
    optional?: boolean;
    /**
     * This argument allow "this" special value
     */
    allow_this?: boolean;
}

/***
 * Role is a semantic annotation for expression parameter to describe how to check a value (or a set of value)
 * Its a kind of Type for parameter
 * A role can be associated with a set of acceptable values, or with a checking strategy
 * Some roles are not associated with a single parameter but can be associated with several to be able to implement more complex checks
 * (e.g. checking if a response exists with item_key, and response comp key and response key)
 */
export type RoleType =
  | "flag_key"
  | "study_status"
  | "event_type"
  | "participant_status"
  | "position"
  | "survey_key"
  | "item_key"
  | "rg_key"
  | "rg_comp_prefix"
  | "rg_comp_key"
  | "rg_full_path"
  | "validation_key"
  | "timestamp"
  | "time_unit";


/**
 * List of acceptable structures for roles description params
 */
type RoleDef = RoleItemPath | RoleValidationPath;

/**
 * RoleDescriptor describes a complex role of a set parameter
 * A role is a semantic annotation of the parameter allowing to check for value and consistency
 * The complex role is used to describe semantic of an association of parameters
 */
export interface RoleDescriptor {
    role: string;
    params: any;
}

export interface RoleItemPath extends RoleDescriptor {
    role: "item_path",
    params: {
        item_key: string;
        path: string[]
    }
}

export interface RoleValidationPath extends RoleDescriptor {
    role: "validation_path",
    params: {
        item_key: string;
        path: string[]
    }
}


export interface ExpressionDescriptorSchema {
    kind?: string;
    description?: string;
    params: ExpressionDescriptorParamSchema[]
    /**
     * Roles describes a complex association of parameters as a single semantic role
     * For example to check for an response the item key and the response slot can be in separated parameters
     * a RoleDef describe how parameters has to be combined to be able to check the role
     */
    roles?: RoleDef[]
    comment?: string;
}

export interface EnumList {
    [key:string]: string[]
}

export interface ExpressionListSchema {
    [key:string]: ExpressionDescriptorSchema
}

export interface ExpressionSchema {
    engineVersion: string;
    expressions: {
        [key:string]: ExpressionDescriptorSchema
    },
    enums: EnumList
}