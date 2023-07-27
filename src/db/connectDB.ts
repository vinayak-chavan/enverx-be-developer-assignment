import mongoose, {ConnectOptions} from "mongoose";

const MONGODB_URI: string = 'mongodb://localhost:27017/blog-app?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

export const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      } as ConnectOptions);
      
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };


