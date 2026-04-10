export const formBuilderResponseSchema = {
    type: "object",
    required: ["stateData", "fields", "ruleWorkflowSequences"],
    properties: {
        stateData: {
            type: "object",
            required: ["vieName", "engName", "code", "submitButtonText", "maxDays", "requireAttachment", "autoApprove", "isActive", "isReductible"],
            properties: {
                vieName: { type: "string" },
                engName: { type: "string" },
                code: { type: "string" },
                submitButtonText: { type: "string" },
                maxDays: { type: "number" },
                requireAttachment: { type: "boolean" },
                autoApprove: { type: "boolean" },
                isActive: { type: "boolean" },
                isReductible: { type: "boolean" },
            },
            additionalProperties: false,
        },
        fields: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["id", "type", "label", "name", "placeholder", "note", "required", "readOnly", "order", "parentId"],
                properties: {
                    id: { type: "string" },
                    type: { type: "string" },
                    label: { type: "string" },
                    name: { type: "string" },
                    placeholder: { type: "string" },
                    note: { type: "string" },
                    required: { type: "boolean" },
                    readOnly: { type: "boolean" },
                    order: { type: "number" },
                    parentId: { anyOf: [{ type: "string" }, { type: "null" }] },
                },
            },
        },
        ruleWorkflowSequences: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["id", "idx", "label", "name", "timeExpected"],
                properties: {
                    id: { type: "string" },
                    idx: { type: "number" },
                    label: { type: "string" },
                    name: { type: "string" },
                    specificUserId: { type: "string" },
                    timeExpected: { type: "string" },
                },
            },
        },
    },
    additionalProperties: false,
}
