# udemy-microservices

https://www.udemy.com/course/microservices-with-node-js-and-react/

# Docker Commands & Basics

- `docker run busybox` downloads (if needed), creates the container and runs it.
- `docker run busybox COMMAND` same as above but runs with default command.
- `docker run -d busybox` same as above but runs in background.
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
- `docker run -p PORT:CPORT ID123` runs the container with port mapping, mapping the PORT to the container CPORT.
- `docker build -t TAG` builds a dockerfile with the selected tag. It should be formatted as so: `author/name:version` e.g. `pallimoon/mycontainer:0.0.1`. Version is optional.
- `docker push TAG` attempt to push the image with the selected tag to dockerhub.

While inside the container shell ctrl+C can be used to terminate process, ctrl+d or \'exit\' can be used to exit the shell entirely.

Containers are isolated from each other unless explicitly configured. If you create a file in one of two identical containers the other one will not have access to it.

**NOTE:** A default command can not be changed once set, you have to create a new container to have a different default command.

See [here](redis-image/README.md) for build and image making commands.

# Kubernetes

- `kubectl apply -f asdf.yaml` process config file.
- `kubectl apply -f k8s` can also be applied to directories.
- `kubectl get pods` lists pods. Similar to `docker ps`.
- `kubectl get deployments` lists deployments.
- `kubectl get services` lists services.
- `kubectl get services -n NAMESPACE` gets services in specific namespace.
- `kubectl exec -it PODNAME -- COMMAND` run a command in the pod. Similar to `docker exec`.
- `kubectl logs PODNAME` retrieves STDOUT logs from the pod. Similar to `docker logs`.
- `kubectl delete pod PODNAME` deletes given pod.
- `kubectl delete deployment DEPLNAME` deletes given deployment.
- `kubectl describe pod PODNAME` prints some information about the pod.
- `kubectl describe deployment DEPLNAME` prints some information about the deployment.
- `kubectl describe service SERVNAME` prins some information about the service.
- `kubectl rollout restart deployment DEPLNAME` rolls out and restarts the deployment. Can be used to apply changes to a pod with the _latest_ tag.
- `kubectl create secret generic jwt-secret --from-literal=jwt=asdf` creates a secret instance (similar to pod) with the name _jwt-secret_ that has the key-value _jwt=asdf_. **Should absolutely not be added to source control!**
- `kubectl get secrets` lists secret instances.
- `kubectl get namespace` lists namespaces.
- `kubectl port-forward PODNAME PORTFROM:PORTTO` forwards PORTFROM to PORTTO on the PODNAME temporarily without having to create a configuration. Stops forwarding when hitting CTRL+C.

Secrets - note that a deployment/pod will fail creation if referencing a secret that does not exist.

# Gitbash Alias

`code ~/.bashrc` to edit gitbashrc file and add `alias k="kubectl"` to alias _kubectl_ to _k_.

# Ingress-nginx

Install ingress-nginx:
https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

# Skaffold

Install Skaffold at:
https://skaffold.dev/
Easiest to use Chocolatey for Windows installation.

Run `skaffold dev` to build entire cluster with file watchers!
If installed with Chocolatey, ctrl+c will not clean up automatically afterwards. Run `skaffold delete` to clean up manually.

# Create-react-app env variables

```
ENV CI=true
ENV WDS_SOCKET_PORT=0
```

These environment variables are necessary to host an app created using create-react-app in a docker container.
