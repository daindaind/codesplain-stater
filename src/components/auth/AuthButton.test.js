import { ServerIcon, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

const renderComponent = async () => {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
  await screen.findAllByRole("link");
};

// 테스트 순서를 바꾸기. (유저가 로그인 했을 때 -> 유저가 로그인하지 않았을 때)
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
  test("유저가 로그인했을 때, sign in & sign up 버튼이 보이지 않게 한다.", async () => {
    debugger;
    await renderComponent();

    const signInButton = screen.queryByRole("link", {
      name: /sign in/i,
    });

    const signUpButton = screen.queryByRole("link", {
      name: /sign up/i,
    });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("유저가 로그인했을 때, sign out 버튼이 보이게 한다.", async () => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", {
      name: /sign out/i,
    });

    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});

// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 100);
//   });

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
  test.only("유저가 로그인하지 않았을 때, sign in & sign up 버튼이 보이게 한다.", async () => {
    debugger;
    await renderComponent();
    const signInButton = screen.getByRole("link", {
      name: /sign in/i,
    });
    const signUpButton = screen.getByRole("link", {
      name: /sign up/i,
    });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");

    //  screen.debug();
    //  await pause();
    //  screen.debug();
  });
  test("유저가 로그인하지 않았을 때, sign out 버튼이 보이지 않게 한다", async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", {
      name: /sign out/i,
    });

    expect(signOutButton).not.toBeInTheDocument();
  });
});
