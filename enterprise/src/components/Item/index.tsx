import { IconBaseProps } from "react-icons";
import { MdArrowForwardIos } from "react-icons/md";
import { Container } from "./styles";

type ItemProps = {
  icon?: React.ComponentType<IconBaseProps>;
  router: string;
  title: string;
  subtitle?: string;
};

export function Item({ router, title, subtitle, icon: Icon }: ItemProps) {
  return (
    <Container to={router}>
      <div>
        <h3>{title}</h3>
        <div className="subtitle">
          {Icon && <Icon color="#666360" size={20} />}
          <p>{subtitle}</p>
        </div>
      </div>
      <MdArrowForwardIos color="#545454" size={18} />
    </Container>
  );
}
