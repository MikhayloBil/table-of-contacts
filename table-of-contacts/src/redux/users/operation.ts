import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../services/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUsers();
  return response.data;
});
