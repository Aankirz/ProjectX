import { useQuery } from "@airstack/airstack-react";
import { init, fetchQueryWithPagination } from "@airstack/node";

init("YOUR_AIRSTACK_API_KEY");
const GET_VITALIK_LENS_FARCASTER_ENS = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;

const Airstack = () => {
  const { data, loading, error } = useQuery(GET_VITALIK_LENS_FARCASTER_ENS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Render your component using the data returned by the query
  console.log(data);
};

export default Airstack;