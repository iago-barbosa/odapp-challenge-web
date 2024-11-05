import React from "react";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../pages/home";
import CadastrarPaciente from "../pages/cadastrar_paciente";
import ListarPacientes from "../pages/listar_pacientes";
import EditarPaciente from "../pages/editar_paciente";

export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}></Route>
                <Route path="/cadastrar-paciente" Component={CadastrarPaciente}></Route>
                <Route path="/editar-paciente" Component={EditarPaciente}></Route>
                <Route path="/pacientes" Component={ListarPacientes}></Route>
            </Routes>
        </BrowserRouter>
    );
}