import React from "react";
import { AppWithRedux } from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
	title : "AppWithRedux stories",
	component : AppWithRedux,
	decorators : [ReduxStoreProviderDecorator]
};


export const AppWithReduxBaseExample = () => {
	return <AppWithRedux/>
}