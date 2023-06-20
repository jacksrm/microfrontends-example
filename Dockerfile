FROM node:lts-alpine as build
ARG BUILD_APP_NAME
ARG BUILD_WORKSPACE_NAME
WORKDIR /build
COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY ./$BUILD_WORKSPACE_NAME/$BUILD_APP_NAME ./$BUILD_WORKSPACE_NAME/$BUILD_APP_NAME
RUN yarn install --network-timeout 1000000
RUN yarn build


# COPY . /usr/share/nginx/html
FROM nginx:alpine
ARG BUILD_APP_NAME
ARG BUILD_WORKSPACE_NAME
RUN rm -v /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY --from=build /build/$BUILD_WORKSPACE_NAME/$BUILD_APP_NAME/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]