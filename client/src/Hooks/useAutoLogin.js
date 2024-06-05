import { useEffect } from "react";
import { useState } from "react";
import { setUser } from "../Store/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const useAutoLogin = () => {
  const BACKEND_PATH = process.env.REACT_APP_BACKEND_PATH;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/refresh`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            fullname:response.data.user.fullname,
            profileImage:response.data.user.profileImage,
            auth: response.data.auth,
          };
          dispatch(setUser(user));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  },
  // eslint-disable-next-line
  []);

  return loading;
};

export default useAutoLogin;
