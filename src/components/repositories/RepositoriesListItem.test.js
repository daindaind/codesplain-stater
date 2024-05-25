import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

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

  await screen.findByRole("img", { name: "javascript" });
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
