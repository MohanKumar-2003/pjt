project_name: wlcompetency
version: 1.0
author: Vijay

docker_credentials:
  username: avanthika09
  password: Demo@1234

dockerfile_content: |
  # Dockerfile for WLCompetency Angular project
  FROM node:14 as build
  
  WORKDIR /app
  
  COPY . .
  
  RUN npm install
  RUN npm run build --prod
  
  FROM nginx:alpine
  
  COPY --from=build /app/dist/WLCompetency /usr/share/nginx/html
  
  EXPOSE 80
