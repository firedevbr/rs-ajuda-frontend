FROM node:alpine as build-stage
# set working directory
WORKDIR /app
# add /app/node_modules/.bin` to $PATH
ARG VUE_APP_NAME
ARG VUE_APP_BASE_API
ARG VUE_APP_VERSION
ARG VUE_APP_PUPLIC_PATH
ARG VUE_APP_LOGIN_TYPE
ENV VUE_APP_NAME $VUE_APP_NAME
ENV VUE_APP_BASE_API $VUE_APP_BASE_API
ENV VUE_APP_VERSION $VUE_APP_VERSION
ENV VUE_APP_PUPLIC_PATH $VUE_APP_PUPLIC_PATH
ENV VUE_APP_LOGIN_TYPE $VUE_APP_LOGIN_TYPE
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --force
#RUN yarn add react-scripts@5.0.1
COPY ./ ./
RUN npm run build

# Stage 1, based on Nginx
FROM nginx:1.23 as nginx
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
