import mongoose from "mongoose"

const cartCollecion = "carts"

const cartSchema = new mongoose.Schema(
	{
		timestamp: { type: String, required: true, max: 100 },
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
	},
	{
		virtuals: true,
	}
)

// cartSchema.set("toJSON", {
// 	transform: (_, response) => {
// 		response.id = response._id
// 		delete response.__v
// 		delete response._id
// 		return response
// 	},
// })

export const cartModel = mongoose.model(cartCollecion, cartSchema)
