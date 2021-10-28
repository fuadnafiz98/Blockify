import React, { createContext } from "react";

const TaskContext = createContext(undefined);
const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
  const createTab = (name) => {
    return {
      tabId: "0",
      tabName: name,
    };
  };
  return (
    <Provider value={{ createTab: (name) => createTab(name) }}>
      {children}
    </Provider>
  );
};

export { TaskProvider, TaskContext };
