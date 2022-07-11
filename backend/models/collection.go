package models

import "context"

type Collection struct {
	Id     int64  `json:"id"`
	UserId int64  `json:"user_id"`
	Name   string `json:"name"`
}

func (c *Conn) GetCollections(userId int64) ([]Collection, error) {
	const QUERY = `
    SELECT id, name FROM collections
    WHERE user_id = ?
    ORDER BY name
    `

	stmt, err := c.db.Prepare(QUERY)
	if err != nil {
		return nil, err
	}

	rows, err := stmt.Query(userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	collections := make([]Collection, 0)

	for rows.Next() {
		var collection Collection

		err := rows.Scan(&collection.Id, &collection.Name)
		if err != nil {
			return nil, err
		}

		collections = append(collections, collection)
	}

	return collections, nil
}

func (c *Conn) GetCollection(collection *Collection) error {
	const QUERY = `
    SELECT name
    FROM collections
    WHERE id = ? AND user_id = ?
    `

	stmt, err := c.db.Prepare(QUERY)
	if err != nil {
		return err
	}

	result := stmt.QueryRow(collection.Id, collection.UserId)

	if err := result.Scan(&collection.Name); err != nil {
		return err
	}

	return nil
}

func (c *Conn) AddCollection(collection *Collection) error {
	const QUERY = `
    INSERT INTO collections (user_id, name)
    VALUES (?, ?)
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

	result, err := stmt.Exec(collection.UserId, collection.Name)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	collection.Id = id

	err = tx.Commit()

	return err
}

func (c *Conn) UpdateCollection(collection *Collection) error {
	const QUERY = `
    UPDATE collections
    SET name = ?
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

	_, err = stmt.Exec(collection.Name, collection.Id, collection.UserId)
	if err != nil {
		return err
	}

	err = tx.Commit()

	return err
}

func (c *Conn) DeleteCollection(collection *Collection) error {
	const QUERY = `
    DELETE FROM collections
    WHERE id = ? AND user_id = ? AND name = ?
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

	_, err = stmt.Exec(collection.Id, collection.UserId, collection.Name)
	if err != nil {
		return err
	}

	err = tx.Commit()

	return err
}
