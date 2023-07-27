import { Document, model, Schema } from 'mongoose';

export interface Blog {
  title: string;
  content: string;
  image: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface BlogDocument extends Document, Blog {}

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const BlogModel = model<BlogDocument>('Blog', blogSchema);

export default BlogModel;
