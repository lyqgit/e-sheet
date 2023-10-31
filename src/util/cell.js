
export function transformNumToLabel(num) {
    if(num>26){
        if(num%26===0){
            return String.fromCharCode(64 + parseInt((Math.floor(num/26)-1).toFixed(0)))+String.fromCharCode(64 + 26)
        }else{
            return String.fromCharCode(64 + parseInt((Math.floor(num/26)).toFixed(0)))+String.fromCharCode(64 + num%26)
        }
    }else{
        return String.fromCharCode(64 + num)
    }
}