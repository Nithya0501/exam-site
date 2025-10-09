import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../lib/api";


export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(apiUrl("/api/courses"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch courses");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const saveCourse = createAsyncThunk(
  "courses/save",
  async ({ token, course }, { rejectWithValue }) => {
    try {
      const method = course.id ? "PUT" : "POST";
      const endpoint = course.id
        ? `/api/courses/${course.id}`
        : "/api/courses";

      const res = await fetch(apiUrl(endpoint), {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: course.name,
          description: course.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save course");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(apiUrl(`/api/courses/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete course");
      return id; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(saveCourse.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(
          (c) => c._id === updated._id || c.id === updated.id
        );
        if (index >= 0) {
          state.items[index] = updated;
        } else {
          state.items.push(updated);
        }
      })
    
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (c) => c._id !== action.payload && c.id !== action.payload
        );
      });
  },
});

export default courseSlice.reducer;

