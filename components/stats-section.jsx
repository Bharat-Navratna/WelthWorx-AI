"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { statsData } from "@/data/landing";

// Wrapper that gates a CountUp on InView — one component per stat (no hooks in loops)
function StatItem({ item, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-100 mb-2">
        {item.prefix || ""}
        {inView ? (
          <CountUp
            end={item.value}
            duration={3}
            decimals={item.value % 1 !== 0 ? 1 : 0}
            separator=","
          />
        ) : (
          item.value
        )}
        {item.suffix || ""}
      </div>
      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {item.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="mt-5 py-20 bg-blue-100 dark:bg-blue-950/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {statsData.map((item, index) => (
            <StatItem key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
