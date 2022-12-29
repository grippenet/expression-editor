
import {EnumList, ExpressionSchema, ExpressionDescriptorSchema, ExpressionDescriptorParamSchema} from "../types/schema";
import { ExpressionSelector, ExpressionList, ExpressionRegistry, ExpressionDescriptor, ExpressionDescriptorParam } from "../types";

export class BaseExpressionDescriptor implements ExpressionDescriptor {

    def: ExpressionDescriptorSchema;

    name: string;

    params: ExpressionDescriptorParam[]

    variadic: boolean;

    constructor(name: string, def: ExpressionDescriptorSchema) {
        this.def = def;
        this.name = name;
        this.params = [];
        this.variadic = false;
        if(this.hasParams() ) {
            this.def.params.forEach( (p, index) => {
                this.params.push( new BaseExpressionDescriptorParam(p, index) );
            });
            const last = this.params[ this.params.length - 1];
            if(last.variadic) {
                this.variadic = true;
            }
        }

    }

    get description() {
        return this.def.description;
    }

    get kind() {
        return this.def.kind;
    }

    hasParams(): boolean {
        return this.def.params && this.def.params.length > 0;
    }

    getParamAt(index: number): ExpressionDescriptorParam | undefined {
        if( !this.hasParams() ) {
            return undefined;
        }
        const n = this.params.length;
        if(index < n) {
            return this.params[index];
        }
        // If last parameter is variadic then return the last descriptor for indexes over the params count
        const last = this.params[n-1];
        if(last.variadic) {
            return last;
        }
        return undefined;
    }
}

export class BaseExpressionDescriptorParam implements ExpressionDescriptorParam {

    def: ExpressionDescriptorParamSchema

    /**
     * Index in the definition set
     */
    index: number;
    
    constructor(def: ExpressionDescriptorParamSchema, index: number) {
        this.def = def;
        this.index = index;
    }

    get name() {
        return this.def.name;
    }

    get optional() {
        return this.def.optional ?? false;
    }

    get description() {
        return this.def.description;
    }

    get variadic() {
        return this.def.variadic ?? false;
    }

    get allowThis() {
        return this.def.allow_this ?? false;
    }

    get role() {
        return this.def.role;
    }
}


export class BaseExpressionRegistry {
    expressions: ExpressionList

    enums: EnumList

    constructor( expressions: ExpressionList,enums: EnumList ) {
        this.expressions = expressions;
        this.enums = enums;
    }

    getEnums(): EnumList {
        return this.enums;
    }

    getKnownExpressions(): Array<string> {
       return Object.keys(this.expressions);
    }

    getSelectedExpression(f: ExpressionSelector): ExpressionList {
        const ee : ExpressionList = {};
        Object.entries(this.expressions).forEach((r)=> {
            const e = r[1];
            if(f(e)) {
                ee[ r[0] ] = e;
            }
        });
        return ee;
    }

    getDescriptor(name: string): ExpressionDescriptor|undefined {
        return this.expressions[name] ?? undefined;
    }

    toJSON():JSONRegistry  {
        return {
            'expressions': this.expressions,
            'enums': this.enums
        }
    }
    
}

interface JSONRegistry {
    [key:string]: object
}

class GeneralRegistry extends BaseExpressionRegistry {
    static fromJSON(o: JSONRegistry): GeneralRegistry {
        return new GeneralRegistry( o['expressions'] as ExpressionList, o['enums'] as EnumList )
    }
}

export const registryFromSchema = (schema: ExpressionSchema): ExpressionRegistry => {

    const ee : ExpressionList = {};
    Object.entries(schema.expressions).forEach((r) => {
        const e = new BaseExpressionDescriptor(r[0], r[1]);
        ee[ r[0] ] = e;
    });

    return new GeneralRegistry(ee, schema.enums);
}

export const createEmptyRegistry = () => {
    return new GeneralRegistry({},{});
}