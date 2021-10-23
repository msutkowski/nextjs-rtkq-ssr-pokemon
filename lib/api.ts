import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  extractRehydrationInfo(action) {
    if (action.type === HYDRATE) {
      return action.payload.api;
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<
      { species: { name: string }; sprites: { front_shiny: string } },
      string
    >({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonList: builder.query<{ results: Array<{ name: string }> }, void>({
      query: () => `pokemon/`,
    }),
  }),
  keepUnusedDataFor: 5,
});

// Export hooks for usage in functional components
export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  getRunningOperationPromises,
} = api;

// export endpoints for use in SSR
export const { getPokemonByName, getPokemonList } = api.endpoints;
