import * as React from 'react';
import { useSelector } from "react-redux";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../dashboardComponents/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const user = useSelector((state) => state.users);

  return (
    <React.Fragment>
      <Title>Total Customer's</Title>
      <Typography component="p" variant="h4">
        {user && user ? user.length : 0}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All Customers
        </Link>
      </div>
    </React.Fragment>
  );
}
