import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
// const BASE_URL =
  // process.env.REACT_APP_BASE_URL || 'https://kep-casting-agency.herokuapp.com/';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class CastingAgencyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    // Send auth token in request header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CastingAgencyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [ message ];
    }
  }

  //*******************************************************************/
  //                   Individual API routes                          */
  //*******************************************************************/

  /****************************Actors Routes***************************/

  static async getActors(query) {
    let res = await this.request(`actors`);
    return res.actors;
  }

  /****************************Movies Routes***************************/
}

export default CastingAgencyApi;
