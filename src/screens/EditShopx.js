import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../component/Auth/Button";
import FormBox from "../component/Auth/FormBox";
import {
  MainSection,
  SectionBox,
  SubSectionBox,
} from "../component/shared/ScreenMain";

const SSectionBox = styled(SectionBox)`
  margin-top: 50px;
`;
const TheTitle = styled.div`
  position: absolute;
  font-size: 20px;
  top: 330px;
  left: 300px;
`;
const InnerBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const SFormBox = styled(FormBox)`
  input {
    &::placeholder {
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categoryItem: String
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categoryItem: $categoryItem
    ) {
      ok
      error
    }
  }
`;
const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      name
      latitude
      longitude
      categories {
        name
      }
    }
  }
`;
const DELETE = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
    }
  }
`;

export default ({ coffeeShops, pathname }) => {
  const history = useHistory();
  const path = pathname.split("/");
  const thePath = path[[path.length - 1]];
  const id = coffeeShops?.filter((shop) => shop.name === thePath)[0].id;
  const { register, handleSubmit, formState, setError, clearErrors } = useForm({
    mode: "onChange",
  });
  const { data } = useQuery(SEE_COFFEE_SHOP, {
    variables: {
      id,
    },
  });

  const [editCoffeeShop, { loading }] = useMutation(EDIT_MUTATION, {
    onCompleted: (data) => {
      const {
        editCoffeeShop: { ok, error },
      } = data;
      if (!ok) {
        setError("result", {
          message: error,
        });
        return;
      }
      console.log(error);
    },
  });
  const [deleteCoffeeShop] = useMutation(DELETE, {
    variables: {
      id,
    },
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude, categoryItem } = data;
    editCoffeeShop({
      variables: {
        id,
        name,
        latitude,
        longitude,
        categoryItem,
      },
    });
  };
  const clearLoginErorr = () => {
    clearErrors("result");
  };
  const onDeleteClick = () => {
    deleteCoffeeShop();
    history.push("/");
  };
  return (
    <SSectionBox>
      <SubSectionBox />
      <MainSection>
        <TheTitle>Edit</TheTitle>
        <InnerBox>
          <SFormBox onSubmit={handleSubmit(onSubmitValid)}>
            <input
              {...register("name", { required: "Name is required!" })}
              type="text"
              placeholder="name"
              onFocus={clearLoginErorr}
            />
            <input
              {...register("latitude")}
              type="text"
              placeholder={data?.seeCoffeeShop?.latitude}
              onFocus={clearLoginErorr}
            />
            <input
              {...register("longitude")}
              type="text"
              placeholder={data?.seeCoffeeShop?.longitude}
              onFocus={clearLoginErorr}
            />
            <input
              {...register("categoryItem")}
              type="text"
              value={data?.seeCoffeeShop?.categories?.map((item) => item.name)}
              onFocus={clearLoginErorr}
            />
            <Button
              type="submit"
              value={loading ? "Loading..." : "Edit"}
              disabled={!formState.isValid || loading}
            />
            <button onClick={onDeleteClick}>❌</button>
          </SFormBox>
        </InnerBox>
      </MainSection>
      <SubSectionBox />
    </SSectionBox>
  );
};
