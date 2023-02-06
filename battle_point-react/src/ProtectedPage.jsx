import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
import Profile from "./Profile";

export default function ProtectedPage({childern}) {
  const { username } = useSelector((state) => state.profile.data)
  if (!username) {
    return <Navigate to="/" replace />;
  } else {
    return childern;
  }
}