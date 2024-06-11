import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';



export const getReviews = createAsyncThunk(
    'reviews/getReviews',
    async () => {
        const response = await fetch('http://localhost:5000/reviews')
            .then(res => res.json())
        return response;

    }

)

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/add-review', data)
            return response.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        allReviews: [],
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        //getreview reducers
        builder.addCase(getReviews.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.allReviews = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getReviews.rejected, (state) => {
            state.isLoading = false;
        })

        //add review reducers
        builder.addCase(addReview.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.allReviews.push(action.payload);
            toast.success(`Successfully Reviewed`, {
                position: "bottom-left",
                autoClose: 2000,
            });
        })
        builder.addCase(addReview.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

// export const { } = reviewSlice.actions
export default reviewSlice.reducer