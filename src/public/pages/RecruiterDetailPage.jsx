import React from "react";
import { useParams } from "react-router-dom";
import RecruiterDetail from "../components/RecruiterDetail";


export default function RecruiterDetailPage() {
  const { username } = useParams();


  React.useEffect(() => {
  
  }, []);
  return (
    <div className="w-100 text-center">
    <RecruiterDetail username={username}/>
    </div>
  );
}
