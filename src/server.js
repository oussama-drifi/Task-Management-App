import { createServer, Model } from "miragejs";

export function makeServer() {
    let server = createServer({
        models: {
            post: Model
        },
    

        seeds(server) {
            const storedPosts = JSON.parse(localStorage.getItem("posts")) || [{ id: 1, title: "la boite à merveilles", author: "victor hugo" }, { id: 2, title: "hhhhh", author: "usgfyue"}, { id: 3, title: "heedededed", author: "zehgfyugef" }, { id: 4, title: "dtededed", author: "sdzfzefzef" }];
            storedPosts.forEach((post) => server.create("post", post));
        },

        routes() {
            this.namespace = "api"; // your base URL

            // fetch all users
            this.get("/posts", (schema) => {
                return schema.posts.all();
            }, { timing: 3000 });
            // add new user
            this.post("/posts", (schema, req) => {
                const attrs = JSON.parse(req.requestBody);
                const post = schema.posts.create(attrs);
                // Sync to localStorage
                localStorage.setItem("posts", JSON.stringify(schema.posts.all().models));
                return post;
            });
            // fetch specific user
            this.get("/posts/:id", (schema, req) => {
                const id = req.params.id;
                return schema.posts.find(id);
            })
            // update user records
            this.put("/posts/:id", (schema, req) => {
                const id = req.params.id;
                const post = schema.posts.find(id);
                const newAttrs = JSON.parse(req.requestBody);
                const newPost = post.update(newAttrs);
                localStorage.setItem("posts", JSON.stringify(schema.posts.all().models));
                return newPost;
            })
            // delete user record
            this.delete("/posts/:id", (schema, req) => {
                // get the deletable user's id
                const id = req.params.id;
                const deletedPost = schema.posts.find(id).destroy();
                // Sync to localStorage
                localStorage.setItem("posts", JSON.stringify(schema.posts.all().models));
                return deletedPost;
            })
        },
    });

    return server;
}


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