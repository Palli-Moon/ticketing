# udemy-microservices

https://www.udemy.com/course/microservices-with-node-js-and-react/

# Docker commands

- `docker run busybox` downloads (if needed), creates the container and runs it
- `docker run busybox COMMAND` same as above but runs with default command
- `docker ps` list running containers
- `docker ps --all` list all containers
- `docker create busybox` creates container and returns id. Does not run it
- `docker create busybox COMMAND` same as above but creates container with default command
- `docker start ID123` runs the container with id. Ignores STDOUT
- `docker start -a ID123` same as above but displays STDOUT
- `docker system prune` removes stopped containers, clears build cache
- `docker logs ID123` retrieves STDOUT logs from container with id. Can be used to check output of a container that was started without _-a_
- `docker stop ID123` sends terminate signal to the container allowing it ~10 sec to shut down. The process is killed after that time.
- `docker kill ID123` kills the container process immediately
- `docker exec ID123 COMMAND` executes command in the container with id. Shows no output
- `docker exec -it ID123 COMMAND` same as above, but enters the container and allows the user more input and interaction

**NOTE:** A default command can not be changed once set, you have to create a new container to have a different default command.
