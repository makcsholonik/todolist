
type StateTYpe = {
	age : number
	childrenCount : number
	name : string
}
type ActionType = {
	type : string
	[ key : string ] : any
}

// меня вызовут и дадут мне state (почти всегда объект) и инструкцию action (объект) согласно прописанному type в этом action я поменяю state

export const userReducer = ( state : StateTYpe, action : ActionType ) => {
	switch (action.type) {
		case "INCREMENT-AGE":
			let newState = {...state} // делаем копию
			newState.age = state.age+ 1; // у копии имее право менять свойство
			return newState; // возвращаем копию
		case	"INCREMENT-CHILDREN-COUNT":
			// без создания промежуточных переменных
			return {
				...state,
				childrenCount: state.childrenCount + 1
			}
		case "CHANGE-NAME":
			return {
				...state,
				name: state.name = "Viktor"
			}
		default:
			throw new Error("I don't understand this type")
	}
}