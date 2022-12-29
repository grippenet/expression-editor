
import { ExpressionRegistry} from "./registry";
import {Expression} from "survey-engine/data_types";

export type ExpressionFlavor = 'client' | 'server' | 'rules';

export interface ExpressionProblem {
    type: 'error' | 'warning'
    message: string
}

export interface ExpressionValidator extends ExpressionRegistry {
    validate(exp: Expression): ExpressionProblem[];
}