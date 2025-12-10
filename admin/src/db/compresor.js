export class Compresor {

    async getImage(url) {
        return fetch(url);
    }

    makeBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // contiene el base64
            reader.onerror = reject;
            reader.readAsDataURL(blob); // convierte a base64
        });
    }

        zipImage(blob) {
            return new Promise((res, rej) => {
                const canvas = document.createElement('canvas');
                const imagen = new Image();
                imagen.onload = () => {
                    canvas.width = imagen.width;
                    canvas.height = imagen.height;
                    canvas.getContext('2d').drawImage(imagen, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob === null) {
                            return rej(blob);
                        } else {
                            blob.name = 'a.png';
                            res(blob);
                        }
                    }, 'image/webp', 0.4);
                }
                imagen.src = URL.createObjectURL(blob);
            })
        }
    }