package main


import (
	"io/ioutil"
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"net/http"
)


var cssfiles = []string{"lib/Montserrat.css", "custom/app.css"}
var jsfiles = []string{"lib/jquery.min.js", "lib/angular.min.js", "custom/app.js", "custom/events.js", "custom/canvas.js"}


func hydrateHandler(w http.ResponseWriter, r *http.Request) {
	var file = "./js/custom/events.js"
	root, err := ioutil.ReadFile(file)
	if err != nil {
		fmt.Println(err)
		return 
	}
	w.Header().Set("Content-Type", "application/javascript")
	fmt.Fprintf(w, "%s", string(root))
}


func cssHandler(w http.ResponseWriter, r *http.Request) {
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
		err := json.NewDecoder(r.Body).Decode(&scores)
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
	} else {
		root, err := ioutil.ReadFile("./layouts/admin.html")
		if err != nil {
			return
		}
		fmt.Fprintf(w, "%s", string(root))
	}
}


func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/admin", adminHandler)
	http.HandleFunc("/hydrate", hydrateHandler)
	http.HandleFunc("/js/all.js", jsHandler)
	http.HandleFunc("/css/all.css", cssHandler)
	http.HandleFunc("/images/", imageHandler)
	http.ListenAndServe(":8080", nil)
}
