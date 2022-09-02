FROM denoland/deno:latest

EXPOSE 8000

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . .

USER deno
RUN deno cache ./src/server.ts
CMD ["run", "--allow-read", "--allow-net", "--unstable", "src/server.ts"]
