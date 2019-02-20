FROM node:6
WORKDIR /home/
RUN mkdir graph-demo
WORKDIR /home/graph-demo
COPY . .
RUN npm install
RUN chmod +x start.sh
CMD [ "./start.sh" ]