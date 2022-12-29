import { ExpressionRegistry, ExpressionSchema, FlagDescriptor } from "../types";
import { registryFromSchema } from "./registry";

import { DefaultSchema } from "./expressions";

const registry = registryFromSchema(DefaultSchema);


export const getDefaultRegistry = (): ExpressionRegistry =>{
   return registry;
} 

export const registerFlag = (name:string, descriptor:FlagDescriptor)=> {
   registry.getKnownFlags().set(name, descriptor);
}