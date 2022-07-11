package routes

import (
	"errors"

	"github.com/julienschmidt/httprouter"
	"host.local/bookmarks-app/backend/auth"
	"host.local/bookmarks-app/backend/models"
)

var (
	authInstance *auth.Auth
	dbConn       *models.Conn
)

func Init(auth *auth.Auth, conn *models.Conn) error {
	authInstance = auth
	if authInstance == nil {
		return errors.New("auth is nil")
	}

	dbConn = conn
	if dbConn == nil {
		return errors.New("database connection is nil")
	}

	return nil
}

func RegisterRoutes(router *httprouter.Router) {
	router.POST("/api/register", register)
	router.POST("/api/login", login)
	router.POST("/api/verify", requireAuth(verifyToken))

	router.GET("/api/collections", requireAuth(getCollections))
	router.GET("/api/collection/:id", requireAuth(getCollection))
	router.POST("/api/collection", requireAuth(addCollection))
	router.PUT("/api/collection", requireAuth(updateCollection))
	router.DELETE("/api/collection", requireAuth(deleteCollection))

	router.GET("/api/bookmarks/:id", requireAuth(getBookmarks))
	router.POST("/api/bookmark", requireAuth(addBookmark))
	router.DELETE("/api/bookmark", requireAuth(deleteBookmark))

	router.PUT("/api/user/profile", requireAuth(updateUsername))
	router.PUT("/api/user/password", requireAuth(updatePassword))
	router.DELETE("/api/user", requireAuth(deleteUser))
}
