import lighthouse from "@lighthouse-web3/sdk";

function LightHouse() {
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file) => {
    const dealParams = {
      num_copies: 2,
      repair_threshold: 28800,
      renew_threshold: 240,
      miner: ["t017840"],
      network: "calibration",
      add_mock_data: 2,
    };
    const output = await lighthouse.upload(
      file,
      "08eaf185.aa45a205ba274dbb8169c58c08c34fe1",
      false,
      null,
      progressCallback,
      dealParams
    );
    console.log("File Status:", output);
    console.log("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  };

  return (
    <div className="App">
      <input onChange={(e) => uploadFile(e.target.files)} type="file" />
    </div>
  );
}

export default LightHouse;
