
  # Dockerfile for WLCompetency Angular project
  FROM node:14 as build
  
  WORKDIR /app
  
  COPY . .
  
  RUN npm install
  RUN npm run build --prod
  
  FROM nginx:alpine
  
  COPY --from=build /app/dist/WLCompetency /usr/share/nginx/html
  
  EXPOSE 80
