FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bunx prisma generate

EXPOSE 8000

CMD ["bun", "run", "start"]
