import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";

export default function ShowNFT() {
  const [image, setImage] = useState(null);
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "##E3E7E7", height: "80px", width: "400px" }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
              marginTop: "20px"
            }}
          >
            <h4>Verified Document List</h4>
            <ul>
              <li>Document 1</li>
              <li>Document 2</li>
              <li>Document 3</li>
            </ul>
          </div>
        </div>
      </Box>
    </Container>
  );
}
