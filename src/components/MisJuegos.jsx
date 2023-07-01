import { useReducer } from 'react'
import { JuegoReducer } from "../reducer/JuegoReducer";
import { useEffect } from 'react';

const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
};

export const MisJuegos = () => {

    const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

    useEffect(()=>{
        localStorage.setItem("juegos", JSON.stringify(juegos));
    },[juegos]);

    const conseguirDatosForm = e => {
        e.preventDefault();

        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        }

        console.log(juego);

        const accion = {
            type: "crear",
            payload: juego
        };

        dispatch(accion);

        console.log(juegos);
    }

    const borrar = id => {
        const accion = {
            type: "borrar",
            payload: id
        };

        dispatch(accion);
    };

    const editar = (e, id) => {
        console.log( e.target.value ,"Editar", id);

        let juego = {
            id: id,
            titulo: e.target.value,
            descripcion: e.target.value
        };

        const accion = {
            type: "editar",
            payload: juego
        };

        dispatch(accion);
    };

  return (
    <div>
        <h1>Estos son mis Juegos</h1>

        <p>Numero de videojuegos: {juegos.length}</p>

        <ul>
            {
                juegos.map(juego => (
                    <li key={juego.id}>
                        {juego.titulo}
                        <div>
                            <button onClick={ () => {borrar(juego.id)}}>Borrar</button>
                            <input type="text" onKeyDown={ e => {
                                    if(e.key === "Enter"){
                                        editar(e, juego.id)
                                    }
                                }} />
                        </div>
                    </li>
                ))
            }
        </ul>

        <h3>Agregar Juego</h3>
        <form onSubmit={conseguirDatosForm}>
            <input type="text" name="titulo" placeholder="Nombre del juego" />
            <textarea name="descripcion" placeholder="Descripcion del juego"></textarea>
            <input type="submit" value="Agregar" />
        </form>

    </div>
  )
}
