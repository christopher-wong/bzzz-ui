.PHONY: all run

VERSION=0.0.2

all:
	docker build -t bzzz-ui:${VERSION} .
	docker tag bzzz-ui:${VERSION} registry.digitalocean.com/teslatrack/bzzz-ui:${VERSION}

deploy:
	docker push registry.digitalocean.com/teslatrack/bzzz-ui:${VERSION}
	kubectl apply -f k8s

run:
	docker run -p 80:80 bzzz-ui:${VERSION}