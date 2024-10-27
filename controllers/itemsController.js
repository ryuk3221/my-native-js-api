import { itemsModel } from "../models/itemsModel.js";

export const getItems = async (req, res) => {
  try {
    const items = await itemsModel.getAllItems();

    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify(items));

  } catch (e) {
    res.statusCode = 500;
    res.end(`Error: ${e.message}`);
  }
}

export const getItemById = async (req, res, id) => {
  try {
    const item = await itemsModel.getItemById(id);

    if (!item) {
      res.statusCode = 404;
      res.end(`Item with ID: ${id} not found`);
    } else {
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(item));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
}

export const createItem = async (req, res) => {
  try {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const item = JSON.parse(body);
      await itemsModel.createItem(item);
      res.statusCode = 201;
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify({status: "success", message: "Элемент успешно создан и записан в БД"}));
    })
  } catch (err) {
    res.statusCode = 500;
    res.end('Error');
  }
}

export const updateItem = async (req, res, id) => {
  try {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const item = JSON.parse(body);
      const changedItem = await itemsModel.updateItem(id, item);
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify({status: "success", message: `Элемент с id: ${id} успешно изменён`}));
    })
  } catch (err) {
    res.statusCode = 500;
    res.end('Error');
  }
}

export const deleteItem = async (req, res, id) => {
  try {
    await itemsModel.deleteItem(id);
    res.statusCode = 200;
    res.setHeader('Content-type: application/json');
    res.end(JSON.stringify({status: "success", message: `Элемент с id: ${id} удалён`}));

  } catch (err) {
    res.statusCode = 500;
    res.end('Error');
  }
}