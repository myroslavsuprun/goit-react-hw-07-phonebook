import axios from 'axios';

axios.defaults.baseURL = 'https://636fbe12f2ed5cb047e442c1.mockapi.io/contacts';

export class mockAPI {
  static getContacts = async () => {
    const response = await axios.get();

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  };

  static deleteContact = async id => {
    const response = await axios.delete(id);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  };

  static addContact = async contact => {
    const response = await axios.post('', contact);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  };
}
