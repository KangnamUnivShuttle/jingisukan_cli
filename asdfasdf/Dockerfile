FROM node:14.18
RUN [ "adduser", "--disabled-password", "-gecos", "", "testuser" ]
USER testuser
WORKDIR /home/testuser/
RUN [ "git", "clone", "https://github.com/KangnamUnivShuttle/plugin_hello_world.git", "." ]
RUN [ "npm", "i" ]
CMD [ "-f", "/dev/null" ]
EXPOSE 5000/tcp
SHELL [ "npm", "start" ]
