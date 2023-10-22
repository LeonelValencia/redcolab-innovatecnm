import { useGetAllUsers } from "../../components/webServices/user";
import CircularSpinner from "../../components/spinners";
import UserWelcome from "./newUser";

export default function DrawNetwork({ userId, isNewUser, userInfo }) {
  let users = [];
  let loading = false;
  //const { users, loading } = useGetAllUsers();
  console.log(userInfo);

  if (loading) {
    return <CircularSpinner />;
  }

  return (
    <div>
      {isNewUser === "yes" && (
        <UserWelcome userId={userId} userInfo={userInfo} />
      )}
      network
    </div>
  );
}

