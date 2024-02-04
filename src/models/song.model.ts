import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface ISong {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
interface ISongDocument extends Document, ISong {
  id: string;
}

const songSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: false }, // Making album optional
    genre: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const SongModel: Model<ISongDocument> = mongoose.model<ISongDocument>(
  "Song",
  songSchema
);

export { ISong, ISongDocument, SongModel };
