// Converts encoded component to raw binary data held in a string
export default function dataURItoBlob(dataURI){
    var byteString;

    if(dataURI.split(",")[0].indexOf("base64") >= 0){
        byteString = atob(dataURI.split(",")[1]);
    } else {
        byteString = unescape(dataURI.split(",")[1]);
    }

    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // Write string bytes to an array
    var ia = new Uint8Array(byteString.length);
    for(var i = 0; i < byteString.length; i++){
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}