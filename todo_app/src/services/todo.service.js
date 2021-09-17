/****  Todo Service
 *  and required Methods
 ****/
import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-type": "application/json"
  }
});
class TodoService {
    getAll() {
      return http.get("/todo/all");
    }

    create(data) {
      return http.post("/todo", data);
    }

    update(id, data) {
      return http.post(`/todo/update/${id}`, data);
    }

    delete(id) {
      return http.post(`/todo/delete/${id}`);
    }
}

export default new TodoService();