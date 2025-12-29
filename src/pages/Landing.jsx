import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Secure JWT Authentication",
  "Create, Edit & Manage Todos",
  "Sub Todos with Progress Tracking",
  "Due Dates & Overdue Highlight",
  "Fast, Responsive & Mobile Friendly",
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
        >
          Organize Your Tasks <br />
          <span className="text-blue-600">Boost Your Productivity</span>
        </motion.h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A modern Todo application to plan your day, manage tasks,
          track progress and stay focused — all in one place.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow"
          >
            Get Started <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-zinc-600"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Everything You Need
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6 flex gap-3 items-start"
            >
              <CheckCircle className="text-green-500 mt-1" />
              <p className="text-gray-700 dark:text-gray-300">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-zinc-900 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Account", desc: "Sign up in seconds" },
              { step: "02", title: "Add Todos", desc: "Plan your daily tasks" },
              { step: "03", title: "Track Progress", desc: "Complete & grow" },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-gray-100 dark:bg-zinc-800 rounded-2xl p-8"
              >
                <div className="text-blue-600 text-4xl font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} TodoPro • Built by Kirtan 🚀
      </footer>
    </div>
  );
};

export default Landing;
