"use strict";

const apiCall = async () => {
  const controller = new AbortController();

  const pokeApiResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon/ditto"
  );

  const data = await pokeApiResponse.data();
  console.log(data);
};

apiCall();
