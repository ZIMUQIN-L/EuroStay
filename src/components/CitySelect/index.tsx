import { View, Text, Input } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import Taro from '@tarojs/taro';
import GlobalStore from '@store/GlobalStore';
import { API } from '@utils/apiService';
import { LocationData, CombinedLocationData } from '@utils/interfaces';

interface IProps {
  onCitySelected: (_: CombinedLocationData) => void;
}

const CitySelect = (props: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<LocationData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<LocationData | null>(null);
  const [countries, setCountries] = useState<LocationData[]>([]);
  const [cities, setCities] = useState<LocationData[]>([]);
  const [countryGroups, setCountryGroups] = useState<{
    [key: string]: LocationData[];
  }>({});
  const [cityGroups, setCityGroups] = useState<{
    [key: string]: LocationData[];
  }>({});
  const [filteredCountryGroups, setFilteredCountryGroups] = useState<{
    [key: string]: LocationData[];
  }>({});
  const [filteredCityGroups, setFilteredCityGroups] = useState<{
    [key: string]: LocationData[];
  }>({});
  const [view, setView] = useState<'countries' | 'cities'>('countries');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      groupLocationsByFirstLetter(countries, setCountryGroups);
    }
  }, [countries]);

  useEffect(() => {
    if (cities.length > 0) {
      groupLocationsByFirstLetter(cities, setCityGroups);
    }
  }, [cities]);

  useEffect(() => {
    if (searchValue) {
      const filteredCountries = countries.filter(
        country =>
          country.cname.includes(searchValue) ||
          country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          country.pinyin.toLowerCase().includes(searchValue.toLowerCase())
      );
      groupLocationsByFirstLetter(filteredCountries, setFilteredCountryGroups);

      const filteredCities = cities.filter(
        city =>
          city.cname.includes(searchValue) ||
          city.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          city.pinyin.toLowerCase().includes(searchValue.toLowerCase())
      );
      groupLocationsByFirstLetter(filteredCities, setFilteredCityGroups);
    }
  }, [searchValue, countries, cities]);

  const groupLocationsByFirstLetter = (
    locations: LocationData[],
    setGroups: React.Dispatch<React.SetStateAction<{ [key: string]: LocationData[] }>>
  ) => {
    const groups: { [key: string]: LocationData[] } = {};
    
    locations.forEach(location => {
      const firstLetter = location.pinyin[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(location);
    });
    
    // Sort groups alphabetically
    const sortedGroups = Object.fromEntries(
      Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
    );
    
    setGroups(sortedGroups);
  };

  const fetchCountries = async () => {
    try {
      const response = await API.location.getAvailableCountries();
      setCountries(response);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const fetchCitiesByCountry = async (countryId: number) => {
    try {
      const response = await API.location.getAvailableCities(countryId);
      setCities(response);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const handleCountryClick = (country: LocationData) => {
    setSelectedCountry(country);
    fetchCitiesByCountry(country.id);
    setView('cities');
  };

  const handleCityClick = (city: LocationData) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (view === 'countries') {
      if (selectedCountry) {
        fetchCitiesByCountry(selectedCountry.id);
        setView('cities');
      }
    } else {
      if (selectedCity && selectedCountry) {
        let displayName, cityName;
        
        // Handle "All" option (id: 0)
        if (selectedCity.id === 0) {
          // When "All" is selected, just show the country name
          displayName = selectedCountry.cname;
          cityName = '全部';
        } else {
          displayName = `${selectedCountry.cname}${selectedCity.cname}`;
          cityName = selectedCity.cname;
        }
        
        const combinedLocation: CombinedLocationData = {
          countryId: selectedCountry.id,
          cityId: selectedCity.id,
          displayName: displayName,
          countryName: selectedCountry.cname,
          cityName: cityName
        };
        props.onCitySelected(combinedLocation);
      }
    }
  };

  const handleCancel = () => {
    if (view === 'cities' && selectedCountry) {
      // Go back to countries view
      setView('countries');
      setSelectedCity(null);
    } else {
      // Cancel selection
      const emptyLocation: CombinedLocationData = {
        countryId: null,
        cityId: null,
        displayName: '选择国家和城市',
        countryName: '',
        cityName: ''
      };
      props.onCitySelected(emptyLocation);
    }
  };

  return (
    <View className='city-select'>
      <View className='header'>
        {/* {view === 'cities' && selectedCountry && (
          <View className='back-button' onClick={() => setView('countries')}>
            返回国家选择
          </View>
        )} */}
        <Text className='title'>
          {view === 'countries' ? '选择国家' : `选择城市 (${selectedCountry?.cname})`}
        </Text>
      </View>

      <View className='search-box'>
        <Input
          type='text'
          placeholder={view === 'countries' ? '搜索国家' : '搜索城市'}
          value={searchValue}
          onInput={e => setSearchValue(e.detail.value)}
          className='search-input'
        />
      </View>

      {view === 'countries' && (
        <View className='location-groups'>
          {searchValue ? (
            Object.keys(filteredCountryGroups).length > 0 ? (
              Object.entries(filteredCountryGroups).map(([letter, countries]) => (
                <View key={letter} className='location-group'>
                  <Text className='letter'>{letter}</Text>
                  {countries.map((country, index) => (
                    <View
                      key={index}
                      className={`location-row ${selectedCountry?.id === country.id ? 'selected' : ''}`}
                      onClick={() => handleCountryClick(country)}
                    >
                      {country.cname}
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <View className='no-results'>
                <Text>没有找到相关国家</Text>
              </View>
            )
          ) : (
            Object.entries(countryGroups).map(([letter, countries]) => (
              <View key={letter} className='location-group'>
                <Text className='letter'>{letter}</Text>
                {countries.map((country, index) => (
                  <View
                    key={index}
                    className={`location-row ${selectedCountry?.id === country.id ? 'selected' : ''}`}
                    onClick={() => handleCountryClick(country)}
                  >
                    {country.cname}
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      )}

      {view === 'cities' && (
        <View className='location-groups'>
          {!searchValue && (
            <View className='all-option'>
              <View
                className={`location-row ${selectedCity?.id === 0 ? 'selected' : ''}`}
                onClick={() => handleCityClick({
                  id: 0,
                  name: 'all',
                  cname: '全部',
                  pinyin: 'quanbu'
                })}
              >
                全部
              </View>
            </View>
          )}
          
          {searchValue ? (
            Object.keys(filteredCityGroups).length > 0 ? (
              Object.entries(filteredCityGroups).map(([letter, cities]) => (
                <View key={letter} className='location-group'>
                  <Text className='letter'>{letter}</Text>
                  {cities.map((city, index) => (
                    <View
                      key={index}
                      className={`location-row ${selectedCity?.id === city.id ? 'selected' : ''}`}
                      onClick={() => handleCityClick(city)}
                    >
                      {city.cname}
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <View className='no-results'>
                <Text>没有找到相关城市</Text>
              </View>
            )
          ) : (
            Object.entries(cityGroups).map(([letter, cities]) => (
              <View key={letter} className='location-group'>
                <Text className='letter'>{letter}</Text>
                {cities.map((city, index) => (
                  <View
                    key={index}
                    className={`location-row ${selectedCity?.id === city.id ? 'selected' : ''}`}
                    onClick={() => handleCityClick(city)}
                  >
                    {city.cname}
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      )}

      <View className='floating-buttons'>
        <View 
          className={`cancel-button ${(view === 'cities' && selectedCountry) || (view === 'countries' && !selectedCountry) ? '' : 'disabled'}`} 
          onClick={handleCancel}
        >
          {view === 'cities' && selectedCountry ? '返回国家选择' : '取消'}
        </View>

        <View 
          className={`confirm-button ${(view === 'countries' && selectedCountry) || (view === 'cities' && selectedCity) ? 'active' : 'disabled'}`} 
          onClick={handleConfirm}
        >
          {view === 'countries' ? '下一步' : '确认'}
        </View>
      </View>
    </View>
  );
};

export default CitySelect;
