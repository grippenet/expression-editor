import * as types from "survey-engine/data_types";
import { ExpressionSelector, ExpressionRegistry, ExpressionDescriptor, ExpressionProblem,ExpressionValidator, ExpressionFlavor } from "../types";
import { BaseExpressionRegistry } from "../registry";

class AbstractValidator extends BaseExpressionRegistry {

}

const expressionSelector = (mode: ExpressionFlavor):ExpressionSelector => {
    
    if(mode === 'rules') {
            return (e:ExpressionDescriptor)=>{
                if(!e.kind) {
                    return true;
                }
                return e.kind === 'action' || e.kind === 'server';
            };
    }

    if(mode === 'server') {
        return (e:ExpressionDescriptor)=>{
            if(!e.kind) {
                return true;
            }
            return e.kind === 'server';
        };
    }
    if(mode === 'client') {
        return (e:ExpressionDescriptor)=>{
            if(!e.kind) {
                return true;
            }
            return e.kind === 'client';
        };
    }

    return (e:ExpressionDescriptor)=>{
                return true;
            };
}

export const createExpressionValidator = (mode: ExpressionFlavor, registry: ExpressionRegistry):ExpressionValidator => {
    
    const selector = expressionSelector(mode);

    const expressions = registry.getSelectedExpression(selector);
    
    return new ExpressionValidatorBase(expressions, registry.getEnums());
}

export class ExpressionValidatorBase extends AbstractValidator implements ExpressionValidator {
    
    validate(exp: types.Expression): ExpressionProblem[] {
        const problems: ExpressionProblem[]  = [];
        if(!exp.name) {
            problems.push({'type':'error', message: 'Missing name'});
            return problems;
        }

        const d = this.getDescriptor(exp.name);
        if(!d) {
            return problems;
        }
        const n = exp.data ? exp.data.length : 0;
        if( d.hasParams() && n < d.params.length) {
            const v = d.variadic ? 'at least ' : '';
            problems.push({'type': 'error', 'message':  v +  d.params.length + ' parameters are expected'});
        }
        
        return problems;
    }

}
