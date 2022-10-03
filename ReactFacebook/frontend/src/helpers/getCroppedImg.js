export const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        // Needed to avoid cross-origin issues
        image.setAttribute("crossOrigin", "anonymous"); 
        image.src = url;
    });

export function getRadianAngle(degreeValue){
    return (degreeValue * Math.PI) / 180;
}

// Return the new bounding area of a triange
export function rotateSize(width, height, rotation){
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}