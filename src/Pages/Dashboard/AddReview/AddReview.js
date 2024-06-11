import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactStars from 'react-rating-stars-component';
import { addReview } from '../../../redux/slices/reviewSlice';
import { useDispatch } from 'react-redux';
import useAuth from "../../../Hook/useAuth";
import styles from './AddReview.module.css';

const AddReview = () => {
    const [rating, setRating] = useState('');

    const dispatch = useDispatch();

    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const handleRating = rating => {
        setRating(rating);
    };

    const onSubmit = (data) => {
        data.name = user?.displayName;
        data.email = user?.email;
        data.img = user.photoURL;
        data.rating = rating;

        dispatch(addReview(data));
        reset();

        /* fetch('http://localhost:5000/add-review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {

            });

        alert('Your review added. Thanks for give us review.');
        reset(); */
    };

    return (
        <div>
            <Container>
                <div className="mb-4">
                    <h3 className="fw-bold">Give Us Review</h3>
                </div>

                <div className="w-100">
                    <Container>
                        <div className="">
                            <h4 className="fw-bold text-center">Select rating</h4>

                            <ReactStars
                                classNames={`${styles.ratingArea}`}
                                name="rating"
                                onChange={handleRating}
                                size={40}
                                isHalf={true}
                            />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${'pb-4'} ${styles.reviewForm}`}>

                            <textarea {...register("comment", { required: true })} placeholder="Your comment" />

                            <input type="submit" value="Add Review" className="btn btn-secondary" />
                        </form>
                    </Container>
                </div>
            </Container>
        </div>
    );
};

export default AddReview;