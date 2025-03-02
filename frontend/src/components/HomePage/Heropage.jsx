import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Textbubble from "./Textbubble";
import { Textslider } from "./Textslider";
import Herosection2 from "./Herosection2";

// const Heropage = () => {
//     return (
//       <div className="bg-neutral-950">
//         {/* <Textbubble/> */}
        
//         {/* <Textbubble/>
//         <Herosection2/> */}
//         <HorizontalScrollCarousel />
//       </div>
      
//     );
//   };
  
const Heropage = () => {
  return (
    <div className="bg-neutral-800">
      {/* <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div> */}
      <Textbubble/>
      <HorizontalScrollCarousel />
      {/* <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>  */}
      
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative pt-10 h-[250vh] bg-neutral-950">
      <div className="sticky top-10 flex h-350 items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative  h-[350px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};
//----------------------


export default Heropage;

const cards = [
  {
    url: "src/assets/marketing-milestones.jpg",
    title: "MARKETING",
    id: 1,
  },
  {
    url: "src/assets/planning.webp",
    title: "Planning",
    id: 2,
  },
  {
    url: "src/assets/sales-sell.webp",
    title: "SALES",
    id: 3,
  },
  {
    url: "src/assets/automation-hands.jpg",
    title: "AUTOMATE",
    id: 4,
  },
  {
    url: "/src/assets/get-organized.webp",
    title: "Organized",
    id: 5,
  },
  {
    url: "/src/assets/business-growth.png",
    title: "GROW",
    id: 6,
  },
  
  // {
  //   url: "/imgs/abstract/7.jpg",
  //   title: "Title 7",
  //   id: 7,
  // },
];


