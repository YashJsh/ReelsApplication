import mongoose, {Schema, models,  model} from "mongoose";

export const Video_DIMENSION = {
    width : 1080,
    height : 1920
} as const;

export interface IVideo{
    _id? : mongoose.Types.ObjectId;
    title : string,
    description : string,
    videoUrl : string,
    thumbnailUrl : string,
    controls? : boolean,
    tranformation?: {
        height : number,
        width : number,
        quality?: number
    }
}

const videoSchema = new Schema<IVideo>(
    {
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        videoUrl : {   
            type : String,
            required : true,
        },
        thumbnailUrl : {   
            type : String,
            required : true,
        },
        controls : {   
            type : Boolean,
            required : true,
        },
        tranformation : {
            height : {
                type : Number,
                default : Video_DIMENSION.height
            },
            width : {
                type : Number,
                default : Video_DIMENSION.width
            },
            quality : {
                type : Number,
                min : 1,
                max : 100
            }

        }

    },
    {
        timestamps : true
    }

)


const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;