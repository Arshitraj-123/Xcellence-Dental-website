import React from 'react';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const maxWidths: Record<ContainerSize, string> = {
  xs: 'max-w-container-xs',
  sm: 'max-w-container-sm',
  md: 'max-w-container-md',
  lg: 'max-w-container-lg',
  xl: 'max-w-container-xl',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  className = '',
  as: Tag = 'div',
}) => {
  return (
    <Tag className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidths[size]} ${className}`}>
      {children}
    </Tag>
  );
};
