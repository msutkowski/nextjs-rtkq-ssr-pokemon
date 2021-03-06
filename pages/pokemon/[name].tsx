import Head from "next/head";
import { useGetPokemonByNameQuery } from "../../lib/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/dist/client/router";

// Partial because first render (will get empty props while `getStaticProps` runs)
export default function Pokemon() {
  const router = useRouter();

  const name = router.query.name;
  const result = useGetPokemonByNameQuery(
    typeof name === "string" ? name : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );
  const { isFetching, isLoading, error, data, refetch } = result;

  return (
    <div>
      <Head>
        <title>{data?.species.name ?? ""}</title>
      </Head>
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <div
            style={{
              display: "flex",
              width: 200,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
            <button onClick={refetch}>{isFetching ? "..." : "Refetch"}</button>
          </div>
        ) : null}
      </article>
    </div>
  );
}
