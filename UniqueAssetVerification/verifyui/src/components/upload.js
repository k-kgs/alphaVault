import axios from "axios";


const pinataApiKey = "a06923234f8a928efe13" //process.env.PINATA_API_KEY;
const pinataSecretApiKey = "3460e0b8a1b1f70a8faf4580e19ed3d95d53c7a57b2b129edfdd16d848f49b3b" //process.env.PINATA_SECRET_API_KEY;
export default async function pinFileToIPFS(data) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  console.log(res.data);
  return res.data
}
