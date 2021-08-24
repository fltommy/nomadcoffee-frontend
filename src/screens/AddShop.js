import { gql, useMutation } from "@apollo/client";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
// import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
// import routes from "../routes";

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


const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    # $url: Uplaod
    $categoryName: String!
    $categorySlug: String!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      # url: $file
      categoryName: $categoryName
      categorySlug: $categorySlug
    ) {
      ok
      error
    }
  }
`;


function AddShop() {
  const history = useHistory();

  const onCompleted = (data) => {
    const { name } = getValues();
    console.log(data);
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    } else {
      setError("result", { message: "add/create ok" });
    }
    // history.push(routes.home, {
    //   message: "Coffee shop Add/created!",
    // });
  };

  const [
    createCoffeeShopMutation, { loading }] = useMutation(CREATE_COFFEE_SHOP_MUTATION, {
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

  const onSubmitValid = (data) => {
    console.log(data);
    if (loading) {
      return;
    }

    // const { name, latitude, longitude, categoryName, categorySlug } = data;
    // createCoffeeShopMutation({
    //   variables: {
    //     name,
    //     latitude,
    //     longitude,
    //     categoryName,
    //     categorySlug,
    //   },
    // });

    createCoffeeShopMutation({
      variables: {
        ...data,
      },
    });
  };

  const clearLoginErorr = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Add/Create Shop" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faStore} size="3x" />
          <Subtitle>
            Add a Coffee Shop
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
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

          <Input
            {...register("latitude", {
              required: "latitude is required.",
            })}
            name="latitude"
            type="text"
            placeholder="latitude"
            hasError={Boolean(formState.errors?.latitude?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.latitude?.message} />

          <Input
            {...register("longitude", {
              required: "longitude is required.",
            })}
            name="longitude"
            type="text"
            placeholder="longitude"
            hasError={Boolean(formState.errors?.longitude?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.longitude?.message} />


          <Input
            {...register("file", {
            })}
            name="file"
            type="file"
            placeholder="file"
            onFocus={clearLoginErorr}
          />


          <Input
            {...register("categoryName", {
              required: "categoryName is required.",
            })}
            name="categoryName"
            type="text"
            placeholder="categoryName"
            hasError={Boolean(formState.errors?.categoryName?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.categoryName?.message} />

          <Input
            {...register("categorySlug", {
              required: "categorySlug is required.",
            })}
            name="categorySlug"
            type="text"
            placeholder="categorySlug"
            hasError={Boolean(formState.errors?.categorySlug?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.categorySlug?.message} />


          <Button
            type="submit"
            value={loading ? "loading..." : "Create Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}
export default AddShop;
