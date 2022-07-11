package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	"host.local/bookmarks-app/backend/models"
)

func getCollections(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)

	collections, err := dbConn.GetCollections(userID)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to retrieve collections")
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(collections)
}

func getCollection(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)
	value := ps.ByName("id")

	collectionId, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to parse collection ID")
		return
	}

	var collection models.Collection
	collection.Id = collectionId
	collection.UserId = userID

	err = dbConn.GetCollection(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to retrieve collection")
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(collection)
}

func addCollection(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)

	var collection models.Collection
	collection.UserId = userID

	err := json.NewDecoder(req.Body).Decode(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to parse JSON")
		return
	}

	err = dbConn.AddCollection(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to add collection")
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(collection)
}

func updateCollection(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)

	var collection models.Collection
	collection.UserId = userID

	err := json.NewDecoder(req.Body).Decode(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to parse JSON")
		return
	}

	err = dbConn.UpdateCollection(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusInternalServerError, "Failed to update collection")
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(collection)
}

func deleteCollection(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	userID := req.Context().Value(idKey).(int64)

	var collection models.Collection
	collection.UserId = userID

	err := json.NewDecoder(req.Body).Decode(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to parse JSON")
		return
	}

	err = dbConn.DeleteCollection(&collection)
	if err != nil {
		log.Println(err)
		jsonMessage(w, http.StatusBadRequest, "Failed to delete collection")
		return
	}

	jsonMessage(w, http.StatusOK, "Collection deleted")
}
