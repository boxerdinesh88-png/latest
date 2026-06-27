import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 bg-[#070A13] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute w-72 h-72 rounded-full glow-bg-purple opacity-40 blur-3xl animate-pulse" />
          <div className="absolute w-72 h-72 rounded-full glow-bg-cyan opacity-40 blur-3xl animate-pulse delay-700" />
          
          <div className="relative flex flex-col items-center">
            {/* Spinning Neon Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-2 border-purple-500 border-l-cyan-400 border-b-transparent shadow-[0_0_25px_rgba(139,92,246,0.35)]"
            />
            
            {/* Pulsing Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-[0_2px_10px_rgba(139,92,246,0.4)]">
                Dinesh Kumar
              </h2>
              <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase mt-2">
                System Initializing...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
