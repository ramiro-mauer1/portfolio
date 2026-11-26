import { motion, useScroll } from 'framer-motion';

/** Barra fina arriba que muestra cuánto falta para terminar de leer. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-[55] h-[2px] origin-left bg-[#d8b26e]"
    />
  );
}
