/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // เพื่อให้ Tailwind สแกนไฟล์ React ทั้งหมด[cite: 4, 11]
  ],
  theme: {
    extend: {
      // โอนิจังสามารถเพิ่มสีจากหน้า components.html ไว้ที่นี่ได้ค่ะ
    },
  },
  plugins: [],
}