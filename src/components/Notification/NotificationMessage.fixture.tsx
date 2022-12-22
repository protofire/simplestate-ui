import React from "react";
import { NotificationMessage } from "./NotificationMessage";

const projectName = 'project name';
const investmentValue = 1234;

export default (
  <NotificationMessage {...{projectName, investmentValue} } />
);
