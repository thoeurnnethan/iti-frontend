
const CryptoJS = (window as any).CryptoJS;

class Utils {

    constructor() {
        //
    }

    /**
    * set data local storage (optional encrypt)
    * @param {string} key
    * @param {any} data
    * @param {boolean} isEncryptValue default value false
    */
    public setDataStorage(key: string, data: any, isEncryptValue = false) {
        if (isEncryptValue) {
            const myKey = this.getEncryptedLocalStorageKey(key);
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key);
            return localStorage.setItem(myKey, encrypted)
        }
        return localStorage.setItem(key, JSON.stringify(data))
    }

    /**
       * remove data local storage
       * @param {string} key
       */
    public removeDataStorage(key: string, isEncryptValue = false) {
        if (isEncryptValue) {
            const myKey = this.getEncryptedLocalStorageKey(key);
            return localStorage.removeItem(myKey)
        }
        return localStorage.removeItem(key)
    }

    /**
    * get data local storage (optional encrypt)
    * @param {string} key
    * @param {boolean} isEncryptValue default value false
    */
    public getDataStorage(key: string, isEncryptValue = false) {
        const myKey = this.getEncryptedLocalStorageKey(key);
        const data = localStorage.getItem(myKey);

        if (isEncryptValue && data) {
            const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted)
        }

        if (data) {
            let resData: any;
            try {
                const parsedData = JSON.parse(data);
                resData = parsedData
            } catch (error) {
                resData = data
            }
            return resData
        }
    }

    private getEncryptedLocalStorageKey(key: string) {
        let myKey: string;
        switch (key) {
            case 'userInfo':
                myKey = 'SECITI'
                break;

            case 'id_token':
                myKey = 'LSID'
                break;

            default:
                myKey = key
                break;
        }
        return myKey;
    }

}

export default Utils;