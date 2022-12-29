import { ExpressionSchema, ExpressionListSchema } from "../../types";

import { ActionExpressions } from "./actions";
import { ClientExpressions } from "./client";
import { ServerExpressions } from "./server";
import { CommonExpressions } from "./common";
import { Enums } from "./enums";

const withKind = (exps: ExpressionListSchema, kind: string):ExpressionListSchema => {
    const o = Object.entries(exps).map(entry => {
        entry[1].kind = kind;
        return entry;
    });
    return Object.fromEntries(o);
}

export const DefaultSchema : ExpressionSchema = {
    engineVersion: '1.2.0',
    expressions: {
        ...withKind(ActionExpressions, 'actions'),
        ...withKind(CommonExpressions, 'both'),
        ...withKind(ClientExpressions, 'client'),
        ...withKind(ServerExpressions, 'server')
    },
    enums: Enums,
}