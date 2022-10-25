import IcomoonReact from 'icomoon-react';
import iconSet from "../../assets/selection.json";
import IconProps from "../../model/IIconProps";

export default function Icon(props: IconProps): JSX.Element {
  const { color, size = "100%", icon, className = "" } = props;
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
}