
import axios from 'axios';

export async function makeRequest(request)
{
  try {
    const data = await request();
    return data.data;
  } catch (e) {
    return { status: 'error', message: e};
  }
}
