import http from "http";
import { createItem, deleteItem, getItemById, getItems, updateItem } from "./controllers/itemsController.js";

const server = http.createServer(async (req, res) => {
  //url запроса
  const url = new URL(req.url!, process.env.ALLOWED_HOST);
  const { pathname } = url;

  if (req.method === "GET" && pathname === '/items') {
    await getItems(req, res);
  }
  else if (req.method === "GET" && pathname.startsWith('/items/')) {
    const id = pathname.split('/')[2];
    await getItemById(req, res, id);
  } 
  else if (req.method === "POST" && pathname === '/items') {
    await createItem(req, res);
  }
  else if (req.method === "DELETE" && pathname.startsWith('/items/')) {
    const id = pathname.split('/')[2];
    await deleteItem(req, res, id );
  }
  else if (req.method === "PUT" && pathname.startsWith('/items/')) {
    const id = pathname.split('/')[2];
    await updateItem(req, res, id);
  }
  else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
})