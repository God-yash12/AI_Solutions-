import React from 'react';

type SectionHeadingProps = {
  children: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return <h1 
  className="text-xl lg:text-4xl text-black tetx-nowrap "
  >{children}</h1>;
};

export default SectionHeading;
