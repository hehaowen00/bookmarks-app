package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	"host.local/bookmarks-app/backend/models"
)

func addBookmark(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)

	var bookmark models.Bookmark
	bookmark.UserId = userID

	err := json.NewDecoder(req.Body).Decode(&bookmark)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to parse JSON")
		return
	}

	err = dbConn.AddBookmark(&bookmark)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to add bookmark")
		return
	}

	json.NewEncoder(w).Encode(bookmark)
}

func getBookmarks(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)
	value := ps.ByName("id")

	collectionId, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Invalid Collection ID")
		return
	}

	bookmarks, err := dbConn.GetBookmarks(userID, collectionId)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to retrieve bookmarks")
		return
	}

	json.NewEncoder(w).Encode(bookmarks)
}

func deleteBookmark(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)

	var bookmark models.Bookmark
	bookmark.UserId = userID

	err := json.NewDecoder(req.Body).Decode(&bookmark)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to parse JSON")
		return
	}

	err = dbConn.DeleteBookmark(&bookmark)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to delete bookmark")
		return
	}

	jsonMessage(w, http.StatusOK, "Bookmark deleted")
}
