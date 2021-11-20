import { render } from "@testing-library/react";
import { Locations } from "../../components/Locations";


describe('< Locations />',()=>{
  test ('Render del componente Locations',()=>{
    const { container } = render(<Locations />);
    expect(container.textContent).toBe("");
  });
});