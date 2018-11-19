const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  
    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true
    },
  
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;