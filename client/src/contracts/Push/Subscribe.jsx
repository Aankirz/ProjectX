import { useSigner, useAccount } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";

function Subscribe() {
  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner();
  const {
    address,
    isError: accountIsError,
    isLoading: accountIsLoading,
  } = useAccount();

  async function subscribe() {
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:80001:0x57400D7688C5Ea5d295dd25D919D9e9492995Aef",
      userAddress: `eip155:80001:0xADA3175373Cba57bDBA13c49A561c21eB9f25233`,
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  }

  return (
    <div>
      <div>
        {signerIsLoading || accountIsLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Address: {address}</p>
        )}
      </div>
      <div>
        {signerIsError && <p>Error loading signer data</p>}
        {accountIsError && <p>Error loading account data</p>}
      </div>
      <button
        className="mx-8 mb-8 bg-gradient-to-r from-pink-700 to-purple-600 px-8 py-2
        flex justify-center items-center rounded-xl text-white border border-white"
        onClick={subscribe}
      >
        Opt-In
      </button>
    </div>
  );
}

export default Subscribe;
