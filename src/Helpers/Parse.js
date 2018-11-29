export function TryParseInt(str ,defaultValue) {
    let retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str, 10);
            }
        }
    }
    return retValue;
}
export function TryParseFloat(str ,defaultValue) {
    let retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseFloat(str, 10);
            }
        }
    }
    return retValue;
}