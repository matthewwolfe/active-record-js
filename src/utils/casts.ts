function toBoolean(value: number|string): boolean {
    switch(value) {
        case 0:
        case '0':
        case 'false':
        case 'FALSE':
            return false;
        case 1:
        case '1':
        case 'true':
        case 'TRUE':
            return true;
        default:
            return null;
    }
}

function toObject(value: string) {
    return JSON.parse(value);
}

export const casts = {
    boolean: toBoolean,
    object: toObject
};
