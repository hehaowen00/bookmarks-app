package models

import (
	"context"
	"log"
)

type Bookmark struct {
	Id     int64  `json:"id"`
	UserId int64  `json:"user_id"`
	ListId int64  `json:"list_id"`
	Url    string `json:"url"`
	Title  string `json:"title"`
}

func (c *Conn) AddBookmark(bookmark *Bookmark) error {
	const QUERY = `
    INSERT INTO bookmarks (user_id, list_id, url, title)
    VALUES (?, ?, ?, ?)
    `

	ctx := context.Background()

	tx, err := c.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	stmt, err := tx.Prepare(QUERY)
	if err != nil {
		return err
	}

	_, err = stmt.Exec(bookmark.UserId, bookmark.ListId, bookmark.Url, bookmark.Title)
	if err != nil {
		return err
	}

	err = tx.Commit()

	return err
}

func (c *Conn) GetBookmarks(userId int64, listId int64) ([]Bookmark, error) {
	const QUERY = `
    SELECT id, url, title
    FROM bookmarks
    WHERE user_id = ? AND list_id = ?
    `

	stmt, err := c.db.Prepare(QUERY)
	if err != nil {
		return nil, err
	}

	rows, err := stmt.Query(userId, listId)
	if err != nil {
		return nil, err
	}

	var bookmarks = make([]Bookmark, 0)

	for rows.Next() {
		var bookmark Bookmark

		err := rows.Scan(&bookmark.Id, &bookmark.Url, &bookmark.Title)
		if err != nil {
			return nil, err
		}

		bookmark.UserId = userId
		bookmark.ListId = listId

		bookmarks = append(bookmarks, bookmark)
	}

	return bookmarks, nil
}

func (c *Conn) GetBookmark(bookmark *Bookmark) error {
	const QUERY = `
    SELECT url, title
    FROM bookmarks
    WHERE id = ? AND user_id = ? AND list_id = ?
    `

	stmt, err := c.db.Prepare(QUERY)
	if err != nil {
		return err
	}

	row := stmt.QueryRow(bookmark.Id, bookmark.UserId, bookmark.ListId)

	err = row.Scan(&bookmark.Url, &bookmark.Title)
	if err != nil {
		return err
	}

	return nil
}

func (c *Conn) UpdateBookmark(bookmark *Bookmark) error {
	const QUERY = `
    UPDATE bookmarks
    SET list_id = ? , url = ?, title = ?
    WHERE id = ? AND user_id = ?
    `

	ctx := context.Background()

	tx, err := c.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	stmt, err := tx.Prepare(QUERY)
	if err != nil {
		return err
	}

	_, err = stmt.Exec(bookmark.ListId, bookmark.Url, bookmark.Title, bookmark.Id, bookmark.UserId)
	if err != nil {
		return err
	}

	err = tx.Commit()

	return err
}

func (c *Conn) DeleteBookmark(bookmark *Bookmark) error {
	const QUERY = `
    DELETE FROM bookmarks.bookmarks
    WHERE id = ? AND user_id = ? AND list_id = ? AND title = ? AND url = ?
    `

	ctx := context.Background()

	tx, err := c.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	stmt, err := tx.Prepare(QUERY)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	res, err := stmt.Exec(bookmark.Id, bookmark.UserId, bookmark.ListId, bookmark.Title, bookmark.Url)
	if err != nil {
		return err
	}

	log.Println(res.RowsAffected())

	err = tx.Commit()

	return err
}
