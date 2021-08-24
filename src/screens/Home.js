import { logUserOut } from "../apollo";

// function Home() {
//   return (
//     <div>
//       <h1>Welcome we did it!</h1>
//       <button onClick={() => logUserOut()}>Log out now!</button>
//     </div>
//   );
// }
// export default Home;


import { gql, useQuery } from "@apollo/client";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


const Border = styled.div`
  width: 620px;
  height: 1px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const ShopContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 620px;
  padding-bottom: 20px;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

const PhotoFile = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 15px;
`;

const ShopData = styled.div`
  width: 315px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div:nth-child(2) {
    padding-bottom: 5px;
  }
`;

const ShopHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

const ShopTitle = styled(FatText)`
  font-size: 20px;
  font-style: italic;
  padding: 5px 10px;
`;

const ShopCategories = styled.div`
  font-size: 12px;
  padding: 1px 10px;
  opacity: 0.8;
`;

const ShopAddress = styled.div`
  padding: 5px 10px;
`;

const ShopRank = styled.span`
  padding: 0 5px 0 10px;
  color: tomato;
`;
const ShopRankText = styled.span`
  font-weight: 600;
`;
const ShopRankComment = styled.span`
  opacity: 0.8;
  font-size: 12px;
  margin-left: 5px;
`;


const SEE_COFFEE_SHOPS = gql`
  # query seeCoffeeShops {
  #   seeCoffeeShops {
  query seeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {      
      id
      name
      latitude
      longitude
      user {        
        username
        avatarURL
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
`;

function Home() {
  // const { data } = useQuery(SEE_COFFEE_SHOPS);
  const [lastId, setLastId] = useState(0);
  const { data } = useQuery(SEE_COFFEE_SHOPS, {
    variables: {
      lastId,
    },
  });
  console.log(data);

  return (
    <div>
      <Border />
      {data?.seeCoffeeShops?.map((shop, index) => (
        <ShopContainer key={shop.id}>
          <PhotoFile src={shop.photos[0]?.url} />
          <ShopData>
            <div>
              <ShopHeader>
                <div>
                  <Avatar lg url={shop.user?.avatarURL} />
                  <Username>{shop.user?.username}</Username>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </div>
              </ShopHeader>
              <ShopTitle>{shop.name}</ShopTitle>
              <ShopCategories>
                {shop.categories?.map((category) => (
                  <span key={category.id}>{category.name}</span>
                ))}
              </ShopCategories>
              <ShopAddress>
                Address: latitude-{shop.latitude}, longitude-{shop.longitude}
              </ShopAddress>
            </div>
            <div>
              <ShopRank>
                <FontAwesomeIcon icon={faStar} />
              </ShopRank>
              <ShopRankText>190</ShopRankText>
              <ShopRankComment>(11 comments)</ShopRankComment>
            </div>
          </ShopData>
        </ShopContainer>
      ))}


      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>

    </div>
  );
}
export default Home;
