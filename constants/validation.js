import { isValidEmail } from '../helpers/index.js';

// todo: не самые удачные паттерны,
// по возможности можно заменить
const regexp = {
  link: /^https?:\/\/[^\s]+$/,
  title: /^[a-z0-9][a-z0-9-\s]{2,}$/i,
  recipe: /^[a-z0-9][\s\w-\.,:;!'"()]{24,}$/i,
  about: /^[a-z0-9][\s\w\.,"']{24,}$/i,
  measure: /^\d+\s*[a-z]+$/i,
  name: /^\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$/,
};

const title = {
  pattern: regexp.title,
  message: [
    `Must be at least 3 characters long`,
    `start with a letter or number,`,
    `contain spaces, dashes, numbers and latin letters`,
    `(e.g. "Irish Coffee" or "7-Up")`,
  ].join(' '),
  max: 150,
};

const recipeFields = {
  title,
  drink: title,

  aboutRecipe: {
    pattern: regexp.about,
    message: [
      `Must be at least 25 characters long,`,
      `start with a letter or number,`,
      `contain spaces, numbers, latin letters,`,
      `and the following characters: .,"`,
    ].join(' '),
    max: 350,
  },

  instructions: {
    pattern: regexp.recipe,
    message: [
      `Must be at least 25 characters long,`,
      `start with a letter or number,`,
      `contain spaces, dashes, numbers, latin letters,`,
      `and the following characters: .,:;!"()`,
    ].join(' '),
    max: 2500,
  },

  drinkThumb: {
    pattern: regexp.link,
    message: 'Invalid link',
  },

  measure: {
    pattern: regexp.measure,
    message: [
      `Must be at least 3 characters,`,
      `start with a number followed by a unit of measure`,
      `(e.g. 2 oz)`,
    ].join(' '),
    min: 3,
  },

  ingredients: {
    message: 'Array of objects expected',
  },
};

const userFields = {
  name: {
    pattern: regexp.name,
    message: [
      'First name and last name (optional)',
      'must contain only latin letters,',
      'start with a capital',
      'and be at least 2 characters long',
    ].join(' '),
    normalizer: v => v.replaceAll(/\s+/, ' '),
  },

  email: {
    message: 'Invalid email',
    validator: isValidEmail,
    //normalizer: v => v.toLowerCase(),
  },

  password: {
    min: 6,
  },
};

export const validationMap = {
  ...recipeFields,
  ...userFields,
};
