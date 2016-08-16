import cors from 'cors';

export default {
  getAllDrinks: function(drinkNames){

    const fetchSettings = {
      method: 'GET',
      mode: 'no-cors',
      dataType: 'json'
    };

    console.log('drink name ', drinkNames);
    // when hosted online, uncomment this back
    return fetch(`https://addb.absolutdrinks.com/quickSearch/drinks/${drinkNames}/?apiKey=477a7635dcb248d591a7abdaf035ee32`, fetchSettings).then((response) => {
    //for desktop leave uncommented
    // return fetch(`http://localhost:3000/${drinkNames}.json`, fetchSettings).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
        return {};
    });
  }
};
