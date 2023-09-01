import { isValidEmail } from '../helpers/index.js';

import {
  TITLE_MAX_LEN,
  ABOUT_MAX_LEN,
  INSTRUCTIONS_MAX_LEN,
  MEASURE_MIN,
  PASSWORD_MIN,
} from './misc.js';

const regexp = {
  link: /^https?:\/\/[^\s]+$/,
  title: /^[a-z0-9][a-z0-9-\s\.]{2,}$/i,
  instructions: /^[a-z0-9][\s\w-\.,:;!'"()\n\r]{24,}$/i,
  about: /^[a-z0-9][\s\w\.,"']{24,}$/i,
  measure: /^\d+\s*[a-z]+$/i,
  name: /^\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$/,
};

const title = {
  pattern: regexp.title,
  message: [
    `Must be at least 3 characters long`,
    `start with a letter or number,`,
    `contain spaces, dashes, numbers, dots and latin letters`,
    `(e.g. "Irish Coffee" or "7-Up")`,
  ].join(' '),
  max: TITLE_MAX_LEN,
};

const thumb = {
  pattern: regexp.link,
  message: 'Valid link expected',
};

const recipeFields = {
  title,
  thumb,

  drink: title,

  aboutRecipe: {
    pattern: regexp.about,
    message: [
      `Must be at least 25 characters long,`,
      `start with a letter or number,`,
      `contain spaces, numbers, latin letters,`,
      `and the following characters: .,"`,
    ].join(' '),
    max: ABOUT_MAX_LEN,
  },

  instructions: {
    pattern: regexp.instructions,
    message: [
      `Must be at least 25 characters long,`,
      `start with a letter or number,`,
      `contain spaces, dashes, numbers, latin letters,`,
      `and the following characters: .,:;!"()`,
    ].join(' '),
    max: INSTRUCTIONS_MAX_LEN,
  },

  drinkThumb: thumb,

  measure: {
    pattern: regexp.measure,
    message: [
      `Must be at least 3 characters,`,
      `start with a number followed by a unit of measure`,
      `(e.g. 2 oz)`,
    ].join(' '),
    min: MEASURE_MIN,
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
  },

  email: {
    message: 'Valid email expected',
    validator: isValidEmail,
  },

  password: {
    min: PASSWORD_MIN,
  },
};

export const validationMap = {
  ...recipeFields,
  ...userFields,
};
