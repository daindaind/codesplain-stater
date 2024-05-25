import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("리포지토리의 주요 언어가 화면에 나타나는지 확인", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  //   const language = screen.getByText("Javascript");

  //   expect(language).toBeInTheDocument();

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value)); // 텍스트 안에 value가 포함되어 있는지 확인 (동적 정규식)

    expect(element).toBeInTheDocument();
  }
});
