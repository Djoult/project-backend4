export const parseBody = async ({ body }, res, next) => {
  Object.keys(body).forEach(key => {
    try {
      body[key] = JSON.parse(body[key]);
    } catch {}
  });

  next();
};
