import React from 'react'

export const ReviewCard = ({ review }) => (
  <div style={{ padding: 10, margin: 20, borderWidth: 1, border: '1px solid black' }}>
    <h5>{review.title}</h5>
    <div>{review.restaurantName}</div>
    <div>{review.date}</div>
    <p>{review.description}</p>
  </div>
)

export default ReviewCard
