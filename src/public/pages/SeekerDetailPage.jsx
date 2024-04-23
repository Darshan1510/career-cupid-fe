import React from "react";
import { useParams } from "react-router-dom";
import SeekerDetail from "../components/SeekerDetail";


export default function SeekerDetailPage() {
  const { username } = useParams();


  React.useEffect(() => {
  
  }, []);
  return (
    <div className="w-100 text-center">
    <SeekerDetail username={username}/>
    </div>
  );
}
