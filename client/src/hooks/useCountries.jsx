import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  code: country.cca2,
  name: country.name.common,
  label: `${country.name.common} ${country.flag}`,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  return { getAll };
};

export default useCountries;

// cloudName: "da6byla2x",
//         uploadPreset: "bqpuobxx",