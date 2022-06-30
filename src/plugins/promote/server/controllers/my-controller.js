"use strict";

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("promote")
      .service("myService")
      .getWelcomeMessage();
  },
  async injestContent(ctx) {
    // const payload = {
    //   slug: "",
    //   data: modifiedData
    // }
    const payload = ctx.request.body;
    const entries = await strapi.entityService.findMany(payload.slug, {
      filters: {
        slug: payload.data.slug,
      },
    });
    if (entries.length == 0) {
      await strapi.entityService.create(payload.slug, {
        data: payload.data,
      });
    } else {
      const entry = entries[0];
      const id = entry.id;
      delete entry.id;
      delete entry.createdAt;
      delete entry.updatedAt;
      delete entry.updatedBy;
      delete entry.createdBy;
      await strapi.entityService.update(payload.slug, id, {
        data: entry,
      });
      return {
        message: "OK",
      };
    }
  },
});
