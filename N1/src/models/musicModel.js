import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
    name: String,
    artist: String,
    cover: String,
    src: String,
});

const Music = mongoose.model('Music', musicSchema);

export default Music;
