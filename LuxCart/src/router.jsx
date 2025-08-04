
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}>
                        <Route index element={<Homesection />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router


