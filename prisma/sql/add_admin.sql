-- Создание/обновление администратора EcoWorld
-- Пароль по умолчанию: EcoWorldAdmin2026!
-- Хеш bcrypt (rounds=10), совместим с bcryptjs в приложении.
--
-- Свой пароль: из корня web выполните:
--   node -e "console.log(require('bcryptjs').hashSync('ВАШ_ПАРОЛЬ', 10))"
-- и подставьте строку в password_hash ниже.
--
-- Таблица и колонки соответствуют Prisma (model User).

INSERT INTO "User" (
  id,
  name,
  email,
  phone,
  city,
  password_hash,
  role,
  created_at,
  updated_at
)
VALUES (
  'cmadminseed00001ecoworldx',
  'Administrator',
  'admin@ecoworld.local',
  NULL,
  NULL,
  '$2b$10$7g9.HdBYdr0unLnSGqcT2.DMWXvqBst/wgDf4Ita78QQzLjTgL1ue',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  role = 'ADMIN',
  password_hash = EXCLUDED.password_hash,
  updated_at = NOW();
