import Box from "../components/Box";
import Kontak from "../components/Kontak";
import About from "../components/About";
import Hero from "../components/Hero";
import Testi from "../components/Testi";

export default function Home() {
    return (
        <div className="w-full pt-2 space-y-16">
            <Hero />
            <Box />
            <About />
            <Testi/>
            <Kontak />
        </div>
    );
}
