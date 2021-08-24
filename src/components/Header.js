import { useReactiveVar } from "@apollo/client";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 3px 15px;
  color: white;
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Logo />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Link to={routes.home}>
                <Icon>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Icon>
              </Link>
              <Link to={routes.add}>
                <Icon>
                  <FontAwesomeIcon icon={faPen} size="lg" />
                </Icon>
              </Link>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Avatar url={data?.me?.avatarURL} />
              </Icon>
            </IconContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;
