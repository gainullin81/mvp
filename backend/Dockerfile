# 1. Базовый образ
FROM node:20-alpine

# 2. Рабочая директория
WORKDIR /app

# 3. Копируем package.json и package-lock.json
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем исходники
COPY . .

# 6. Генерируем Prisma клиент (если используется)
RUN npx prisma generate

# 7. Собираем проект
RUN npm run build

# 8. Открываем порт
EXPOSE 3000

# 9. Запуск приложения
CMD ["npm", "run", "start:prod"] 