FROM node:lts-alpine AS build
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci
COPY ["src/", "./src"]
COPY ["nest-cli.json", "tsconfig.json", "tsconfig.build.json", "./"]
RUN npm run build

FROM build AS test
RUN ["npm", "run", "test"]

FROM node:lts-alpine AS prod
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "run", "start:prod"]