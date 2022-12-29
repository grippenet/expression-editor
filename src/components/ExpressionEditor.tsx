import React, { useState, useEffect, useContext } from 'react';
import * as types from "survey-engine/data_types";
import { Card, ListGroup, Button, Tabs, Tab, Alert, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import { Icon, HelpTip } from './utils';
import {  createExpressionValidator } from '../validator';
import { ExpressionValidator, ExpressionFlavor,  ExpressionDescriptor, ExpressionDescriptorParam, ExpressionProblem } from '../types';

import { ExpressionPreviewComponent } from './ExpressionPreview';
import { ExpressionArgDType } from 'survey-engine/data_types';
import { getDefaultRegistry } from '../registry';

interface EditorContext {
    validator?: ExpressionValidator
    prefix: string;
    knownList: string; // datalist id for general list of available expressions
}

const createTextExp = (str:string): types.ExpressionArg => {
    return {
        dtype: 'str',
        str: str
    };
}

interface DTypeOptions {
    code: types.ExpressionArgDType;
    label: string;
}

const DTypes : Array<DTypeOptions>= [
    {
        code: 'str',
        label: 'string'
    },
    {
        code:'num',
        label: 'numeric'
    },
    {
        code: 'exp',
        label: 'expression'
    }
]
export interface ExpressionEditorState {
    getExpression(): types.Expression|undefined;
    reset():void
}

export function createExpressionEditorState(exp?: types.Expression) {
    return new ExpressionEditorStateBase(exp);
}
export class ExpressionEditorStateBase {
    exp?: types.Expression;

    constructor(exp?: types.Expression) {
        this.exp = exp;
    }

    getExpression() {
        return this.exp;
    }

    reset() {
        this.exp = undefined;
    }
}
export interface ExpressionEditorProps {
    onChange: (state: ExpressionEditorState)=>void;
    state: ExpressionEditorState
    mode: ExpressionFlavor
    prefix?: string;
}

const random_id = ():string =>{
  const s1 = (Date.now() % 100000).toString(36);
  const s2 = Math.floor((1 + Math.random()) * 1e8).toString(36);
  return s1 + '-' + s2;
}

const ExpressionEditorContext = React.createContext<EditorContext>({prefix:'', knownList: ''});

export const ExpressionEditor : React.FC<ExpressionEditorProps> = (props) => {
    
    const [state, setState] = useState<ExpressionEditorStateBase>(props.state);
    const [changed, setChanged] = useState<boolean>(false);

    const [prefix, setPrefix] = useState((props.prefix ?? 'exp-editor') + '-' + random_id());

    const context = {
        validator: createExpressionValidator(props.mode, getDefaultRegistry()),
        prefix: prefix,
        knownList: prefix + '-gk'
    };

    useEffect(()=>{
        if(changed){
            props.onChange(state); 
            setChanged(false);
        }
    }, [changed])

    //console.log('editor context', context);

    const handleOnChange = (newExp?: types.Expression) => {
       state.exp = newExp;
       setState(state);
       setChanged(true);
    };

    const handleReset = ()=>{
        state.exp = undefined;
        setState(state);
        setChanged(true);
    }       

    const exp = state.exp;

    const knownExpressions = context.validator.getKnownExpressions();

    return <React.Fragment>
        <ExpressionEditorContext.Provider value={context} >
            <Tabs defaultActiveKey="preview">
            <Tab eventKey="preview" title="Preview">
                    { exp ? <ExpressionPreviewComponent exp={exp}/> : 'No expression to preview' }
                </Tab>
                <Tab eventKey="editor" title="Editor">
                    <ExpressionElementEditor exp={exp} onChange={handleOnChange}/>
                </Tab>
                <Tab eventKey="json" title="JSON view">
                    <pre className="w-100 h-100" >{JSON.stringify(exp, undefined, 2)}</pre>
                </Tab>
            </Tabs>
            <datalist id={context.knownList}>
                { knownExpressions.length >0 ? knownExpressions.map((e, i)=> <option key={i} value={e}/> ) : '' }
            </datalist>
        </ExpressionEditorContext.Provider>
        <Button onClick={handleReset} size="sm">Reset expression</Button>
    </React.Fragment>
};

interface ExpressionElementEditorProps {
    exp?: types.Expression 
    onChange: (exp?: types.Expression) => void;
}

export const ExpressionElementEditor: React.FC<ExpressionElementEditorProps> = (props) => {

    const [name, setName] = useState<string>( props.exp ? props.exp.name : '');
    const [args, setArgs] = useState<types.ExpressionArg[]|undefined>( props.exp && props.exp.data ? props.exp.data : undefined )
    const [changed, setChanged] = useState(false)
    
    const context = useContext(ExpressionEditorContext);

    var knownExp : ExpressionDescriptor | undefined;

    if(context.validator) {
        knownExp = context.validator.getDescriptor(name);
    }

    const getExp =(): types.Expression=>{
        return {
            name: name,
            data: args,
        };
    }

    useEffect(()=>{
        if(changed) {
            const exp = getExp();
            props.onChange(exp);
            setChanged(false);
        }
    }, [changed]);

    const handleChangeName = (newName: string)=> {
        setName(newName);
        setChanged(true);
    }

    const handleChangeArg = (arg: types.ExpressionArg, index: number)=> {
        if(!args) {
            console.log("args is empty");
            return;
        }
        const aa = args.concat();
        aa[index] = arg;
        setArgs(aa);
        setChanged(true);
    }

    const handleAdd =()=> {
        const aa = args ? args.concat([]) : [];
        aa.push(createTextExp(''));
        setArgs(aa);
        setChanged(true);
    };

    const handleRemoveArg = (index: number) => {
       if(!args) {
        return;
       }
       console.log('remove arg', index);
       const aa = args.filter( (v, idx) => idx !== index );
       console.log(aa);
       setArgs(aa);
       setChanged(true);
    }

    const argItem = function(arg: types.ExpressionArg, index: number) {
        
        var p : ExpressionDescriptorParam | undefined;
        if(knownExp) {
           p = knownExp.getParamAt(index);
        }
        
        return <ListGroup.Item key={index}>
                <ExpressionArgEditor arg={arg} index={index} key={index} onChange={handleChangeArg} onRemove={handleRemoveArg} descriptor={p}/>
            </ListGroup.Item>
    }

    const argList = (list: types.ExpressionArg[], params?: ExpressionDescriptorParam[])=> {
        return  <ListGroup className='m-1'>
        { list.map(argItem) }
       </ListGroup>;
    }

    const expDescriptor = (d: ExpressionDescriptor)=> {
        return <OverlayTrigger overlay={( <Popover><ExpressionDescriptorComponent desc={d} name={name}/></Popover>)} placement="top" trigger="click">
            <Button size="sm">?</Button>
        </OverlayTrigger>
    }

    const renderProblems = (problems: ExpressionProblem[])=> {
        return problems.map((p, index)=>{
            const variant = p.type == "error" ? "danger" : "warning";
           return <Alert key={index} variant={variant}>{p.message}</Alert>
        });
    }

    const datalist = context.knownList ? context.knownList: undefined;

    const problems = context.validator ? context.validator.validate(getExp()) : undefined;

    //console.log('validator', context.validator, problems);
    return <Card>
       <Card.Body>
       Name <input type="text" value={name} onChange={(event)=>{ handleChangeName(event.target.value) }} style={{ width:'auto'}} list={datalist}/>
       {knownExp ? expDescriptor(knownExp) : ''}
       {args ? argList(args, knownExp ? knownExp?.params: undefined) : '' }
       <Button variant="primary" size="sm" onClick={handleAdd} className="ms-1"><Icon name="plus"/> Parameter</Button>
       { problems ? renderProblems(problems) : ''}
       </Card.Body>
    </Card>
}

interface ExpressionArgEditorProps {
    onChange: (arg: types.ExpressionArg, index:number)=>void;
    onRemove: (index: number)=>void;
    arg?: types.ExpressionArg;
    descriptor?: ExpressionDescriptorParam
    index: number;
}

export const ExpressionArgEditor: React.FC<ExpressionArgEditorProps> = (props) => {

    const [arg, setArg] = useState<types.ExpressionArg>( props.arg ? props.arg : createTextExp('') );
    
    const [changed, setChanged] = useState(false);

    useEffect(()=>{
        if(changed) {
            props.onChange(arg, props.index);
            setChanged(false);
        }
    }, [changed]);

    const handleChangeType = (d: string)=> {
        const dtype = d as ExpressionArgDType;
        const a : types.ExpressionArg = {dtype: dtype};
        update(a);
    };  

    const update = (a: types.ExpressionArg)=>{
        setArg(a);
        setChanged(true);
    }

    const handleRemove = ()=>{
        props.onRemove(props.index);
    }

    const handleStrChange = (e:React.SyntheticEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        console.log('input change', value);
        const a = { dtype: 'str' as ExpressionArgDType, str: value};
        update(a);
    }

    const handleNumChange = (value: string)=>{
        const v = Number(value);
        const a = { dtype: 'num' as ExpressionArgDType, num: v};
        update(a);
    }

    const handleExpChange = (exp?: types.Expression)=>{
        const a = { dtype: 'exp' as ExpressionArgDType, exp: exp};
        update(a);
    }

    const dtype: ExpressionArgDType = arg.dtype ?? 'str';

    const placeholder = props.descriptor ? props.descriptor.name : undefined;

    const renderArgValue = () => {
        switch(dtype) {
            case 'str':
                return <input type="text" defaultValue={arg.str ?? ''} onChange={handleStrChange} onBlur={handleStrChange} placeholder={placeholder}/>;
           
            case 'num':
                return <input type="number" defaultValue={arg.num ?? ''} onChange={(e) => handleNumChange(e.currentTarget.value)} placeholder={placeholder}/>;
                
            case 'exp':
                return <ExpressionElementEditor onChange={handleExpChange} exp={arg.exp}/> 
        }
    } 

    return <div className="row">
        <div className="col-2">
            <Button variant="danger" onClick={handleRemove} size="sm" className='me-1'><Icon name="trash"/></Button>
            <select  onChange={(ev)=> handleChangeType(ev.currentTarget.value)} style={{width: '6rem' }} defaultValue={dtype}>
                { DTypes.map(o=><option key={o.code} value={o.code}>{o.label}</option>)}
            </select>
            { props.descriptor && props.descriptor.description ? <HelpTip content={props.descriptor.description}/> : '' }
        </div>
        <div className="col-10">
        { renderArgValue() }
        </div>
    </div>
}

interface ExpressionDescriptorComponentProps {
    name: string
    desc: ExpressionDescriptor
}

export const ExpressionDescriptorComponent: React.FC<ExpressionDescriptorComponentProps> = (props) => {
    
    const desc = props.desc;

    const param = (p:ExpressionDescriptorParam, index: number)=>{
        return <ListGroup.Item key={index}>
            <var>{ p.name } {p.variadic ? '...' : ''}</var>
            <p>{p.description}</p>
            { p.allowThis ? <p><code>this</code> is allowed as a value</p> : ''}
        </ListGroup.Item>
    };

    const paramList = (params: ExpressionDescriptorParam[])=>{
        return <ListGroup>
            {params.map(param)}
        </ListGroup>;
    }

    return <Alert variant="info">
        <h5>{props.name}  <Badge bg="info">{desc.kind}</Badge></h5>
        {desc.description ? <p>{props.desc.description}</p> : ''}
        { desc.params && desc.params.length > 0 ? paramList(desc.params)  : ''}
    </Alert>
}

