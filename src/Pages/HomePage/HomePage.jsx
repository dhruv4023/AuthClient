import WidgetWrapper from "Components/StyledComponents/WidgetWrapper";
import WidgetsOnPage from "Components/WidgetsOnPage";
import React from "react";

const HomePage = () => {
  return (
    <>
      {/* WidgetsOnPage component that displays auctions */}
      <WidgetsOnPage
        title={"Home"}
        leftComponent={
          <>
          <WidgetWrapper>Left Component Widget</WidgetWrapper>
          </>
        }
        rightComponent={
          <>
          <WidgetWrapper>Right Component Widget</WidgetWrapper>
          </>
        }
      />
    </>
  );
};

export default HomePage;
