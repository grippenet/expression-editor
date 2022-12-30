/**
 * Export Expression Schema into JSON
 * This script is run after build process and allow expression registry to be reused in other apps
 * 
 */
import { DefaultSchema } from "./registry/expressions";
import fs from 'fs';

fs.writeFileSync('build/schema.json', JSON.stringify(DefaultSchema, undefined, 2));
  
