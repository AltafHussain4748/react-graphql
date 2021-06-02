import React, { useState, useEffect } from "react";
import PopupGrid from "./Popup";
import "antd/dist/antd.css";
import { Input, Button } from "antd";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";

const GET_WEATHER_DETAILS = gql`
  query GetWeatherDetails($name: String!) {
    getCityByName(name: $name) {
      id
      name
      weather {
        summary {
          description
        }
        wind {
          speed
          deg
        }
        clouds {
          humidity
        }
      }
    }
  }
`;

interface Variables {
  variables: {
    name: string;
  };
}
function Graphql() {
  const [city, setCity] = useState<string>("Lahore");

  const [getWeatherDetails, { loading, data, error }] =
    useLazyQuery(GET_WEATHER_DETAILS);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    const variables: Variables = { variables: { name: city } };
    getWeatherDetails(variables);
  }, []);

  const handleOnClick = () => {
    const variables: Variables = { variables: { name: city } };
    getWeatherDetails(variables);
  };

  const fetchWeatherJsx = () => {
    if (loading || data === undefined || error) return;
    if (data.getCityByName === null) {
      return (
        <WeatherContainer>
          <ErrorMessage>Please enter valid city name!</ErrorMessage>
        </WeatherContainer>
      );
    }
    const {
      getCityByName: {
        name,
        weather: {
          summary: { description },
          wind: { speed, deg },
          clouds: { humidity },
        },
      },
    } = data;
    return (
      <WeatherContainer>
        <CityName>{name}</CityName>
        <WeatherDescription>{description}</WeatherDescription>
        <WeatherDescription>
          <Span>Humidity:</Span> {humidity}
        </WeatherDescription>
        <WeatherDescription>
          <Span>Speed:</Span> {speed}
        </WeatherDescription>
        <WeatherDescription>
          <Span>Degree:</Span> {deg}
        </WeatherDescription>
      </WeatherContainer>
    );
  };

  return (
    <div>
      <ActionItems>
        <CustomInput
          placeholder="Enter City Name"
          onChange={handleOnChange}
          value={city}
        />
        <CustomButton type="primary" loading={loading} onClick={handleOnClick}>
          Fetch Weather Report
        </CustomButton>
      </ActionItems>
      <Container>{fetchWeatherJsx()}</Container>
    </div>
  );
}

const ActionItems = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 10px 50px;
`;

const CustomInput = styled(Input)`
  flex: 2 1 300px;
`;
const CustomButton = styled(Button)`
  flex: 1 2 300px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherContainer = styled.div`
  box-shadow: 5px 10px 40px #888888;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  height: 300px;
`;

const CityName = styled.p`
  font-size: 30px;
  font-family: serif;
`;

const WeatherDescription = styled.p`
  font-size: 17px;
  font-family: serif;
`;

const Span = styled.span`
  font-size: bold;
  font-size: 20px;
`;

const ErrorMessage = styled(Span)`
  color: red;
`;

export default Graphql;
