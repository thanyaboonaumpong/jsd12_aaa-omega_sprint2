import React from 'react';
import WorkSection from '../components/WorkSection';
import TestimonialSection from '../components/TestimonialSection';
import FaqSection from '../components/FaqSection';

const TestimonialsPage = () => {
  return (
    <main className="bg-white">
      <WorkSection /><TestimonialSection /><FaqSection />
    </main>
  );
};

export default TestimonialsPage;