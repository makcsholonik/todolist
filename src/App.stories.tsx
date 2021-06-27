import React from "react";
import { App } from "./App";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
	title : "App stories",
	component : App,
	decorators : [ReduxStoreProviderDecorator]
};


export const AppWithReduxBaseExample = () => {
	return <App/>
}
