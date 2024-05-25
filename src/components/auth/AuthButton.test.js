import { ServerIcon, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

describe("유저가 로그인을 하지 않았을 때", () => {
  // createServer() ---> GET '/api/user' ---> {user: null}
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);
  test("유저가 로그인하지 않았을 때, sign in & sign up 버튼이 보이게 한다.", async () => {});
  test("유저가 로그인하지 않았을 때, sign in & sign up 버튼이 보이지 않게 한다", async () => {});
});

describe("유저가 로그인을 했을 때", () => {
  // createServer() ---> FET '/api/user' ----> {user: {id: 3, email: '1904vv@gmail.com'}}
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 3, email: "1904vv@gmail.com" } };
      },
    },
  ]);
  test("유저가 로그인했을 때, sign in & sign up 버튼이 보이지 않게 한다.", async () => {});
  test("유저가 로그인했을 때, sign out 버튼이 보이게 한다.", async () => {});
});
