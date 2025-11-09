import { createServer, Model } from "miragejs";

export function makeServer() {
    let server = createServer({
        models: {
            user: Model
        },

        seeds(server) {
            server.create("user", { id: 1, name: "Alice" });
            server.create("user", { id: 2, name: "Bob" });
        },

        routes() {
            this.namespace = "api"; // your base URL

            this.get("/users", (schema) => {
                return schema.users.all();
            });

            this.post("/users", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.users.create(attrs);
            });
        },
    });

    return server;
}
