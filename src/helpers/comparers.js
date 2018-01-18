export function equalKeys(first, second) {
    if (first === second || (!first && !second)) {
        return true;
    }
    if (!first || !second) {
        return false;
    }
    for (let key in first) {
        if (!second.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}