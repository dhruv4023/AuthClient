// Import necessary dependencies and components
import { Button } from "@mui/material";
import Loading from "Components/Loader/Loading";
import WidgetsOnPage from "Components/WidgetsOnPage";
import WidgetWrapper from "Components/StyledComponents/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileWidget from "Pages/LoginSignPage/Widgets/EditProfileWidget";
import UserWidgets from "Pages/LoginSignPage/Widgets/UserWidgets";
import { getUser } from "Pages/LoginSignPage/Widgets/WidgetFunctions";

// Define the ProfilePage component
export const ProfilePage = () => {
  const { UID } = useParams();
  const admin = useSelector((state) => state.user);
  const [editProf, setEditProf] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Use the useEffect hook to fetch user data based on the UID parameter
  useEffect(() => {
    UID && getUser(setUser, UID, navigate);
  }, [UID,navigate]);
  return (
    <>
      {/* Render WidgetsOnPage component */}
      <WidgetsOnPage
        leftComponent={
          <LeftComponents
            user={user}
            UID={UID}
            admin={admin}
            setEditProf={setEditProf}
          />
        }
        rightComponent={
          <RightComponents
            UID={UID}
            admin={admin}
            user={user}
            editProf={editProf}
            setEditProf={setEditProf}
          />
        }
      />
    </>
  );
};

const LeftComponents = ({ setEditProf, UID, admin, user }) => {
  return (
    <>
      {user ? (
        // Render UserWidgets component with specific props
        <UserWidgets
          setEditProf={setEditProf}
          user={admin?.username === UID ? admin : user}
          admin={admin?.username === UID}
        />
      ) : (
        // Render Loading component while user data is being fetched
        <Loading />
      )}
    </>
  );
};

const RightComponents = ({ admin, editProf, setEditProf, UID }) => {
  const navigate = useNavigate();
  return (
    <>
      {editProf ? (
        <>
          {/* Render EditProfileWidget component with specific props */}
          <EditProfileWidget setEditProf={setEditProf} user={admin} />
        </>
      ) : (
        <WidgetWrapper>
          {admin?.username === UID ? (
            <>Click on Pencil Icon to Edit Your Profile</>
          ) : (
            <Button onClick={()=>navigate("/login")}>Login</Button>
          )}
        </WidgetWrapper>
      )}
    </>
  );
};
