// todo: не самые удачные паттерны, по возможности надо заменить
const regexp = {
  link: /^https?:\/\/[^\s]+$/,
  title: /^[a-z0-9][a-z0-9-\s]{2,}$/i,
  recipe: /^[a-z0-9][\s\w-\.,:;!'"()]{24,}$/i,
  about: /^[a-z0-9][\s\w\.,"']{24,}$/i,
  measure: /^\d+\s*[a-z]+$/i,
};

export const validationData = {
  drink: {
    pattern: regexp.title,
    message: [
      `Must be at least 3 characters long`,
      `start with a letter or number,`,
      `contain spaces, dashes, numbers and latin letters`,
    ].join(' '),
    maxLen: 150,
  },

  aboutRecipe: {
    pattern: regexp.about,
    message: [
      `Must be at least 25 characters long,`,
      `start with a letter or number,`,
      `contain spaces, numbers, latin letters,`,
      `and the following characters: .,"`,
    ].join(' '),
    maxLen: 350,
  },

  instructions: {
    pattern: regexp.recipe,
    message: [
      `Must be at least 25 characters long,`,
      `start with a letter or number,`,
      `contain spaces, dashes, numbers, latin letters,`,
      `and the following characters: .,:;!"()`,
    ].join(' '),
    maxLen: 2500,
  },

  drinkThumb: {
    pattern: regexp.link,
    message: 'Invalid link',
  },

  measure: {
    pattern: regexp.measure,
    message: [
      `Must consist of a number and a unit of measure.`,
      `For example, 2 oz`,
    ].join(' '),
    minLen: 3,
  },
};
