#!/bin/bash
if [[ -f ~/projects/golang ]]; then
	mkdir -p ~/projects/golang
fi

cd src

export GOPATH=~/projects/golang
go get golang.org/x/net/websocket
go build app.go
