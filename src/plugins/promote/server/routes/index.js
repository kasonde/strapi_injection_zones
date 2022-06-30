const routes = [
  {
    method: "POST",
    path: "/injest",
    handler: "myController.injestContent",
    config: {
      policies: [],
    },
  },
];

module.exports = {
  "content-api": { type: "content-api", routes },
};
