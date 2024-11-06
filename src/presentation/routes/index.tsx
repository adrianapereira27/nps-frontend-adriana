import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Page_One_Nps';
import { Login } from '../pages/Page_Two_Nps';
import { Login } from '../pages/Login';
import { LoginRedirect, PrivateRoute } from '../components/features/Redirect';

export function AppRoute() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<Navigate to="/Page_One_Nps" />} />
                <Route path='/Page_One_Nps' element={<Home />} />
                <Route path='/Page_Two_Nps' element={<FormEvent />} />
            </Route>
            <Route element={<LoginRedirect />}>
                <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
    );
}
