import React from 'react';

const WorkSection = () => {
  const works = [
    { id: 1, location: "กรุงเทพฯ", img: "image1.jpg" },
    { id: 2, location: "สมุทรปราการ", img: "image2.jpg" },
    { id: 3, location: "นนทบุรี", img: "image3.jpg" },
    { id: 4, location: "ปทุมธานี", img: "image4.jpg" },
    { id: 5, location: "ชลบุรี", img: "image5.jpg" },
    { id: 6, location: "นครราชสีมา (เขาใหญ่)", img: "image6.jpg" },
    { id: 7, location: "เชียงใหม่", img: "image7.jpg" },
    { id: 8, location: "สระบุรี", img: "image8.jpg" },
    { id: 9, location: "ภูเก็ต", img: "image9.jpg" },
    
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">ผลงานการติดตั้ง AAA Omega</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map(work => (
          <div key={work.id} className="rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
            <img src={work.img} alt={work.location} className="w-full h-64 object-cover" />
            <p className="p-4 font-medium">{work.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;