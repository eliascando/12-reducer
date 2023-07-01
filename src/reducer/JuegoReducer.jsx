export const JuegoReducer = (state = [], accion) => { 

    switch (accion.type) {
        case "crear":
            return [...state, accion.payload]
        case "borrar":
            return state.filter(juego => juego.id !== accion.payload)
        case "editar":{
            let indice = state.findIndex(juego => juego.id === accion.payload.id);
            state[indice] = accion.payload;
            return [...state];
        }
        default:
            return state;
    }
}