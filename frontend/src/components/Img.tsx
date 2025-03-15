interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
  }
  
  export const Img: React.FC<ImgProps> = ({ src, alt, className, ...props }) => {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        loading="lazy" 
        decoding="async"
        aria-label="image"
        {...props} 
      />
    );
  };
  