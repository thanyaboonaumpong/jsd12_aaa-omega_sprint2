// TODO: แปลงหน้า Home จาก html/index.html เป็น React
// - แยก Hero section
// - แยก Product section
// - แยก Calculator section
// - แยก Footer
// - ต้องปรับภาพและ path ให้ตรง src/assets

import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import CalculatorSection from "../components/CalculatorSection";
import FooterSection from "../components/FooterSection";
import HeaderSectionAuth from "../components/HeaderSectionAuth";
import TestimonialSection from "../components/TestimonialSection";
import FaqSection from "../components/FaqSection";

const HomePage = () => {
    return (
        
        <div className="flex min-h-screen flex-col">
            <HeaderSectionAuth />
            <main className="bg-white">
                <HeroSection />
                <ProductSection />
                <CalculatorSection />
                <TestimonialSection />
                <FaqSection />
            </main>
            <FooterSection />
        </div>
    );
};

export default HomePage;