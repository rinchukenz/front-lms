import React from 'react';

const GradientButton = ({
  text,
  onClick,
  variant = 'primary',
  Icon,
  className = ''
}) => {
  const baseClasses = "group relative px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-500/25";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-violet-500/30 border border-violet-400/20",
    secondary: "bg-white/80 backdrop-blur-sm text-violet-700 border-2 border-violet-200/60 hover:border-violet-300/80 hover:bg-white/90 shadow-lg hover:shadow-violet-500/15 hover:text-violet-800"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {Icon && (
          <Icon 
            size={18} 
            className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
          />
        )}
        <span className="whitespace-nowrap font-medium">{text}</span>
      </div>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10"></div>
    </button>
  );
};

export default GradientButton;