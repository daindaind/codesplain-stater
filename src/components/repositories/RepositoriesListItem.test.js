import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// 이 테스트코드에서는 warning을 일으키는 FileIcon을 렌더링 하기를 피하고 싶을 때...
// jest.mock("../tree/FileIcon", () => {
//   // 해당 파일의 행위를 흉내냄.
//   // 실제로 파일에서 일어나는 것을 막고, 다른 것을 렌더링함.
//   // 문제를 일으키는 요소를 그냥 넘겨버림.
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "javascript",
    description: "A js library",
    owner: {
      login: "fecebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("이 리포지토리의 깃허브 홈페이지로 이동할 수 있는 링크를 보여줌", async () => {
  const { repository } = renderComponent();

  //   await act(async () => {
  //     await pause();
  //   });
  //   screen.debug();
  await screen.findByRole("img", { name: "javascript" });

  const link = screen.getByRole("link", { name: /github repository/i });
  expect(link).toHaveAttribute("href", repository.html_url);
});

// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };

test("파일 아이콘으로 적절한 아이콘을 보여준다.", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "Javascript" });

  expect(icon).toHaveClass("js-icon");
});

test("링크가 code editor page를 링크하고 있는지 확인", async () => {
  const { repository } = renderComponent();

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", "/https://github.com/facebook/react");
});
