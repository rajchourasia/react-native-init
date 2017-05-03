import pearsonConfig from '../../config/pearson';

const apiKey = pearsonConfig.consumer_key;
const basePath = pearsonConfig.basePath;

class PearsonApi {

  static search(text) {
    if (!text) {
      return null;
    }
    return fetch(`${basePath}/v2/dictionaries/ldoce5/entries?search=${text}&apikey=${apiKey}&limit=5`)
      .then((response) => {
        setTimeout(() => null, 0);
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default PearsonApi;
