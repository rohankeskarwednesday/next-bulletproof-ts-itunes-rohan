import { render } from "@utils/testUtils";
import Songs from "../index";

describe("<Songs />", () => {
  it("should have input with value", () => {
    const { getAllByTestId } = render(<Songs />);
  });
});
