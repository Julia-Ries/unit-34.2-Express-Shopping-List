process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let item = { name: "milk" , price: 2};

beforeEach(function () {
  items.push(item);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});



describe("GET /items", () => {
    test("Get all items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ items: [item] });
      expect(items).toHaveLength(1);
    });
  });


describe("GET /items/:name", () => {
    test("Get item by name", async () => {
      const res = await request(app).get(`/items/${item.name}`);
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({ name: milk })
    })
    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).get(`/item/icecube`);
      expect(res.statusCode).toBe(404)
    })
  })

describe("POST /items", () => {
    test("Creating a item", async () => {
      const res = await request(app).post("/items").send({ name: "cheese", price: 2 });
      expect(res.statusCode).toBe(201);
      expect(res.body.item.name).toEqual( "cheese");
      expect(response.body.item.price).toEqual(2);
    });
  });


  
  describe("/PATCH /items/:name", () => {
    test("Updating a item's name", async () => {
      const res = await request(app).patch(`/items/${item.name}`).send({ name: "bread" });
      expect(res.statusCode).toBe(200);
      expect(res.body.item).toEqual({ name: "bread" });
    });
  });
  
  describe("/DELETE /items/:name", () => {
    test("Deleting an item", async () => {
      const res = await request(app).delete(`/items/${item.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' })
    });
  });