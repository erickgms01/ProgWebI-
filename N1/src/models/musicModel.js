import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
    name: String,
    artist: String,
    picture: String,
    url: String,
});

const Music = mongoose.model('Music', musicSchema);

export default Music;
