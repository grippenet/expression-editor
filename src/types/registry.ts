import {EnumList, ExpressionSchema, ExpressionDescriptorSchema, ExpressionDescriptorParamSchema} from "./schema";

// Selector for expressions
export type ExpressionSelector = (e:ExpressionDescriptor)=>boolean;

export interface ExpressionList {
    [key:string]: ExpressionDescriptor
}

/**
 * Expression parameter description
 */
export interface ExpressionDescriptorParam {

    def: ExpressionDescriptorParamSchema

    /**
     * Index in the definition set
     */
    index: number;

    /**
     * Parameter name
     */
    name:string;
    
    /**
     * Is Optional
     */
    optional: boolean;

    description?:string;

    /**
     * Is variadic parameter ?
     */
    variadic:boolean;

    /**
     * Is special value `this` allowed
     */
    allowThis:boolean;

    /**
     * Semantic role for this parameter
     */
    role?: string;
}

/**
 * Describe an expression in the expression Registry
 */
export interface ExpressionDescriptor {

    def: ExpressionDescriptorSchema;

    name: string;

    params: ExpressionDescriptorParam[]

    /**
     * Does expression accepts variadic parameter
     */
    variadic: boolean;

    description?:string;

    /**
     * Kind of expression (evaluation context)
     */
    kind?:string;

    /**
     * Has Any parameter/argument
     */
    hasParams(): boolean;

    getParamAt(index: number): ExpressionDescriptorParam | undefined;
}

export type FlagRegistry = Map<string, FlagDescriptor>;

export interface FlagDescriptor {
    values?: string[] // Allowed values if defined
}

/**
 * Registry of known expressions
 */
export interface ExpressionRegistry {
    getKnownExpressions: ()=>string[]
    getEnums: ()=>EnumList
    getSelectedExpression: (f: ExpressionSelector)=>ExpressionList
    getDescriptor(name: string): ExpressionDescriptor|undefined 
    getKnownFlags: ()=> FlagRegistry
} 
