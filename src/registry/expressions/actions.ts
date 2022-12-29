import { ExpressionListSchema } from "../../types"

export const ActionExpressions: ExpressionListSchema = {
    "IF": {
        "kind":"action",
        "description":"control flow implementing the typical if-else structure, if condition evaluated to true then action is run, action_else otherwise",
        "params":[
            {"name":"condition", "description":"condition to check"},
            {"name":"action_true", "description":"action run if condition is true"},
            {"name":"action_else", "description":"action run if condition is not true"}                
        ]
    },
    "DO": {
        "description":"Performs a list of actions by iterating through the `actions` parameters. This function can be used to group actions together as a defined list of arguments.",
        "kind":"action",
        "params":[{"name":"actions", "variadic": true}]
    },
    "IFTHEN": {
        "description":"perform a list of actions if condition is evaluated to `true`",
        "kind":"action",
        "params":[
            {"name": "condition", "description":"condition to check"}, 
            {"name":"actions", "variadic":true, "description":"actions to run if condition is evaluated to true"}
        ]
    },
    "UPDATE_FLAG": {
        "description":"Updates one flag of the participant state.",
        "kind":"action",
        "params":[
            {"name":"key", "role":"flag_key", "description":"name of the flag"}, 
           { "name": "value", "description":"value to assign to the flag"}
        ]
    },
    "REMOVE_FLAG": {
        "description":"Remove one flag of the participant state.",
        "kind":"action",
        "params":[{"name":"key", "role":"flag_key"}]
    },
    "UPDATE_STUDY_STATUS": {
        "description": "Updates the status of the participant (e.g. from active to inactive).",
        "kind":"action",
        "params":[{"name": "status", "role":"study_status"}]
    },
    "ADD_NEW_SURVEY": {
        "kind":"action",
        "description":"assign a new survey to the participant",
        "params": [
            {"name":"survey", "role":"survey_key"}
        ]
    },
    "REMOVE_ALL_SURVEYS": {
        "kind":"action",
        "description":"Remove all survey assigned to a participant",
        "params": [],
        "comment": "No argument"
    },
    "REMOVE_SURVEY_BY_KEY": {
        "kind":"action",
        "description":"Remove survey assigned to a participant by key",
        "params":[
            {"name": "key", "role":"survey_key"},
            {"name":"position", "role": "position"}
        ]
    },
    "REMOVE_SURVEYS_BY_KEY": {
        "description": "Removes all surveys with the specified key in the list of assigned surveys of the participant state.",
        "kind":"action",
        "params":[
            {"name": "survey", "role":"survey_key"}
        ]
    },
    "ADD_REPORT": {
        "kind":"action",
        "description": "Add response item to the response object",
        "params": [
            {"name":"item_key", "role":"item_key"}
        ]
    },
    "REMOVE_ALL_REPORTS": {
        "kind":"action",
        "description":"Remove all reports in response object",
        "params": [],
        "comment":"No argument"
    },
    "REMOVE_REPORT_BY_KEY": {
        "params": [
            {"name":"item", "role":"item_key"},
            {"name":"position", "role":"position"}
        ],
        "kind":"action"
    },
    "REMOVE_REPORTS_BY_KEY": {
        "params":[ {"name":"item", "role":"item_key"}],
        "kind":"action"
    },
    "LAST_RESPONSES_BY_KEY": {
        "kind": "action",
        "params": []
    },
    "ALL_RESPONSES_SINCE": {
        "kind": "action",
        "params": []
    },
    "RESPONSES_SINCE_BY_KEY": {
        "kind": "action",
        "params": []
    },
    "GET_LAST_SURVEY_ITEM": {
        "kind": "action",
        "params": []
    },
    "checkEventType": {
        "description":"Checks if the latest event is of the same type as specified in the parameter expression.",
        "kind":"action",
        "params":[
            {"name":"type", "role": "event_type"}
        ]
    },
}