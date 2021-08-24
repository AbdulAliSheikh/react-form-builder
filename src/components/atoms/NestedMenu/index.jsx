import './NestedMenu.css';

export const NestedMenu = ({
  className,
  show,
  children,
}) =>
  (
    <div className={'nested-menu  ' + className} style={{ left: (show) ? '300px' : 0 }}>
      {children}
    </div>
  );

