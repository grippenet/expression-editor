import { ExpressionListSchema } from "../../types"

export const ClientExpressions: ExpressionListSchema = {
    "checkResponseValueWithRegex": {
        "description": "Check if a response match the pattern",
        "params": [
            { "name": "item", "role": "item_key" },
            { "name": "response", "role": "rg_full_path" },
            { "name": "pattern" }
        ],
        "roles": [
            { "role": "item_path", "params": { "item_key": "item", "path": ["response"] } }
        ]
    },
    "dateResponseDiffFromNow": {
        "description": "Calculate difference of a selected date input and current timestamp with selected unit",
        "params": [
            { "name": "item_key", "role": "item_key" },
            { "name": "response", "role": "rg_full_path" },
            { "name": "unit", "optional": true, "role": "time_unit" },
            { "name": "unsigned", "optional": true }
        ],
        "roles": [
            { "role": "item_path", "params": { "item_key": "item", "path": ["response"] } }
        ]
    },
    "findPreviousSurveyResponsesByKey": {
        "description": "Retrieve items by the same key from the previous responses arrays",
        "params": [
            { "name": "item_key", "role": "item_key" }
        ]
    },
    "filterResponsesByIncludesKeys": {
        "description": "[@tocheck]search responses with keys",
        "params": [
            { "name": "responsesRef" },
            { "name": "itemKey", }, // "type":"string"
            { "name": "searchKeys", } // "type":"string"
        ]
    },
    "filterResponsesByValue": {
        "description": "@todo",
        "params": [],
    },

    "getArrayItemAtIndex": {
        "description": "Extract value at index in an array",
        "params": [
            { "name": "array" },
            { "name": "index" }
        ]
    },
    "getArrayItemByKey": {
        "params": [
            { "name": "array" },
            { "name": "key" }
        ]
    },
    "getAttribute": {
        "description": "Extract value of an attribute of the referenced object",
        "kind": "client",
        "params": [
            { "name": "item_key", "role": "item_key" },
            { "name": "name" }
        ]
    },
    "getContext": {
        "description": "Reference to the context variable storing e.g. participant infos",
        "params": []
    },
    "getLastFromSurveyItemResponses": {
        "description": "Given a list of previous responses (list of single responses), retrieve the latest one.",
        "params": [
            { "name": "response_list" }
        ]
    },
    "getLastFromSurveyResponses": {
        "description": "Retrieve last item for a specific key from the previous responses arrays",
        "params": [
            { "name": "key", "role": "item_key" }
        ]
    },

    "getNestedObjectByKey": {
        "description": "Extract value with a specific key from the tree",
        "params": [
            { "name": "objectRef" },
            { "name": "item_key", "role": "item_key" }
        ]
    },
    "getObjByHierarchicalKey": {
        "description": "Extract value with a specific key from the hierarchical tree",
        "params": [
            { "name": "item" },
            { "name": "key" }
        ],
        "roles": [
            { "role": "item_path", "params": { "item_key": "item", "path": ["key"] } }
        ]
    },

    "getPreviousResponses": {
        "description": "Retrieve all previous responses for a specific survey key",
        "params": [
            { "name": "key", "role": "item_key" }
        ]
    },
    "getSecondsSince": {
        "description": "Calculate time difference between 'now' and the reference time in seconds",
        "params": [
            { "name": "time", "role": "timestamp" }
        ]
    },
    "getSurveyItemValidation": {
        "description": "To use evaluated validations rules, we can reference them with this method.",
        "params": [
            { "name": "item_key", "role": "item_key", "allow_this": true },
            { "name": "validation", "role": "validation_key" }
        ],
        "roles": [
            { "role": "validation_path", "params": { "item_key": "item", "path": ["response"] } }
        ]
    },


    "getResponseItem": {
        "description": "Get response object for a specific item and slot",
        "params": [
            { "name": "item_key", "role": "item_key" },
            { "name": "response", "role": "rg_full_path" }
        ],
        "roles": [
            { "role": "item_path", "params": { "item_key": "item", "path": ["response"] } }
        ]
    },
    "getRenderedItems": {
        "description": "Reference to the list of currently active survey questions",
        "params": []
    },
    "getResponses": {
        "description": "Reference to the current response array",
        "params": []
    },
    "hasResponse": {
        "description": "Check if an item has a specific response object (by key)",
        "params": [
            { "name": "item", "role": "item_key" },
            { "name": "response", "role": "rg_key" }
        ],
        "roles": [
            { "role": "item_path", "params": { "item_key": "item", "path": ["response"] } }
        ]
    },
    "isDefined": {
        "description": "Evaluates an expression and checks if the return value is defined",
        "params": [
            { "name": "var" }
        ]
    },

    "parseValueAsNum": {
        "description": "Parse the result of an expression as a number",
        "params": [
            { "name": "exp" }
        ]
    },
    "responseHasKeysAll": {
        "description": "Check if all of the following options are selected",
        "params": [
            { "name": "item", "role": "item_key" },
            { "name": "rg", "role": "rg_comp_prefix" },
            { "name": "component", "role": "rg_comp_key" }
        ],
        "roles": [
            { "role": "item_path", "params": { "item_key": "item", "path": ["rg", "component"] } }
        ]
    },
    "sequential":{
        "description": "Make the order of items sequential",
        "kind": "client",
        "params": []
    },
}