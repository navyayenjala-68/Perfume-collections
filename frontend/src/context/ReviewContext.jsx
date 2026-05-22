import { createContext, useEffect, useState } from "react";

export const ReviewContext = createContext();

function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => {
    setReviews((items) => [
      ...items,
      {
        id: Date.now(),
        date: new Date().toLocaleDateString("en-IN"),
        ...review,
      },
    ]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewProvider;
