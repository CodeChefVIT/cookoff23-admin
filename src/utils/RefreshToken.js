import useTokenStore from "@/store/tokenProvider";
import axios from "axios";
import Router from "next/router";

export default function RefreshToken() {
    const refresh_token = localStorage.getItem("refresh_token");
  
    return axios
      .post("https://api-cookoff-prod.codechefvit.com/auth/refresh", {
        refreshToken: refresh_token,
      })
      .then((response) => {
        useTokenStore.setState({
          access_token: response.data.accessToken,
        });
        localStorage.setItem("access_token", response.data.accessToken);
        console.log("Token refreshed");
      })
      .catch((error) => {
        // alert("Session Expired! Login again");
        // Router.push("/");
        console.error("Token refresh failed:", error);
      });
  }
  
