import { useState } from "react";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/tailwind.css";


const NotFound = React.lazy(() => import("./pages/ErrorPage"));

const Dashboard = React.lazy(() => import ("./pages/Dashboardadmin"))
const CarList = React.lazy(() => import ("./pages/CarListadmin"))
const Customers = React.lazy(() => import ("./pages/Customersadmin"))
const Driver = React.lazy(() => import ("./pages/Driveradmin"))
const Lowongan = React.lazy(() => import ("./pages/Lowonganadmin"))
const Profile = React.lazy(() => import ("./pages/Profileadmin"))
const FAQ = React.lazy(() => import ("./pages/FAQadmin"))
const ArtikelA = React.lazy(() => import ("./pages/Artikeladmin"))
const TestimoniA = React.lazy(() => import ("./pages/Testimoniadmin"))
const Tim = React.lazy(() => import ("./pages/Timadmin"))
const Booking = React.lazy(() => import ("./pages/Bookingadmin"))
const Inbox = React.lazy(() => import ("./pages/Inboxadmin"))
const Galeri = React.lazy(() => import ("./pages/Galeriadmin"))

const CarDetail = React.lazy(() => import ("./pages/CarDetailadmin"))
const CustomerDetail = React.lazy(() => import ("./pages/CustomerDetailadmin"))
const DriverDetail = React.lazy(() => import ("./pages/DriverDetailadmin"))
const ArtikelDetail = React.lazy(() => import ("./pages/ArtikelDetailadmin"))


const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"))



const Home = React.lazy(() => import("./pages/Home"));
const Mobil = React.lazy(() => import("./pages/Mobil"));
const DetailMobil = React.lazy(() => import("./pages/DetailMobil"));
const Tentang = React.lazy(() => import("./pages/Tentang"));
const Kontak = React.lazy(() => import("./pages/Kontak"));
const Artikel = React.lazy(() => import("./pages/Artikel"));
const DetailArtikel = React.lazy(() => import("./pages/DetailArtikel"));
const Career = React.lazy(() => import("./pages/Career"));
const DetailCareer = React.lazy(() => import("./pages/DetailCareer"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Testimoni = React.lazy(() => import("./pages/Testimoni"));
const Team = React.lazy(() => import("./pages/Team"));
const DetailTeam = React.lazy(() => import("./pages/DetailTeam"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Quotes = React.lazy(() => import("./pages/Quotes"));
const Gallery = React.lazy(() => import("./pages/Galeri"));
const Login = React.lazy(() => import("./pages/Login"));


import ListUser from './pages/ListUseradmin';


import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

function App() {
  const [count, setCount] = useState(0);

  return (


    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/*"
          element={<NotFound kode="403" deskripsi="page forbidden" to="/" gambar="https://img.pikbest.com/backgrounds/20220119/blue-glitch-wind-tik-tok-background-image_6244103.jpg!sw800" />}
        />
          <Route path="/404" element={<NotFound kode="404" deskripsi="page not found" to="/" gambar="https://img.pikbest.com/backgrounds/20220119/blue-glitch-wind-tik-tok-background-image_6244103.jpg!sw800"  />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mobil" element={<Mobil />} />
          <Route path="/mobil/:id" element={<DetailMobil />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/:id" element={<DetailArtikel />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:id" element={<DetailCareer />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<DetailTeam />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
        

      </Route>

           <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/lowongan" element={<Lowongan />} />
          <Route path="/ListUser" element={<ListUser />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/artikel" element={<ArtikelA />} />
          <Route path="/testimoni" element={<TestimoniA />} />
          <Route path="/tim" element={<Tim />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/drivers/:id" element={<DriverDetail />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
        </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>




     </Routes>
   </Suspense>


  );
}

export default App;
