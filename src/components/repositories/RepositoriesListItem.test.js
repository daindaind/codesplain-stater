import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// 이 테스트코드에서는 warning을 일으키는 FileIcon을 렌더링 하기를 피하고 싶을 때...
jest.mock("../tree/FileIcon", () => {
  // 해당 파일의 행위를 흉내냄.
  // 실제로 파일에서 일어나는 것을 막고, 다른 것을 렌더링함.
  // 문제를 일으키는 요소를 그냥 넘겨버림.
  return () => {
    return "File Icon Component";
  };
});

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "javascript",
    description: "A js library",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

test("이 리포지토리의 깃허브 홈페이지로 이동할 수 있는 링크를 보여줌", async () => {
  renderComponent();

  //   screen.debug();
  //   await screen.findByRole("img", { name: "javascript" });
});

// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };
