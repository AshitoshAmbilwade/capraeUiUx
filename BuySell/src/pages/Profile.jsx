import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import BuyerProfile from "../components/BuyerProfile";
import SellerProfile from "../components/SellerProfile";

const Profile = () => {
  const { id, type } = useParams(); // route like /profile/:type/:id
  const { buyers, sellers } = useContext(DataContext);

  let profileData;
  if (type === "buyer") {
    profileData = buyers.find((b) => String(b.id) === id);
  } else if (type === "seller") {
    profileData = sellers.find((s) => String(s.id) === id);
  }

  if (!profileData) {
    return <p className="p-6 text-gray-500">Profile not found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {type === "buyer" ? (
        <BuyerProfile buyer={profileData} />
      ) : (
        <SellerProfile seller={profileData} />
      )}
    </div>
  );
};

export default Profile;
