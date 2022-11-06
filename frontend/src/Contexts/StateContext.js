import React from "react";

export const StateContext = React.createContext({
  state: { user: "", ListToDo: [] },
  dispatch: () => {},
});
