export const parseBody = async ({ body }, res, next) => {
  Object.keys(body).forEach(key => {
    body[key] = JSON.parse(body[key]);
  });

  console.log(body);

  next();
};
