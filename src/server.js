import { createServer, Model } from "miragejs";

export function makeServer() {
    let server = createServer({
        models: {
            post: Model
        },
    

        seeds(server) {
            const storedPosts = JSON.parse(localStorage.getItem("posts")) || [
                { "id": 1, "title": "Exploring the Future of AI", "author": "Alex Morgan" },
                { "id": 2, "title": "Understanding JavaScript Closures", "author": "Jamie Lee" },
                { "id": 3, "title": "A Guide to Modern CSS Layouts", "author": "Taylor Smith" },
                { "id": 4, "title": "Why TypeScript Matters", "author": "Jordan Blake" },
                { "id": 5, "title": "Building Scalable Web Apps", "author": "Riley Carter" },
                { "id": 6, "title": "Mastering Async Programming", "author": "Casey Nguyen" },
                { "id": 7, "title": "Intro to Neural Networks", "author": "Robin Patel" },
                { "id": 8, "title": "Debugging Like a Pro", "author": "Avery Brooks" },
                { "id": 9, "title": "The Art of Clean Code", "author": "Elliot Rivera" },
                { "id": 10, "title": "Navigating Cloud Architecture", "author": "Dakota Hill" },
                { "id": 11, "title": "React Patterns You Should Know", "author": "Chris Allen" },
                { "id": 12, "title": "Python Tricks for Data Science", "author": "Morgan Diaz" },
                { "id": 13, "title": "Understanding OAuth 2.0", "author": "Jamie Kim" },
                { "id": 14, "title": "A Deep Dive Into Databases", "author": "Riley Ford" },
                { "id": 15, "title": "API Design Best Practices", "author": "Blake Johnson" },
                { "id": 16, "title": "Optimizing Frontend Performance", "author": "Quinn Stone" },
                { "id": 17, "title": "Getting Started with Docker", "author": "Alex Turner" },
                { "id": 18, "title": "Introduction to Machine Learning", "author": "Casey Rogers" },
                { "id": 19, "title": "Security Essentials for Developers", "author": "Jordan Park" },
                { "id": 20, "title": "Unit Testing Strategies", "author": "Taylor Reed" }
            ];
            storedPosts.forEach((post) => server.create("post", post));
        },

        routes() {
            this.namespace = "api"; // your base URL

            // fetch all users
            this.get("/posts", (schema) => {
                return schema.posts.all();
            }, { timing: 1000 });
            // add new user
            this.post("/posts", (schema, req) => {
                const attrs = JSON.parse(req.requestBody);
                const post = schema.posts.create(attrs);
                // Sync to localStorage
                localStorage.setItem("posts", JSON.stringify(schema.posts.all().models));
                return post;
            });
            // fetch specific user
            // this.get("/posts/:id", (schema, req) => {
            //     const id = req.params.id;
            //     return schema.posts.find(id);
            // })
            this.get("/posts", (schema, req) => {
                const searchQuery = req.queryParams.title;
                let posts = schema.posts.all().models;
                if (searchQuery) {
                    posts = posts.filter(p => p.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
                }
                return {posts}
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