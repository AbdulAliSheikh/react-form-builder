import './CustomButton.css';

export const CustomButton = ({
  inverted,
  date,
  onClick,
  style,
  children,
}) =>
  (<button className={`round-button ${(inverted) ? 'inverted' : (date) ? 'date' : 'dotted'}`}
           onClick={onClick} style={style}>{children}</button>);

