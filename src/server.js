import { createServer, Model } from "miragejs";

export function makeServer() {
    let server = createServer({
        models: {
            user: Model
        },
    

        seeds(server) {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Nancy" }, { id: 4, name: "John" }];
            storedUsers.forEach((user) => server.create("user", user));
        },

        routes() {
            this.namespace = "api"; // your base URL

            // fetch all users
            this.get("/users", (schema) => {
                return schema.users.all();
            }, { timing: 4000 });
            // add new user
            this.post("/users", (schema, req) => {
                const attrs = JSON.parse(req.requestBody);
                const user = schema.users.create(attrs);
                // Sync to localStorage
                localStorage.setItem("users", JSON.stringify(schema.users.all().models));
                return user;
            });
            // fetch specific user
            this.get("/users/:id", (schema, req) => {
                const id = req.params.id;
                return schema.users.find(id);
            })
            // update user records
            this.put("/users/:id", (schema, req) => {
                const id = req.params.id;
                const user = schema.users.find(id);
                const newAttrs = JSON.parse(req.requestBody);
                const newUser = user.update(newAttrs);
                localStorage.setItem("users", JSON.stringify(schema.users.all().models));
                return newUser;
            })
            // delete user record
            this.delete("/users/:id", (schema, req) => {
                // get the deletable user's id
                const id = req.params.id;
                const deletedUser = schema.users.find(id).destroy();
                // Sync to localStorage
                localStorage.setItem("users", JSON.stringify(schema.users.all().models));
                return deletedUser;
            })
        },
    });

    return server;
}


// get all users
// /api/users (set(data.users))

// get specific user
// /api/users/(id here)

// add new user
// POST /api/users/ r{
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(data)
// }

// update user
// PUT/PATCH /api/user/(id here) {
//   method: "PUT",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ name: user.name }) no id included
// }

// delete user
// DELETE /api/user/(id here) {
//   method: "DELETE"
// }