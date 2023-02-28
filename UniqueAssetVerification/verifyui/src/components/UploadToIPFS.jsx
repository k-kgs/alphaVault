import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useContext } from "react";
import pinFileToIPFS from "./upload";
import { UserContext } from "../context/userContext";
import { ethers } from "ethers";
import UNIQUEASSETNFT from "../../../build/contracts/UniqueAssetNFT";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";

export default function UploadToIPFS() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { user, setUser, balance, setBalance, provider, setProvider } =
    useContext(UserContext);
  const [isLoadingFileToIPFS, setIsLoadingFileToIPFS] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isMinted, setIsMinted] = useState(false);
  const [isMintingError, setIsMintingError] = useState(false);
  const [transactionURI, setTransactionURI] = useState("");
  const UniqueAssetNFTContractAddress =
    "0xEDe51695D24379503A2c97f558DcBCB52640e693";
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadFileToIPFS = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await pinFileToIPFS(body);
    console.log("Uploaded Successfully!!", response);
    if ('isDuplicate' in response) {
      console.log("Setting duplicate");
      setIsDuplicate(true);
    }
    return response;
  };

  const mintNFT = async (data) => {
    const ipfsHash = data["IpfsHash"];
    const tokenURI = `https://ipfs.io/ipfs/${ipfsHash}`;
    const signer = provider.getSigner();
    const UniqueAssetNFTContract = new ethers.Contract(
      UniqueAssetNFTContractAddress,
      UNIQUEASSETNFT.abi,
      signer
    );
    console.log("UniqueAssetNFTContract", UniqueAssetNFTContract);
    try {
      const nftTxn = await UniqueAssetNFTContract.mintAssetNFT(
        user.address,
        ipfsHash,
        tokenURI
      );
      setIsMinting(true);
      const txn = await nftTxn.wait();
      setIsMinting(false);
      console.log(`Mined hash: ${nftTxn.hash}`);
      console.log(
        `Minted, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`
      );
      setIsMinted(true);
      setTransactionURI(
        `Minted, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`
      );
    } catch (error) {
      setIsMintingError(true);
      console.log("Error: Minting Failed ", error, isDuplicate);
      if (isDuplicate) {
        setErrorText("Duplicate Document Detected");
      } else {
        setErrorText("Error: Minting Failed");
      }
    }
  };

  const uploadFileToIPFSAndMint = async () => {
    const res = await uploadFileToIPFS();
    // const res = {
    //   IpfsHash: "QmWzvQTmeFnqHCJbhk2bY27Buw1kUGE9Rw3n5NC7GrzM5d",
    //   PinSize: 122152,
    //   isDuplicate: true,
    //   Timestamp: "2023-02-26T18:32:06.926Z",
    // };
    await mintNFT(res);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "##E3E7E7", height: "50px", width: "400px" }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <h4>Select Document</h4>
            {/* <img src={createObjectURL} /> */}
            <input type="file" name="myImage" onChange={uploadToClient} />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={uploadFileToIPFSAndMint}
            >
              Verify and Mint
            </button>
          </div>
          <div>
            {isDuplicate}
            {(isMinting || isLoadingFileToIPFS) && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            {isMinted && <Alert severity="success">{transactionURI}</Alert>}
            {isMintingError && <Alert severity="error">{errorText}</Alert>}
          </div>
        </div>
      </Box>
    </Container>
  );
}

//IpfsHash: "QmWzvQTmeFnqHCJbhk2bY27Buw1kUGE9Rw3n5NC7GrzM5d"
// 2: ​QmWzvQTmeFnqHCJbhk2bY27Buw1kUGE9Rw3n5NC7GrzM5d
// PinSize: 122152
// ​isDuplicate: true
// Timestamp: "2023-02-26T18:32:06.926Z"
