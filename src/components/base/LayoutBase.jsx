import { Outlet } from "react-router-dom";
import BarraSuperior from "./BarraSuperior";
import MenuInferior from "./MenuInferior";

export default function LayoutPrincipal() {
  return (
    <div className="layout-principal">
      <BarraSuperior />
      <main style={{ paddingBottom: "60px" }}>
        <Outlet />
      </main>
      <MenuInferior />
    </div>
  );
}