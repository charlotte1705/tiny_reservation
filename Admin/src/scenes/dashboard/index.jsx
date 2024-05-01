import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import * as API from '../../constants/api';
import axios from 'axios';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [hotelData, setHotelData] = useState({});
  const [latestHistory, setLatestHistory] = useState([]);

  useEffect(() => {
    axios.post(API.GET_INFO)
      .then((res) => {
        if (res.data) {
          setHotelData(res.data.result);
        }
      })
      .catch((error) => {
        console.log('Error fetching hotel data:', error);
      });

    axios.post(API.GET_LATEST_HISTORY)
      .then((res) => {
        if (res.data) {
          setLatestHistory(res.data.result);
        }
      })
      .catch((error) => {
        console.log('Error fetching latest history:', error);
      });
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="20px"
      >
        {/* Stat boxes */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={hotelData.count}
            subtitle="Hotels"
            progress="1"
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={hotelData.sale}
            subtitle="Email Submissions"
            progress="1"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={hotelData.userCount}
            subtitle="New Clients"
            progress="1"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={hotelData.bookingCount}
            subtitle="Bookings Complete"
            progress="1"
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* Recent transactions */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6" }}
          gridRow={{ xs: "span 2", sm: "span 1", md: "span 2" }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
          p="20px"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} mb="10px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {latestHistory.map((transaction, i) => (
            <Box
              key={`${transaction._id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[500]}`}
              py="10px"
            >
              <Box flex="1">
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "5px" }}
                >
                  {transaction._id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.firstName} {transaction.lastName}
                </Typography>
              </Box>
              <Box flex="1" textAlign="right">
                <Typography color={colors.grey[100]} fontWeight="600">
                  {transaction.checkOut}
                </Typography>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  color={colors.grey[100]}
                  p="3px 10px"
                  borderRadius="4px"
                  display="inline-block"
                >
                  ${transaction.totalCost}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Geography chart */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6" }}
          gridRow={{ xs: "span 2", sm: "span 1", md: "span 2" }}
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
