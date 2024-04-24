import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner({ loading }) {
  let color = React.useState("#ffffff");
  return (
    <div>
      <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
