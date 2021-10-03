# jingisukan_cli
Cli that manage chat plugin docker container

```bash
stories2@gimhyeon-uui-MacBookPro jingisukan_cli % jingisukan --help
Usage: jingisukan <command> [options]

명령:
  jingisukan env         Create .env file
  jingisukan ecosystem   Create ecosystem.config file
  jingisukan dockerfile  Create dockerfile file
  jingisukan new         Create docker-compose.yaml with param
  jingisukan service     Control docker container status using docker-compose
  jingisukan status      Get status of container
  jingisukan rmi         Remove docker image
  jingisukan prune       Docker prune

옵션:
  --help     도움말을 보여줍니다                                          [여부]
  --version  버전 넘버를 보여줍니다                                       [여부]
stories2@gimhyeon-uui-MacBookPro jingisukan_cli % 
```


```
jingisukan new --cpu=0.1 --ram=128M --name=asdfasdf --port=10000 --path='.'
```

```
jingisukan dockerfile --url=https://github.com/KangnamUnivShuttle/plugin_hello_world.git --name=asdfasdf --path=.
```

```
jingisukan service --name=asdfasdf --path=. --status=start
```

```
jingisukan ecosystem --name=asdfasdf --path=.
```

### TIP

https://stackoverflow.com/questions/39468841/is-it-possible-to-start-a-stopped-container-from-another-container