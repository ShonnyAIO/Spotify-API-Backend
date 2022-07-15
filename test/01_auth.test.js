const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models/index");
const mongoose = require("mongoose");

const testAuthLogin = {
    email: "daddy_yankee@hotmail.com",
    password: "abc123"
}

const testAuthRegister = {
    name: "Daddy Yankee",
    age: 47,
    email: "daddy_yankee@hotmail.com",
    password: "abc123"
}

/**
 * Se va a ejecutar antes de las pruebas
 */
beforeAll(async () => {
    await usersModel.deleteMany();
});

afterAll(() => {
    mongoose.connection.close();
});

describe("[AUTH] Esta es la prueba de /api/auth", () => {

    test("Esto deberia de retornar un 404", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send(testAuthLogin);

        expect(response.statusCode).toEqual(404)
    });

    test("Esto deberia de retornar un 404", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send(testAuthLogin);

        expect(response.statusCode).toEqual(404)
    });

    test("Esto deberia de retornar un 201", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testAuthRegister);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
    });

});