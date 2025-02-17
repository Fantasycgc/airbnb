import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/ui/Layout";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import BookingsPage from "./pages/BookingsPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import SingleBookedPlace from "./pages/SingleBookedPlace";
import axiosInstance from "./utils/axios";
import { UserProvider } from "./providers/UserProvider";
import { PlaceProvider } from "./providers/PlaceProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getItemFromLocalStorage } from "./utils";
import NotFoundPage from "./pages/NotFoundPage";
import { UserManager } from "./pages/admin/UserManager";
import { RoomManager } from "./pages/admin/RoomManager";
import { BookingManager } from "./pages/admin/BookingManager";
import { LocationManager } from "./pages/admin/LocationManager";
import { PATH } from "./constants/PATH";
import { MainLayout } from "./pages/LayoutCommon";

function App() {
  useEffect(() => {
    // set the token on refreshing the website
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${getItemFromLocalStorage("token")}`;
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <PlaceProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/account/bookings" element={<BookingsPage />} />
              <Route
                path="/account/bookings/:id"
                element={<SingleBookedPlace />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/admin" element={<MainLayout />}>
              <Route path={PATH.USER_MANAGER} element={<UserManager />} />
              <Route
                path={PATH.LOCATION_MANAGER}
                element={<LocationManager />}
              />
              <Route path={PATH.ROOM_MANAGER} element={<RoomManager />} />
              <Route path={PATH.BOOK_MANAGER} element={<BookingManager />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} transition={Slide} />
        </PlaceProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
