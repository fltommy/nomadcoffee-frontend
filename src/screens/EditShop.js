import { gql, useMutation, useQuery } from "@apollo/client";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
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


const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
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

// delete
const DELETE_COFFEE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop(
    $id: Int!
    ) {
    deleteCoffeeShop(
      id: $id
      ) {
      ok
    }
  }
`;

// see 
const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      name
      latitude
      longitude
      categories {
        name
        slug
      }
    }
  }
`;

function EditShop() {

  const history = useHistory();
  const params = useParams();
  //  console.log(params.id);

  const onCompleted = (data) => {
    const { name } = getValues();
    //console.log(data);

    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    } else {
      setError("result", { message: "Shop Edit ok" });
    }
    // history.push(routes.home, {
    //   message: "Coffee shop Add/created!",
    // });
  };

  const [
    editCoffeeShopMutation, { loading }] = useMutation(EDIT_COFFEE_SHOP_MUTATION, {
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
    // console.log(data);
    // return;
    if (loading) {
      return;
    }
    editCoffeeShopMutation({
      variables: {
        ...data,
      },
    });
  };

  const clearLoginErorr = () => {
    clearErrors("result");
  };


  // delete
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEE_SHOP_MUTATION, {
    variables: {
      id: +params.id,
    },
  });

  const onDeleteClick = () => {
    deleteCoffeeShop();
    history.push("/");
  };


  // see shop
  const { data } = useQuery(SEE_COFFEE_SHOP, {
    variables: {
      id: +params.id, // to int
    },
    onCompleted: (data) => {
      // console.log(data);
    },
  });

  return (
    <AuthLayout>
      <PageTitle title="Edit Shop" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faStore} size="3x" />
          <Subtitle>
            Edit a Coffee Shop
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>

          <Input
            {...register("name", { required: "Name is required!" })}
            name="name"
            type="text"
            placeholder={data?.seeCoffeeShop?.name}
            onFocus={clearLoginErorr}
            hasError={Boolean(formState.errors?.name?.message)}
          />
          <FormError message={formState.errors?.name?.message} />

          <Input
            {...register("latitude", {
              required: "latitude is required.",
            })}
            name="latitude"
            type="text"
            placeholder={data?.seeCoffeeShop?.latitude}
            onFocus={clearLoginErorr}
            hasError={Boolean(formState.errors?.latitude?.message)}
          />
          <FormError message={formState.errors?.latitude?.message} />

          <Input
            {...register("longitude", {
              required: "longitude is required.",
            })}
            name="longitude"
            type="text"
            placeholder={data?.seeCoffeeShop?.longitude}
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
            placeholder={data?.seeCoffeeShop?.categories[0].name}
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
            placeholder={data?.seeCoffeeShop?.categories[0].slug}
            hasError={Boolean(formState.errors?.categorySlug?.message)}
            onFocus={clearLoginErorr}
          />
          <FormError message={formState.errors?.categorySlug?.message} />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Edit"}
            disabled={!formState.isValid || loading}
          />
          <button onClick={onDeleteClick}>DELETE ❌</button>
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}
export default EditShop;
