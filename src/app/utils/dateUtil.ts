export function convertStrToDate (date: string) {
    return new Date(date).toISOString().split("T")[0];
}

export function getStrActualDate(){
    return new Date().toISOString().split("T")[0];
}