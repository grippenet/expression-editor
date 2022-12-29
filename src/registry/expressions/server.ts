import { ExpressionListSchema } from "../../types"

export const ServerExpressions: ExpressionListSchema = {
    "checkConditionForOldResponses": {
        "description": "Evaluates the specified condition on old responses",
        "params": [
            {"name":"condition", "description":"condition to check"},
            {"name":"check", "description":"check mode for the condition to match on the found old responses, `all` (true if all match), `any` (true if any old response match)  or a positive number (at least N match the condition)"},
            {"name":"survey", "role":"survey_key", "optional": true},
            {"name": "since", "role":"timestamp", "optional": true, "description":"timestamp to filter for responses that were submitted after this date"},
            {"name": "until", "role":"timestamp", "optional": true, "description": "timestamp to filter for responses that were submitted before this date"}
        ]
    },
    
    "checkSurveyResponseKey": {
        "description": "Checks if a survey key match the one of the survey submitted during the latest event of the participant",
        "params": [
            {"name":"survey", "role":"survey_key"} 
        ]
    },
    "getSurveyKeyAssignedFrom": {
        "description": "returns the date when the specified survey was assigned to the participant as posix timestamp.",
        "params": [
            {"name":"survey", "role":"survey_key"}
        ]
    },
    "getSurveyKeyAssignedUntil": {
        "description": "returns the date when the specified survey was assigned to the participant as posix timestamp.",
        "params": [
            {"name":"survey", "role":"survey_key"}
        ]
    },
    "hasParticipantFlag": {
        "description": "checks if the participant has the specified flag",
        "params": [
            {"name":"flag", "role":"flag_key"}
        ]
    },
    "hasParticipantFlagKey": {
        "description": "Check participant flags object if contains the specified key value pair",
        "params": [
            {"name": "key", "role":"flag_key"}
        ]
    },
    "hasParticipantFlagKeyAndValue": {
        "description": "Check participant flags object if contains the specified key value pair",
        "params": [
            {"name": "key", "role":"flag_key"},
            {"name": "value"}
        ]
    },
    "hasStudyStatus": {
        "description": "checks if the participant has the specified status",
        "params": [
            {"name":"status", "role":"participant_status"}
        ]
    },
    "hasSurveyKeyAssigned": {
        "description": "checks if the specified survey key is included in the keys of the surveys assigned to the participant.",
        "params": [
            {"name":"survey", "role":"survey_key"}
        ]
    },
    "lastSubmissionDateOlderThan": {
        "kind":"server",
        "description": "checks if the participant has the specified flag",
        "params": [
            {"name":"time", "role":"timestamp"},
            {"name":"survey", "role":"survey_key"}
        ]
    },
    "getStudyEntryTime": {
        "description": "returns the time (as posix time stamp) the participant entered the study",
        "params": []
    },
}

const TODO = [
   "externalEventEval",
   "getMessageNextTime",
   "hasResponseKeyWithValue",
   "hasMessageTypeAssigned",
   "hasResponseKey",
   "getParticipantFlagValue",
  "getSelectedKeys"
]