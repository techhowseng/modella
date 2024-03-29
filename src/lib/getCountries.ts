import countries from "lib/countries.mini.json";
import countriesList from "lib/countries_min.json";
import statesList from "lib/provinces.json";

export const getCountries = () => {
  return countriesList.map((country) => ({
    value: country.id,
    label: country.name,
  }));
};

export const getState = (country: string) => {
  return countries[country];
};

export const getCountriesList = () => {
  return countriesList.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
};

export const getStatesList = (countryId: string) => {
  return statesList
    .filter((state) => state.country_id === countryId)
    .map((item) => {
      return {
        value: item.country_id,
        label: item.name,
      };
    });
};

export const getCountryPhoneCode = () => {
  return getCountriesList().map((country) => ({
    key: country.id,
    value: country.dial_code,
    title: `${country.name} (${country.dial_code})`,
    label: `${country.name} (${country.dial_code})`,
  }));
};

export const getStateById = (stateId: string) => {
  const state = statesList.find((state) => state.id === stateId);
  if (!state) return stateId;
  return state.name;
};

export const getCountryById = (countryId: string) => {
  const country = countriesList.find((country) => country.id === countryId);
  if (!country) return countryId;
  return country.name;
};

export const getCountryByName = (countryName: string) => {
  const country = countriesList.find((country) => country.name === countryName);
  return country;
};

export default getCountries;
