
import { toast } from 'react-toastify';
export const toastAlertSuccess =  (text) => {
   toast.success(text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export const toastAlertFail = (text) => {
  toast.error(text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {toastAlertSuccess,toastAlertFail}