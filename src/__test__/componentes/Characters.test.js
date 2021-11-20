import { render } from "@testing-library/react";
import { Characters } from "../../components/Characters";


describe('<Character />',()=>{
  test ('Render del componente Charater',()=>{
    const { container } = render(<Characters />);
    expect(container.textContent).toBe("");
  });
});