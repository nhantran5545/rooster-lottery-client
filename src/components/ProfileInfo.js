import React from "react";
import { motion } from "framer-motion";

const ProfileInfo = ({ label, value }) => (
  <motion.div
    className="p-6 bg-white rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <h2 className="text-xl font-semibold text-gray-700">{label}</h2>
    <p className="text-gray-600 mt-2">{value}</p>
  </motion.div>
);

export default ProfileInfo;
