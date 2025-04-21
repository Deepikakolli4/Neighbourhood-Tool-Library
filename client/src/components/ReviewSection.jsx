import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import api from '../api/api';

const ReviewSection = ({ toolId }) => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    api.get(`/reviews/${toolId}`).then((res) => {
      setReviews(res.data);
    });
  }, [toolId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post(
        `/reviews/${toolId}`,
        { text, rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setText('');
      setRating(5);
      // Refresh reviews
      const res = await api.get(`/reviews/${toolId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="border p-2 mt-2 rounded">
          <p>{review.text}</p>
          <p className="text-yellow-500">Rating: {review.rating} ⭐</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a review..."
        />
        <select
          className="mb-2 border p-1 rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <br />
        <button
          type="submit"
          className="btn btn-primary mt-2"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
