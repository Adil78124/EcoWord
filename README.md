# EcoWorld Kazakhstan

Официальный веб-сайт экологической платформы **EcoWorld** — дипломный проект на Next.js с публичными страницами, формами для волонтёров и панелью администратора.

## Требования

- [Node.js](https://nodejs.org/) **20 LTS** или новее (рекомендуется 20.x)
- [PostgreSQL](https://www.postgresql.org/) 14+ (локально или облачный инстанс)
- npm (устанавливается вместе с Node.js)

## Быстрый старт

### 1. Скачать и открыть проект

Склонируйте репозиторий или распакуйте архив. Рабочая папка приложения — каталог **`web`** (в нём лежат `package.json`, `app`, `prisma`).

```bash
cd web
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить окружение

Скопируйте пример файла переменных:

```bash
copy .env.example .env
```

На macOS / Linux:

```bash
cp .env.example .env
```

Заполните в `.env` (файл **не публикуется** в Git):

| Переменная | Описание |
|------------|----------|
| `DATABASE_URL` | Строка подключения PostgreSQL, например `postgresql://user:password@localhost:5432/ecoworld` |
| `JWT_SECRET` | Секрет для сессий (не короче 16 символов) |
| `ADMIN_PANEL_ENABLED` | `true` — включить панель `/admin` |
| `NEXT_PUBLIC_APP_URL` | Опционально: URL сайта в production |

### 4. База данных

Примените миграции Prisma:

```bash
npx prisma migrate deploy
npx prisma generate
```

При первом запуске создайте пользователя с ролью **ADMIN** в PostgreSQL (см. `prisma/sql/add_admin.sql` или регистрацию через `/register` с последующим изменением роли в БД).

### 5. Запуск в режиме разработки

```bash
npm run dev
```

Откройте в браузере:

- Сайт: [http://localhost:3000](http://localhost:3000)
- Админ-панель: [http://localhost:3000/admin](http://localhost:3000/admin) (нужен вход под пользователем с ролью ADMIN)

### 6. Production-сборка

```bash
npm run build
npm start
```

## Основные страницы

| URL | Описание |
|-----|----------|
| `/` | Главная |
| `/problems` | Экологические проблемы |
| `/problems/air-pollution` и др. | Детальные страницы проблем |
| `/solutions` | Решения и проекты |
| `/volunteers` | Волонтёры |
| `/about` | О проекте |
| `/help` | Помощь и пожертвования |
| `/sources` | Источники и отчёты |
| `/privacy` | Политика конфиденциальности |
| `/terms` | Условия использования |
| `/admin` | Панель администратора |

Языки интерфейса: **RU** / **KZ** (переключатель в шапке сайта).

## Структура проекта

```
web/
├── app/              # Страницы и API (Next.js App Router)
├── components/       # UI-компоненты и секции
├── lib/              # Утилиты, i18n, Prisma, авторизация
├── prisma/           # Схема БД и миграции
├── public/           # Статические файлы (при необходимости)
├── middleware.ts     # Защита /admin
├── package.json
├── .env.example
└── README.md
```

## Скрипты npm

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Локальный сервер разработки |
| `npm run build` | Сборка для production |
| `npm start` | Запуск собранного приложения |
| `npm run lint` | Проверка ESLint |
| `npm run prisma:migrate` | Миграции в dev |
| `npm run prisma:studio` | Просмотр данных в Prisma Studio |

## Деплой (Vercel)

1. Подключите репозиторий к [Vercel](https://vercel.com).
2. Укажите корень проекта: **`web`**.
3. Добавьте переменные окружения из `.env.example` в настройках проекта.
4. После деплоя выполните `npx prisma migrate deploy` к production-БД.

**Не загружайте в Git:** `.env`, `.env.local`, `node_modules`, `.next`.

## Лицензия и авторство

Дипломный проект. © EcoWorld Kazakhstan.
