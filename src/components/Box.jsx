import { BiCalendarHeart } from "react-icons/bi";
import { MdFamilyRestroom } from "react-icons/md";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { FaUmbrellaBeach } from "react-icons/fa";
import { motion } from "framer-motion";

const items = [
  {
    icon: <FaUmbrellaBeach className="text-5xl mb-2 text-green-600" />,
    title: "Perjalanan Pribadi",
    desc: "Kebebasan untuk menikmati liburan sesuai dengan keinginan Anda, dengan berbagai pilihan aktivitas dan fasilitas yang memanjakan.",
  },
  {
    icon: <BiBriefcaseAlt2 className="text-5xl mb-2 text-green-600" />,
    title: "Perjalanan Bisnis",
    desc: "Efisiensi dan kenyamanan untuk kebutuhan perjalanan bisnis Anda dengan layanan profesional.",
  },
  {
    icon: <MdFamilyRestroom className="text-5xl mb-2 text-green-600" />,
    title: "Perjalanan Keluarga",
    desc: "Ciptakan momen tak terlupakan bersama keluarga dengan akomodasi dan kegiatan yang ramah keluarga.",
  },
  {
    icon: <BiCalendarHeart className="text-5xl mb-2 text-green-600" />,
    title: "Pernikahan",
    desc: "Rayakan momen spesial Anda dengan perjalanan romantis yang dirancang khusus untuk pasangan.",
  },
];

export default function Box() {
  return (
    <div className="absolute top-[475px] w-full px-4">
      <div className="flex flex-wrap justify-center gap-4 text-center">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="bg-white p-5 w-[250px] h-[250px] shadow-2xl rounded-xl flex flex-col items-center hover:shadow-green-200 transition-all"
          >
            {item.icon}
            <p className="font-bold">{item.title}</p>
            <p className="text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
