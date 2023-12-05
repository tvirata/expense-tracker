/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ykqh3r63z14jjwz");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ykqh3r63z14jjwz",
    "created": "2023-12-05 03:21:03.825Z",
    "updated": "2023-12-05 03:21:03.825Z",
    "name": "total",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zrsl412x",
        "name": "sum",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
