import axios from "axios";
import config from "../Config/key";

export default axios.create({
  baseURL: config.doctorUrl,
});
