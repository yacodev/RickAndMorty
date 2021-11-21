import { render } from "@testing-library/react"
import { Episodes } from "../../components/Episodes"

describe('< Episodes />',()=>{
  test('Render el componente Episodes',()=>{
    const {container} = render(<Episodes />);
    expect(container.textContent).toBe("");
  });
});