import React from "react";
import clsx  from "clsx";
import {  ExpressionArg, Expression, ExpressionArgDType } from "survey-engine/data_types";
import { formatDuration, intervalToDuration } from "date-fns";

interface ExpressionArgCompProps {
    exp: ExpressionArg
}

interface ExpressionCompProps {
    exp: Expression
}

class ExpressionArgHelper {
    arg: ExpressionArg;

    constructor(arg: ExpressionArg) {
        this.arg = arg;
    }

    getType(): ExpressionArgDType {
        return this.arg.dtype ?? 'str';
    }

    isNumeric(): boolean {
        return this.getType() === 'num';
    }

    isExpression() {
        return this.getType() === 'exp';
    }

    isString() {
        return this.getType() === 'str';
    }

    num(): number | undefined {
        return this.arg.num;
    }
}

function expression_helper(exp: Expression): React.ReactElement {

    const helper = (info: any)=>{
        return <span className="survey-exp-helper">{info}</span>
    }

    if(exp.name === 'timestampWithOffset' && exp.data) {
        const v =  new ExpressionArgHelper(exp.data[0]);
        if(v.isNumeric()) {
            const value = v.num();
            if(typeof(value) != "undefined") {
                const i = intervalToDuration({start: 0, end: value * 1000});
                return helper(formatDuration(i));
            }
        }
    }

    return <span/>;
}


/**
 * Creates a preview of an expression
 * The preview is a visual aid to make expression more human readable, with a function call like presentation and some
 * indentation to help the call stack and switch understanding
 * @param props 
 * 
 * @returns 
 */
export const ExpressionPreviewComponent : React.FC<ExpressionCompProps> = (props) =>{
    
    const argList = (args?: ExpressionArg[])=> {
        if(!args) {
            return <span/>;
        }
        const n = args.length;

        const hasExpression = args.some( (e:ExpressionArg) => typeof(e.exp) !== "undefined" );
       
        return (
            <ul className={ clsx("survey-exp-arglist", {"survey-exp-expanded": hasExpression}) }>
               { args.map((a: ExpressionArg, index) =><li className={ clsx("survey-exp-arg", {"last": index === (n-1)}) } key={index}><ExpressionPreviewArgComponent exp={a}/></li>) }
            </ul>
        )
    };
    
    if(!props.exp) {
        return <span/>;
    }
    
    return (
        <div className="survey-expression">
            <span className="survey-exp-name">{ props.exp.name }</span>
            <span>{'('}{  argList(props.exp.data) }{')'}</span>
            { expression_helper(props.exp) }
        </div>
    );
}

export const ExpressionPreviewArgComponent : React.FC<ExpressionArgCompProps> = (props) =>{

    const type = props.exp.dtype ?? 'str';

    switch(type) {
        case 'exp':
            return props.exp.exp ? <ExpressionPreviewComponent exp={props.exp.exp}/> : <span/>;
        
        case 'str':
            return <span className="survey-exparg-str">{props.exp.str}</span>;
        
        case 'num':
            return <span className="survey-exparg-num">{props.exp.num}</span>;
    }
}
