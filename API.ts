import { Platform } from "react-native"
export const API_URL = Platform.OS==="android" ? `http://10.0.2.2:5050/api/` : `http://localhost:5050/api/`