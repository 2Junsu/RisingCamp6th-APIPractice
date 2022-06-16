import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import axios from "axios";
import ClothesView from "./components/ClothesView";
import kakao from "./assets/imgs/kakao_login.png";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
