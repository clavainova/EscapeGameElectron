export class Storage {

    static instance = undefined;
    apiUrl = '';
    _authData;
    _jwt = ''

    constructor() {
        window.ipcRenderer.on('init', (event, conf) => {
            this.apiUrl = conf.API_URL;
            console.log(this.apiUrl);
        });
    }

    static getInstance() {
        if (Storage.instance === undefined) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }


    setJwt(jwt) {
        this.jwt = jwt;
    }

    setAuthData(auth) {
        this.auth = auth;
    }

    getJwt() {
        return this.jwt;
    }

    getAuthData() {
        return this._authData;
    }
}