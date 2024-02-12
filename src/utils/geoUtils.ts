import axios from "axios";

export async function getAddressFromCoordinates(latitude: number, longitude: number) {
    const apiKey = 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA';
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
  
      if (response.data.results && response.data.results.length > 0) {
        // Extract the formatted address from the first result
        const formattedAddress = response.data.results[0].formatted_address;
        return formattedAddress;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
      return 'Error fetching address';
    }
  }