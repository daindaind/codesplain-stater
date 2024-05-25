import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const language = req.url.searchParams.get("q").split("language:")[1];

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("언어마다 두개의 링크를 가지고 있는지 확인", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // 각각의 언어들을 순회한다.
  // 각 언어마다 두개의 링크를 가지고 있는 걸 확인한다.
  // 링크는 적절한 full_name을 가지고 있음을 가정한다.

  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  //   screen.debug();
  for (let language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    //  screen.debug();
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});

// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 100);
//   });
