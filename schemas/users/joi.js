import Joi from 'joi';
import { validationMap } from '../../constants/index.js';
import { setJoiShapeTrimAll } from '../../helpers/index.js';

const { name, email, password } = validationMap;

// token приходит в заголовке, а не в body
// Тут он не нужен

const shape = {
  name: Joi.string()
    .required()
    .pattern(name.pattern)
    .messages({ '*': `{{#label}}: ${name.message}` }),

  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .messages({ '*': `{{#label}}: ${email.message}` }),

  password: Joi.string()
    .required()
    .min(password.min)
    .max(password.max)
    .pattern(password.pattern)
    .messages({ '*': `{{#label}}: ${password.message}` }),
};

// добавляем trim всем строковым полям
setJoiShapeTrimAll(shape);

export const schema = {
  signup: Joi.object(shape),

  signin: Joi.object({
    // убираем валидацию длинны пароля в целях безопасности
    password: Joi.string().trim().required(),
    email: shape.email,
  }),

  verifyEmail: Joi.object({
    email: shape.email,
  }),
};
