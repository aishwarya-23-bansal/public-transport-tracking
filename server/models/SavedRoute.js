const mongoose = require("mongoose");

const savedRouteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Prevent the same user from saving the same route twice
savedRouteSchema.index(
    { user: 1, route: 1 },
    { unique: true }
);

module.exports = mongoose.model("SavedRoute", savedRouteSchema);