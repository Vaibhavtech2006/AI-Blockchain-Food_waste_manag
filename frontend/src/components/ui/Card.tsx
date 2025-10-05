import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
  className?: string;
}

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true, 
  className,
  ...props 
}: CardProps) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-gray-800 border border-gray-700',
    glass: 'bg-gray-800/30 backdrop-blur-xl border border-gray-700/50',
    elevated: 'bg-gray-800 border border-gray-700 shadow-2xl shadow-black/20',
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:shadow-black/20 hover:border-gray-600' : '';

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;