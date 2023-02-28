import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export default function ShowBalance() {
  const [image, setImage] = useState(null);
  const { user, balance } = useContext(UserContext);

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "##E3E7E7", height: "100px", width: "400px" }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",

            }}
          >
            <h4>👋 {user.address ? user.address : ""}</h4>
            Balance: {balance ? balance + " ETH": "Connect Your Wallet"} 
          </div>
        </div>
      </Box>
    </Container>
  );
}
