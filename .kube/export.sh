kubectl get --export svc -o yaml > service.yaml
kubectl get --export hpa -o yaml > pod-autoscaler.yaml
kubectl get --export deploy -o yaml > deployment.yaml