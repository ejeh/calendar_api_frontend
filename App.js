// import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./src/reducers";
import { createStore, applyMiddleware } from "redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import CreateEvent from "./src/components/AddEvent";

const middleWare = [ReduxThunk];

const store = createStore(rootReducer, applyMiddleware(...middleWare));

const MainNavigator = createSwitchNavigator(
  {
    CreateEvent: { screen: CreateEvent },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
