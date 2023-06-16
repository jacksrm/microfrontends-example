FROM node:lts-alpine as build
WORKDIR /build
COPY . ./
RUN yarn install
RUN yarn build


# COPY . /usr/share/nginx/html
FROM nginx:alpine
RUN rm -v /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]