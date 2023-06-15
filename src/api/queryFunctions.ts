import axios from 'axios';

export async function getGroupById(groupId: string) {

  const response = await axios.post(`${process.env.REACT_APP_APIURL}/group/getgroupbyid`, { GroupId: groupId });

  return response.data;
}
