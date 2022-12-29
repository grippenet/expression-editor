import { ExpressionRegistry, ExpressionSchema } from "../types";
import { registryFromSchema } from "./registry";

import { DefaultSchema } from "./expressions";

export const getDefaultRegistry = (): ExpressionRegistry =>{
   return registryFromSchema(DefaultSchema);
} 