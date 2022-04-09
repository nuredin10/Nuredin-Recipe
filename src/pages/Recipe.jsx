import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
  const [details, setDetails] = useState([]);
  let params = useParams();
  const [activeTab, setActiveTab] = useState("instructions");
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <DetailWrapper>
      <ImageTitle>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </ImageTitle>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <ul>
          {details.extendedIngredients.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        )}

        
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`

  margin-top: 10%;
  margin-bottom: 5rem;
  display: flex;

  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-heightL 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }

  h3{
    margin-left: 10%;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-left: 10%;
  font-weight: 600;
`;

const Info = styled.div`
width: 50%;
float: right;
  margin-left: -1rem;
`;

const ImageTitle = styled.div`
  width: 50%;
  img{
    width: 100%;
  }
`

export default Recipe;
