import React, { useState, useEffect } from 'react';
import {
  Button,
  Badge,
  Modal,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { getDatabase, ref, push, set } from 'firebase/database';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import db from '../../utils/firebase';
const Notification = () => {
  const [newReviews, setNewReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    const reviewsRef = db.ref('reviews');
    reviewsRef.on('value', (snapshot) => {
      const review = snapshot.val();
      setNewReviews((prevReviews) => [...prevReviews, review]);
    });
    return () => {
      reviewsRef.off();
    };
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
    setNewReviews([]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNewReviews([]);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={newReviews.length} color="secondary">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem disabled={newReviews.length === 0}>
          {newReviews.length === 0
            ? 'No new reviews'
            : `${newReviews.length} new review${
                newReviews.length === 1 ? '' : 's'
              }:`}
        </MenuItem>
        {newReviews.map((review) => (
          <>
            <MenuItem key={review.id} onClick={handleClose}>
              {review.fullName}
              {review.content}
            </MenuItem>
          </>
        ))}
      </Menu>
    </>
  );
};

export default Notification;
