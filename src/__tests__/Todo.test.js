import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { ListTodo } from "../components/ListTodo";

export const handlers = [
  rest.get("http://127.0.0.1:8000/api/todo", (req, res, ctx) => {
    console.log("ctx => ", ctx);
    return res(ctx.json([{"username": "Harsh", "age": "20"}]), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches & receives a todo", async () => {
  renderWithProviders(<ListTodo />);

  // after some time, the user should be received
  expect(await screen.findByText(/Harsh/i)).toBeInTheDocument();
});
