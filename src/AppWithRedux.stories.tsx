import React from "react";
import { Provider } from "react-redux";
import { AppWithRedux } from "./AppWithRedux";
import { store } from "./state/store";

export default {
	title : "AppWithRedux stories",
	component : AppWithRedux
};


export const AppWithReduxBaseExample = () => {
	return <Provider store={store}><AppWithRedux/></Provider>
}
