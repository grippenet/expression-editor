
import { ExpressionListSchema } from "../../types"

export const CommonExpressions: ExpressionListSchema = {
    "timestampWithOffset":{
        "kind": "both",
        "params": [
            {"name": "offset", "role":"timestamp"},
            {"name": "ref", "role":"timestamp"}
        ]
    },
    "responseHasOnlyKeysOtherThan": {
        "description": "checks if the participant has selected none of the specified response item keys.",
        "params": [
            {"name":"item", "role":"item_key"},
            {"name":"rg", "role":"rg_comp_prefix"},
            {"name":"component", "role":"rg_comp_key", "variadic": true}
        ],
        "roles": [
            {"role": "item_path", "params": {"item_key": "item", "path": ["rg", "component"]}}
        ]
    },
    "getResponseValueAsNum": {
        "description": "returns the entered numerical value of the specified response group item.",
        "params": [
            {"name":"item", "role":"item_key"},
            {"name":"rg", "role":"rg_key"}
        ],
        "roles": [
            {"role": "item_path", "params": {"item_key": "item", "path": ["rg"]}}
        ]
    },
    "getResponseValueAsStr": {
        "description": "returns the entered string value of the specified response group item.",
        "params": [
            {"name":"item", "role":"item_key"},
            {"name":"rg", "role":"rg_key"}
        ],
        "roles": [
            {"role": "item_path", "params": {"item_key": "item", "path": ["rg"]} }
        ]
    },
    "countResponseItems": {
        "description": "Counts the number of selected response items of a response group.",
        "kind":"both",
        "params": [
            {"name":"item", "role":"item_key"},
            {"name":"rg", "role":"rg_key"}
        ],
        "roles": [
            {"role":"item_path", "params": {"item_key": "item", "path": ["rg"]} }
        ]
    },
    "responseHasKeysAny": {
        "description": "checks if the participant has selected any of the specified item keys.",
        "kind":"both",
        "params": [
            {"name":"item", "role":"item_key"},
            {"name":"rg", "role":"rg_comp_prefix"},
            {"name":"component", "role":"rg_comp_key"}
        ],
        "roles": [
            {"role": "item_path", "params": {"item_key": "item", "path": ["rg","component"]}}
        ]
    },
    "eq": {
        "description": "test if operands are equals",
        "params": [
            { "name": "left" },
            { "name": "right" }
        ]
    },
    "lt": {
        "description": "test if left is lower than right operand",
        "params": [
            { "name": "left" },
            { "name": "right" }
        ]
    },
    "lte": {
        "description": "test if left is lower or equal than right operand",
        "params": [
            { "name": "left" },
            { "name": "right" }
        ]
    },
    "gt": {
        "description": "test if left is greater than right operand",
        "params": [
            { "name": "left" },
            { "name": "right" }
        ]
    },
    "gte": {
        "description": "test if left is greater or equal than right operand",
        "params": [
            { "name": "left" },
            { "name": "right" }
        ]
    },
    "or": {
        "description": "test if any of arguments is true",
        "params": [
            { "name": "args", "variadic": true }
        ]
    },
    "and": {
        "description": "test if all of arguments are true",
        "params": [
            { "name": "args", "variadic": true }
        ]
    },
    "not": {
        "description": "logical not of its argument",
        "params": [
            { "name": "arg" }
        ]
    },
};