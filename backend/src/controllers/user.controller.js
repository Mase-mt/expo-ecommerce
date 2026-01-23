import { User } from "../models/user.model.js";

export async function addAddress(req,res) {
    try {
        const {label, fullName, streetAddress, city, state, zipCode, phoneNumber, isDefault} = req.body;
        const user = req.user;

        if(!fullName || !streetAddress || !state || !city || !zipCode || !phoneNumber){
            return res.status(400).json({error:"Missing required fields!"})
        }

        //if this is set as default, unset all others defaults
        if(isDefault){
            user.addresses.forEach((addr) => {
                addr.isDefault = false;
            });
        }

        user.addresses.push({
            label,
            fullName,
            streetAddress,
            state,
            zipCode,
            city,
            phoneNumber,
            isDefault: isDefault || false,
        });

        await user.save();

        res.status(201).json({message: "Address added successfully!"});

    } catch (error) {
        console.error("Error adding address!",error);
        res.status(500).json({error: "Internal server error!"});
    }
}
export async function getAddress(req,res) {
    try {
        const user = req.user;

        res.status(200).json({addresses: user.addresses});
    } catch (error) {
        console.error("Error getting addresses controller!",error);
        res.status(500).json({error: "Internal server error!"});
    }
}
export async function updateAddress(req,res) {
    try {
        const { label, fullName, streetAddress, state, zipCode, phoneNumber, isDefault } = req.body;
        const { addressId } = req.params;
        const user = req.user;
        const address = user.addresses.id(addressId);
        if(!address){
            return res.status(404).json({error: "Address not found"});
        }
        if(isDefault){
            user.addresses.forEach((addr) => {
                addr.isDefault = false;
            });
        }

        addresses.label = label || addresses.label,
        addresses.fullName =fullName || addresses.fullName,
        addresses.streetAddress =streetAddress || addresses.streetAddress,
        addresses.state =state || addresses.state,
        addresses.zipCode =zipCode || addresses.zipCode,
        addresses.phoneNumber =phoneNumber || addresses.phoneNumber,
        addresses.isDefault = isDefault !== undefined ? isDefault : addresses.isDefault,

        await user.save();
        res.status(200).json({message:"Address updated successfully!"});
    } catch (error) {
        console.error("Error updating address!");
        res.status(500).json({error:"Internal server error!"});
    }
}
export async function deleteAddress(req,res) {
    try {
        const {addressId} = req.params;
        const user = req.user;
        user.addresses.pull(addressId);
        await user.save();
        res.status(200).json({message:"Address deleted successfully!"});
    } catch (error) {
        console.error("Error deleting address");
        res.status(500).json({error:"Internal server error!"})   
    }
}
export async function addToWishlist(req,res) {
    try {
        const {productId} = req.body;
        const user = req.user;
        
        // check if the product is already in the wishlist
        productId = user.wishlist.id(productId);
        if(user.wishlist.includes(productId)){
            return res.status(400).json({error:"Product is already in wishlist!"});
        }
        user.wishlist.push(productId);
        await user.save();
        res.status(200).json({message:"Product added to wishlist", wishlist: user.wishlist});
    } catch (error) {
        console.error("Error adding on product to wishlist!",error);
        res.status(500).json({error:"Internal server error!"});
    }
}
export async function removeFromWishlist(req,res) {
    try {
        const user = req.user;
        const {productId} = req.params;
        if(!user.wishlist.includes(productId)){
            return res.status(400).json({error:"Product not found in wishlist!"});
        }
        user.wishlist.pull(productId);
        await user.save();
        res.status(200).json({message:"Successfuly removed product from wishlist!",wishlist:user.wishlist})
    } catch (error) {
        console.error("Error on removing product from wishlist!");
        res.status(500).json({error:"Internal server error!"})
    }
}
export async function getWishlist(req,res) {
    try {
        //we're using populate because wishlist is just an array of product id's
        const user = await User.findById(req.user._id).populate("wishlist");
        res.status(200).json({message:"Successfuly fetched product from wishlist",wishlist: user.wishlist})
    } catch (error) {
        console.error("Error fetching product from wishlist!");
        res.status(500).json({error:"Internal server error!"});
    }
}