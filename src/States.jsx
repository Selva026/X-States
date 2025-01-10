import { useEffect, useState } from "react";
import './States.module.css';

function States() {
  const [selectcountry, setSelectedCountry] = useState("");
  const [countries, setcountries] = useState([]);
  const [selectState, setSelectedState] = useState("");
  const [state, setState] = useState([]);
  const [selectCity, setSelectedCity] = useState("");
  const [city, setCity] = useState([]);

  const countryApi = "https://crio-location-selector.onrender.com/countries";


  const stateApi = `https://crio-location-selector.onrender.com/country=${selectcountry}/states`;
  const cityApi = `https://crio-location-selector.onrender.com/country=${selectcountry}/state=${selectState}/cities`;


  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(countryApi);
      const jsonData = await response.json();
      setcountries(jsonData);
    };

    fetchCountries();
  }, []);


  useEffect(() => {
    if (selectcountry) {
      const fetchStates = async () => {
        const response = await fetch(stateApi);
        const jsonData = await response.json();
        setState(jsonData);
      };

      fetchStates();
    }
  }, [selectcountry]);


  useEffect(() => {
    if (selectState) {
      const fetchCities = async () => {
        const response = await fetch(cityApi);
        const jsonData = await response.json();
        setCity(jsonData);
      };

      fetchCities();
    }
  }, [selectState]);

  return (
    <div>
      <h1>Select Location</h1>

      <select
        className="selectBox"
        name="selectCountry"
        value={selectcountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country, idx) => (
          <option value={country} key={idx}>
            {country}
          </option>
        ))}
      </select>

      <select
        className="selectBox"
        name="selectState"
        disabled={!selectcountry}
        value={selectState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="" disabled>
          Select State
        </option>
        {state.map((st, idx) => (
          <option value={st} key={idx}>
            {st}
          </option>
        ))}
      </select>


      <select
        className="selectBox"
        name="selectCity"
        disabled={!selectState}
        value={selectCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="" disabled>
          Select City
        </option>
        {city.map((ct, idx) => (
          <option value={ct} key={idx}>
            {ct}
          </option>
        ))}
      </select>

 
      {selectCity && (
        <h2>
          {`You selected ${selectCity},${selectState}, ${selectcountry}`}
        
       </h2>
      )}
    </div>
  );
}

export default States;
