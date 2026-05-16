// TODO: แปลงหน้า Home จาก html/index.html เป็น React
// - แยก Hero section
// - แยก Product section
// - แยก Calculator section
// - แยก Footer
// - ต้องปรับภาพและ path ให้ตรง src/assets

import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection.jsx";
import CalculatorSection from "../components/CalculatorSection";
import FooterSection from "../components/FooterSection";
import HeaderSection from "../components/HeaderSection";
import HeaderSectionAuth from "../components/HeaderSectionAuth";
import TestimonialSection from "../components/TestimonialSection";
import FaqSection from "../components/FaqSection";

const HomePage = () => {
    return (
        <>
            <HeaderSection />
            <HeaderSectionAuth />
            <HeroSection />
            <ProductSection />
            <CalculatorSection />
            <TestimonialSection />
            <FaqSection />
            <FooterSection />
        </>
    );
};

export default HomePage;
