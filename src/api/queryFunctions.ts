import axios from 'axios';

export async function getGroups() {

  const response = await axios.post(`${process.env.REACT_APP_APIURL}/group/getgroupbyid`, { GroupId: "640f58b7435d877f0e088bd6" });

  return response.data;
}
