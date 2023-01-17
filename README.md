# udemy-microservices

https://www.udemy.com/course/microservices-with-node-js-and-react/

# Docker Commands & Basics

- `docker run busybox` downloads (if needed), creates the container and runs it.
- `docker run busybox COMMAND` same as above but runs with default command.
- `docker ps` list running containers.
- `docker ps --all` list all containers.
- `docker create busybox` creates container and returns id. Does not run it.
- `docker create busybox COMMAND` same as above but creates container with default command.
- `docker start ID123` runs the container with id. Ignores STDOUT.
- `docker start -a ID123` same as above but displays STDOUT.
- `docker system prune` removes stopped containers, clears build cache.
- `docker logs ID123` retrieves STDOUT logs from container with id. Can be used to check output of a container that was started without _-a_.
- `docker stop ID123` sends terminate signal to the container allowing it ~10 sec to shut down. The process is killed after that time.
- `docker kill ID123` kills the container process immediately.
- `docker exec ID123 COMMAND` executes command in the container with id. Shows no output. Almost always used with _-it_ flag.
- `docker exec -it ID123 COMMAND` same as above, but enters the container and allows the user more input and interaction.
- `docker exec -it ID123 sh` enter the containers shell, allowing full control inside it.
- `docker run -it busybox sh` runs the container and launches straight into the shell. It is usually better practice to do this in steps; create container with default command, start it and then execute into shell.

While inside the container shell ctrl+C can be used to terminate process, ctrl+d or \'exit\' can be used to exit the shell entirely.

Containers are isolated from each other unless explicitly configured. If you create a file in one of two identical containers the other one will not have access to it.

**NOTE:** A default command can not be changed once set, you have to create a new container to have a different default command.

See [here](redis-image/README.md) for build and image making commands.
