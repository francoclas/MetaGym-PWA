import EjercicioItem from "./EjercicioItem";

export default function ListaEjercicios({ ejercicios, actualizarEjercicio }) {
  return (
    <div>
      {ejercicios.map((ej, i) => (
        <EjercicioItem
          key={i}
          ejercicio={ej}
          index={i}
          actualizarEjercicio={actualizarEjercicio}
        />
      ))}
    </div>
  );
}
