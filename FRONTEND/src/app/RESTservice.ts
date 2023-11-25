export class RestApiCon {
    private url = "http://localhost:8080";
    private endpoint;
    private config;

    constructor(endpoint: string, config: any) {
        this.endpoint = endpoint;
        this.config = config;
    }

    async requestMethod() {
        let response = {
            body: {},
            status: 0
        };
        await fetch(`${this.url}/${this.endpoint}`, this.config)
            .then(data => {
                response.status = data?.status
                return data.json();
            }).then(data => {
                response.body = data;
            })
            .catch(error => {
                console.log(error)
            })
        return response;
    }

}