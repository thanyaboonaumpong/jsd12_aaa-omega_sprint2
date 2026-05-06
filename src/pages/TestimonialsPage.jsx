import React from 'react';
import HeaderSection from '../components/HeaderSection';
import FooterSection from '../components/FooterSection';
import WorkSection from '../components/WorkSection';
import TestimonialSection from '../components/TestimonialSection';
import FaqSection from '../components/FaqSection';

const TestimonialsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSection />
    <main className="bg-white">
      <WorkSection /><TestimonialSection /><FaqSection />
    </main>
    <FooterSection />
    </div>
  );
};

export default TestimonialsPage;