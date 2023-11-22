export class RestApiCon {
    private url = "http://localhost:8080";
    private endpoint;
    private config;

    constructor(endpoint: string, config: any) {
        this.endpoint = endpoint;
        this.config = config;
    }

    async requestMethod() {
        await fetch(`${this.url}/${this.endpoint}`, this.config).then(data => {
            console.log(data.json());
            console.log("cock");
            return data.json();
        })
    }

}