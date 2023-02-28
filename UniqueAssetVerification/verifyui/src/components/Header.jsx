import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useCallback, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ethers } from "ethers";

export default function Header() {
  const { user, setUser, balance, setBalance, provider, setProvider } =
    useContext(UserContext);
  const getProvider = () => {
    const ethereum = getEthereumObject(); //window?.ethereum
    const providerValue = new ethers.providers.Web3Provider(ethereum);
    setProvider(providerValue);
    return providerValue;
  };
  useEffect(() => {
    getProvider();
  }, [0]);
  const [errorMessage, setErrorMessage] = useState("");
  const getuserBalance = async (address) => {
    console.log("calling balance for address:", address);
    const balanceInWei = await provider.getBalance(address, "latest");
    const balanceInEth = await ethers.utils.formatEther(balanceInWei);
    return balanceInEth;
  };
  const getEthereumObject = () => {
    const { ethereum } = window;

    if (!ethereum) {
      handleAddComment("Ethereum object doesn't exist!");
      throw new Error("Ethereum object doesn't exist!");
    } else {
      return ethereum;
    }
  };

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    const network = await provider.getNetwork();
    setUser({
      address: address,
      chain: network.name,
    });
    const balance = await getuserBalance(address);
    setBalance(balance);
  };
  const walletConnect = () => {
    const providerValue = getProvider();
    console.log("providerValue:", providerValue);
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
    console.log("connect called!", provider, errorMessage);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Document Verification
          </Typography>
          <Button color="inherit" onClick={walletConnect}>
            Connect
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
