package main


import (
	"io/ioutil"
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"net/http"
	"bytes"
	"golang.org/x/net/websocket"
)


var connections = []*websocket.Conn{}


func cssHandler(w http.ResponseWriter, r *http.Request) {
	var cssfiles = []string{"lib/Montserrat.css", "custom/app.css"}
	if r.FormValue("p") == "admin" {
		cssfiles = append(cssfiles, "custom/admin.css")
	}
	for i:= 0; i< len(cssfiles); i++ {
		var file = "./css/" + cssfiles[i]
		root, err := ioutil.ReadFile(file)
		if err != nil {
			fmt.Println(err)
			return 
		}
		w.Header().Set("Content-Type", "text/css")
		fmt.Fprintf(w, "%s", string(root))
	}
}


func handler(w http.ResponseWriter, r *http.Request) {
	root, err := ioutil.ReadFile("./layouts/overlay.html")
	if err != nil {
		return
	}
	fmt.Fprintf(w, "%s", string(root))
}


func jsHandler(w http.ResponseWriter, r *http.Request) {
	var jsfiles = []string{"lib/jquery.min.js", "lib/angular.min.js", "custom/app.js", "custom/events.js"}
	if r.FormValue("p") == "admin" {
		jsfiles = append(jsfiles, "custom/service.player.js")
		jsfiles = append(jsfiles, "custom/service.event.js")
		jsfiles = append(jsfiles, "custom/service.news.js")
		jsfiles = append(jsfiles, "custom/service.admin.js")
		jsfiles = append(jsfiles, "custom/controller.admin.js")
	}
	if r.FormValue("p") == "overlay" {
		jsfiles = append(jsfiles, "custom/pojo.maxwellLogo.js")
		jsfiles = append(jsfiles, "custom/service.player.js")
		jsfiles = append(jsfiles, "custom/service.event.js")
		jsfiles = append(jsfiles, "custom/controller.overlay.js")
		jsfiles = append(jsfiles, "custom/controller.news.js")
	}
	for i:= 0; i< len(jsfiles); i++ {
		var file = "./js/" + jsfiles[i]
		root, err := ioutil.ReadFile(file)
		if err != nil {
			fmt.Println(err)
			return 
		}
		w.Header().Set("Content-Type", "application/javascript")
		fmt.Fprintf(w, "%s", string(root))
	}
}


func imageHandler(w http.ResponseWriter, r *http.Request) {
	var file = "./" + r.URL.Path[1:]
	root, err := ioutil.ReadFile(file)
	if err != nil {
		fmt.Println(err)
		return 
	}
	fmt.Fprintf(w, "%s", string(root))
}


func adminHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var scores interface{}
		st := r.Body
		err := json.NewDecoder(st).Decode(&scores)
		if err != nil {
			fmt.Println(err)
		} 
		f, err := os.Create("./js/custom/events.js")
		if err != nil {
			fmt.Println(err)
		} 
		wf := bufio.NewWriter(f)
		fmt.Fprintf(wf, "%s", "var events = ")
		json.NewEncoder(wf).Encode(scores)
		fmt.Fprintf(wf, "%s", ";")
		wf.Flush()
		f.Sync()
		f.Close()
		buf:= new (bytes.Buffer)
		fmt.Fprintf(buf, "{\"events\" : ")
		json.NewEncoder(buf).Encode(scores)
		fmt.Fprintf(buf, "}")
		body := buf.String()
		sendToClients(body)
	} else {
		root, err := ioutil.ReadFile("./layouts/admin.html")
		if err != nil {
			return
		}
		fmt.Fprintf(w, "%s", string(root))
	}
}


func echoHandler(ws *websocket.Conn) {
	connections = append(connections, ws)
	var err error
	for {
		var reply string
		if err = websocket.Message.Receive(ws, &reply); err != nil {
			fmt.Println("hmm")
			break
		}
		msg :=  reply
		if err = websocket.Message.Send(ws, msg); err != nil {
			fmt.Println("Can't send")
			break
		}
	}
}

func sendToClients(s string) {
	for key := range connections{
		_, err :=	connections[key].Write([]byte(s))
		if err != nil {
			fmt.Println("Can't send to ws")
		}
	}
}


func relay (w http.ResponseWriter, r *http.Request) {
	buf:= new (bytes.Buffer)
	buf.ReadFrom(r.Body)
	body := buf.String()
	sendToClients(body)
}


func adminInfoHandler (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "{\"clientCount\" : %d}", len(connections))
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/admin", adminHandler)
	http.HandleFunc("/admin/info", adminInfoHandler)
	http.HandleFunc("/js/all.js", jsHandler)
	http.HandleFunc("/css/all.css", cssHandler)
	http.HandleFunc("/images/", imageHandler)
	http.HandleFunc("/relay", relay)
	http.Handle("/ws", websocket.Handler(echoHandler))
	http.ListenAndServe(":8080", nil)
}
