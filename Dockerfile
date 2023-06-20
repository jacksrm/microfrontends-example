FROM node:lts-alpine as pre-build
RUN npm i -g pnpm

FROM pre-build as build
ARG BUILD_APP_NAME
ARG BUILD_WORKSPACE_NAME
WORKDIR /build
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY ./$BUILD_WORKSPACE_NAME/$BUILD_APP_NAME ./$BUILD_WORKSPACE_NAME/$BUILD_APP_NAME
RUN pnpm install 
RUN pnpm build

# COPY . /usr/share/nginx/html
FROM nginx:alpine as deploy
ARG BUILD_APP_NAME
ARG BUILD_WORKSPACE_NAME
RUN rm -v /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY --from=build /build/$BUILD_WORKSPACE_NAME/$BUILD_APP_NAME/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]