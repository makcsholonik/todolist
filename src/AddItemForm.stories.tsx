import { AddItemForm } from "./AddItemForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
	title : "AddItemForm stories",
	component : AddItemForm
};

const callback = action ( "Button add was press inside the form" );

export const AddItemFormBaseExample = () => {
	return <AddItemForm addItem={ callback }/>
}
