module host.local/bookmarks-app/backend/routes

go 1.18

replace host.local/bookmarks-app/backend/auth => ../auth

replace host.local/bookmarks-app/backend/models => ../models

require (
	github.com/golang-jwt/jwt/v4 v4.4.1 // indirect
	github.com/julienschmidt/httprouter v1.3.0 // indirect
	golang.org/x/crypto v0.0.0-20220622213112-05595931fe9d // indirect
	golang.org/x/sys v0.0.0-20210615035016-665e8c7367d1 // indirect
	host.local/bookmarks-app/backend/auth v0.0.0-00010101000000-000000000000 // indirect
	host.local/bookmarks-app/backend/models v0.0.0-00010101000000-000000000000 // indirect
)
