// Write your tests here
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const sunny = {name:"sunny", username:"moore"}

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async ()=>{
  await db("users").truncate()
})

afterAll(async ()=>{
  await db.destroy()
})

describe("[POST] /register", ()=>{
  it("responds with created user", async ()=>{
    let res
    res = await request(server).post("/register").send(sunny)
    expect(res.body).toMatchObject({id:1, ...sunny})
  })
})