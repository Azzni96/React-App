import { fireEvent, render, screen } from "@testing-library/react";
import Single from "../../views/Single";


test('test single view', () => {
  render(<Single />);

  expect(screen.getByText('go back')).toBeDefined();
  expect(screen.getByText('Your browser does not support the video tag.')).toBeDefined();
  fireEvent.click(screen.getByRole('button'));
});
