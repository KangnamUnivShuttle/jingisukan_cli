FROM node:14.18
  ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date
RUN [ "npm", "install", "pm2@5.1.2", "-g" ]
RUN [ "adduser", "--disabled-password", "-gecos", "", "testuser" ]
USER testuser
WORKDIR /home/testuser/
RUN [ "git", "clone", "https://github.com/KangnamUnivShuttle/plugin_hello_world.git", "./app" ]
WORKDIR /home/testuser/app
RUN [ "npm", "i" ]
COPY ecosystem.config.js /home/testuser/app/ecosystem.config.js
EXPOSE 15000/tcp
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]
