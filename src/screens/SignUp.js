import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

// const CREATE_ACCOUNT_MUTATION = gql`
//   mutation createAccount(
//     $name: String!
//     $username: String!
//     $email: String!
//     $password: String!
//   ) {
//     createAccount(
//       name: $name
//       username: $username
//       email: $email
//       password: $password
//     ) {
//       ok
//       error
//     }
//   }
// `;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
    $name: String!    
  ) {
    createAccount(
      username: $username
      email: $email
      password: $password
      name: $name
    ) {
      ok
      error
    }
  }
`;

function SingUp() {
  const history = useHistory();

  const onCompleted = (data) => {
    const { username, password } = getValues();

    console.log(data);

    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState } = useForm({
      mode: "onChange"
    });

  // const onSubmitValid = (data) => {
  //   console.log(data);
  //   if (loading) {
  //     return;
  //   }
  //   createAccount({
  //     variables: {
  //       ...data,
  //     },
  //   });
  // };

  const onSubmitValid = (data) => {
    console.log(data);

    if (loading) {
      return;
    }
    const { username, email, password, name } = data;
    createAccount({
      variables: {
        username,
        email,
        password,
        name,
      },
    });
  };

  const clearLoginErorr = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "username should be longer than 5"
              }
            })}
            name="username"
            type="text"
            placeholder="username"
            hasError={Boolean(formState.errors?.username?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.username?.message} />

          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            name="email"
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.email?.message} />


          <Input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 2,
                message: "username should be longer than 2"
              }
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.password?.message} />


          <Input
            {...register("name", {
              required: "Name is required.",
            })}
            name="name"
            type="text"
            placeholder="Name"
            hasError={Boolean(formState.errors?.name?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.name?.message} />


          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;
