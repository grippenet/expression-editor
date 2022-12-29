import {EnumList, ExpressionSchema, ExpressionDescriptorSchema, ExpressionDescriptorParamSchema} from "./schema";

export type ExpressionSelector = (e:ExpressionDescriptor)=>boolean;

export interface ExpressionList {
    [key:string]: ExpressionDescriptor
}

export interface ExpressionDescriptorParam {

    def: ExpressionDescriptorParamSchema

    /**
     * Index in the definition set
     */
    index: number;


    name:string;

    
    optional: boolean;

    description?:string;

    variadic:boolean;

    allowThis:boolean;

    role?: string;
}


export interface ExpressionDescriptor {

    def: ExpressionDescriptorSchema;

    name: string;

    params: ExpressionDescriptorParam[]

    variadic: boolean;


    description?:string;

    kind?:string;

    hasParams(): boolean;

    getParamAt(index: number): ExpressionDescriptorParam | undefined;
}


export interface ExpressionRegistry {
    getKnownExpressions: ()=>string[]
    getEnums: ()=>EnumList
    getSelectedExpression: (f: ExpressionSelector)=>ExpressionList
    getDescriptor(name: string): ExpressionDescriptor|undefined 
} 
