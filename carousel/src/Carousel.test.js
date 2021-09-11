import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", ()=>{
  render(<Carousel/>);
});

it("matches snapshot", ()=> {
  const {asFragment} = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, not the second or third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});


it("hides arrows at the end of either carousel", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");

  // expect the left arrow not to show, but right arrow to show
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  // move forward in the carousel & expect both arrows to show
  fireEvent.click(rightArrow);
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  // move forward in the carousel & expect the left arrow to show, but the right arrow not to show
  fireEvent.click(rightArrow);
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
