import React from "react";
import {  PaperProvider, } from "react-native-paper";
import "react-native-gesture-handler";
import Router from "./routers/Router";
import { MyContextControllerProvider } from "./index";

const AppLab3 = () => {
  return (
  <MyContextControllerProvider>
    <PaperProvider>
      <Router/>
    </PaperProvider>
  </MyContextControllerProvider>
  );
};
export default AppLab3;
