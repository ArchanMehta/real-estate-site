import React, { useContext, useState } from "react";
import SearchBar from "../../component/SearchBar/SearchBar";
import "../Properties/Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../component/PropertyCard/PropertyCard";
import UserDetailContext from "../../context/UserDetailContext";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: {  favourites },
  } = useContext(UserDetailContext);
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching the data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth property-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="flexCenter paddings innerWidth properties">
          {

            data
              .filter((property) =>
                favourites.includes(property.id)
              )

              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Favourites;
