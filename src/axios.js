import { apiUrl } from "@/uitls";
import axios from 'axios'

export const instance = axios.create({
  headers: {
    Authorization: 'Bearer sometokenlikethis'
  }
});

