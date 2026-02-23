import { Order } from "../models/order.model.js";
import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
export async function createReview(req, res) {
  try {
    const { productId, orderId, rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    const user = req.user;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }
    if (order.clerkId !== user.clerkId) {
      return res
        .status(403)
        .json({ error: "Not authorized to review this order" });
    }
    if (order.status !== "delivered") {
      return res
        .status(400)
        .json({ error: "Can only review delivered orders" });
    }
    //verify if product is in order or not
    const productInOrder = order.orderItems.find(
      (item) => item.product.toString() === productId.toString(),
    );
    if (!productInOrder) {
      return res
        .status(404)
        .json({ error: "Product not found in this order!" });
    }

    let review;
    //check if review already exists.
    const existingReview = await Review.findOne({
      productId,
      userId: user._id,
    });
    if (existingReview) {
      //update existing review
      existingReview.rating = rating;
      existingReview.orderId = orderId;
      review = await existingReview.save();
    } else {
      //create new review
      review = await Review.create({
        productId,
        userId: user._id,
        orderId,
        rating,
      });
    }

    review = await Review.create({
      productId,
      userId: user._id,
      orderId,
      rating,
    });

    //update product rating
    // const product = await Product.findById(productId);
    // const reviews = await Review.find({productId});
    // const totalRating = reviews.reduce((sum,rev) => sum + rev.rating,0);
    // product.averageRating = totalRating /reviews.length;
    // product.totalReviews = reviews.length;
    // await product.save();

    const reviews = await Review.find({ productId });
    const totalRating = await reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        averageRating: totalRating.length / reviews.length,
        totalReviews: reviews.length,
      },
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      await Review.findByIdAndDelete(review._id);
      res.status(404).json({ error: "Product not found" });
    }

    res.status(201).json({ message: "Review created successfully.", review });
  } catch (error) {
    console.error("Error creating review", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}

export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const user = req.user;
    if (!reviewId) {
      return res.send(404).json({ error: "Review not found!" });
    }

    if (review.userId.toString() !== user._id.toString()) {
      res.status(403).json({ error: "Not authorized to delete this review!" });
    }
    const productId = review.productId;
    await Review.findByIdAndDelete(reviewId);

    const reviews = await Review.findById({ productId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    await Product.findByIdAndUpdate(productId, {
      averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
      totalReviews: reviews.length,
    });

    res.status(200).json({ message: "Review deleted successfully!" });
  } catch (error) {
    console.error("Error creating review", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
}
