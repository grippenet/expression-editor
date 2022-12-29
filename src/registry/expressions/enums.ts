import { EnumList } from "../../types";

export const Enums: EnumList = {
    "event_type": [
        "SUBMISSION",
        "TIMER",
        "ENTER"
    ],
    "position": [
        "first",
        "last"
    ],
    "participant_status": [
        "active", 
        "inactive", 
        "paused", 
        "finished"
    ],
    "time_unit":[
        "seconds", "minutes", "hours", "days", "weeks", "months", "years",
        "y", "M", "w", "d", "h", "m",  "s", "ms"
    ]
};