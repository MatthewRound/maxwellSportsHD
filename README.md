mkdir -p ~/projects/golang
export GOPATH=~/projects/golang
go get golang.org/x/net/websocket
go build app.go
