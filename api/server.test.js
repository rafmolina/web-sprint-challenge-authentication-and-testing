// Write your tests here
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const sunny = {username:"sunny", password:"moore"}
const benny = {username: "benny", password: "blanco"}

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
    const res = await request(server).post("/api/auth/register").send(benny)
    expect(res.body).toMatchObject({id:1, ...benny})//token password fail ask how to
  })
  it('should return a status of 201', async () => {
    const res = await request(server).post("/api/auth/register").send(sunny);
    expect(res.status).toBe(201);
})
})

describe("[POST] /login", ()=> {
  it("login not succesful", async ()=>{
    const res = await request(server).post("/api/auth/login").send(benny)
    expect(res.body).toMatchObject({message:"invalid credentials"})
  })
  it("failed login status", async ()=>{
    const res = await request(server).post("/api/auth/login").send(sunny)
    expect(res.status).toBe(401)
  })
})

